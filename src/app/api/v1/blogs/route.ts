import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
import { prisma } from "@/x/e3746f45";

interface CloudinaryUploadResult {
    url: string;
    publicId: string;
}

async function uploadBuffer(
  buffer: Buffer,
  folder: string,
  publicIdPrefix: string,
  resourceType: "image" | "raw" | "auto" = "auto",
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${publicIdPrefix}-${Date.now()}`,
        resource_type: resourceType,
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload returned no result"));
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );
    uploadStream.end(buffer);
  });
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

function buildPaginationMeta(
  total: number,
  page: number,
  limit: number,
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

const HTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

function errorResponse(
  code: string,
  message: string,
  options?: {
    status?: number;
    details?: unknown;
  },
): NextResponse<ApiErrorResponse> {
  const body: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      ...(options?.details !== undefined && { details: options.details }),
    },
  };

  return NextResponse.json(body, {
    status: options?.status ?? HTTP.INTERNAL_SERVER_ERROR,
  });
}

function validationErrorResponse(
  error: ZodError,
): NextResponse<ApiErrorResponse> {
  return errorResponse("VALIDATION_ERROR", "Request validation failed", {
    status: HTTP.UNPROCESSABLE,
    details: error.flatten().fieldErrors,
  });
}

function handleError(error: unknown): NextResponse<ApiErrorResponse> {
  console.error("[API Error]", error);

  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  if (error instanceof Error) {
        const message =
      process.env["NODE_ENV"] === "production"
        ? "An internal server error occurred"
        : error.message;

    return errorResponse("INTERNAL_SERVER_ERROR", message, {
      status: HTTP.INTERNAL_SERVER_ERROR,
    });
  }

  return errorResponse("UNKNOWN_ERROR", "An unexpected error occurred", {
    status: HTTP.INTERNAL_SERVER_ERROR,
  });
}

interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

function successResponse<T>(
  data: T,
  options?: {
    message?: string;
    status?: number;
    meta?: PaginationMeta;
  },
): NextResponse<ApiSuccessResponse<T>> {
  const body: ApiSuccessResponse<T> = {
    success: true,
    data,
    ...(options?.message && { message: options.message }),
    ...(options?.meta && { meta: options.meta }),
  };

  return NextResponse.json(body, { status: options?.status ?? HTTP.OK });
}

const HTTP_2 = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  serialNo: z.string().optional(),
  date: z.string().min(2, "Date is required"),
  location: z.string().optional(),
  authorName: z.string().min(2, "Author name is required"),
  authorRole: z.string().optional(),
  authorEmail: z
    .string()
    .email("Invalid author email")
    .optional()
    .or(z.literal("")),
});

const listBlogsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.string().optional(),
  search: z.string().optional(),
});

export const dynamic = "force-dynamic";

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; 

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = request.nextUrl;

    const parsed = listBlogsQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      search: searchParams.get("search") ?? undefined,
    });

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid query parameters", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { page, limit, category, search } = parsed.data;
    const skip = (page - 1) * limit;

    const where: Prisma.BlogWhereInput = {
      deletedAt: null,
      ...(category
        ? { category: { equals: category, mode: "insensitive" } }
        : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { content: { contains: search, mode: "insensitive" } },
              { authorName: { contains: search, mode: "insensitive" } },
              { location: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    const meta = buildPaginationMeta(total, page, limit);

    return successResponse(blogs, { meta });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const requesterRole = request.headers.get("X-User-Role");

    if (requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const serialNo = formData.get("serialNo") as string | null;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string | null;
    const authorName = formData.get("authorName") as string;
    const authorRole = formData.get("authorRole") as string | null;
    const authorEmail = formData.get("authorEmail") as string | null;
    const file = formData.get("image") as File | null;

    const parsed = createBlogSchema.safeParse({
      title,
      content,
      category,
      serialNo: serialNo || undefined,
      date,
      location: location || undefined,
      authorName,
      authorRole: authorRole || undefined,
      authorEmail: authorEmail || undefined,
    });

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    let imageUrl: string | null = null;
    let imagePublicId: string | null = null;

    if (file && file.size > 0) {
      if (file.size > MAX_IMAGE_SIZE) {
        return errorResponse(
          "VALIDATION_ERROR",
          "Image size exceeds the 5MB limit",
          {
            status: HTTP_2.UNPROCESSABLE,
            details: { image: ["Image must be smaller than 5MB"] },
          },
        );
      }

      const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
      if (
        !["png", "jpg", "jpeg", "webp"].includes(fileExt) &&
        !ALLOWED_IMAGE_TYPES.includes(file.type)
      ) {
        return errorResponse(
          "VALIDATION_ERROR",
          "Invalid file format. Only PNG, JPG, JPEG, and WEBP formats are allowed.",
          {
            status: HTTP_2.UNPROCESSABLE,
            details: {
              image: ["Only PNG, JPG, JPEG, and WEBP formats are allowed."],
            },
          },
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await uploadBuffer(buffer, "iiit/blogs", "blog");
      imageUrl = uploadResult.url;
      imagePublicId = uploadResult.publicId;
    }

    const blog = await prisma.blog.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        category: parsed.data.category,
        serialNo: parsed.data.serialNo || null,
        date: parsed.data.date,
        location: parsed.data.location || null,
        authorName: parsed.data.authorName,
        authorRole: parsed.data.authorRole || null,
        authorEmail: parsed.data.authorEmail || null,
        imageUrl,
        imagePublicId,
      },
    });

    return successResponse(blog, {
      status: HTTP_2.CREATED,
      message: "Blog post created successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
