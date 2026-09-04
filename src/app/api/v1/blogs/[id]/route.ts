import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { z, ZodError } from "zod";
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

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
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

const updateBlogSchema = createBlogSchema.partial();

async function deleteAsset(
  publicId: string | null | undefined,
  resourceType: "image" | "raw" | "auto" = "auto",
): Promise<void> {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (err) {
        console.error(`[Cloudinary] Failed to delete asset "${publicId}":`, err);
  }
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

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; 

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const blog = await prisma.blog.findFirst({
      where: { id, deletedAt: null },
    });

    if (!blog) {
      return errorResponse("BLOG_NOT_FOUND", "Blog post not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    return successResponse(blog);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;
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

    const existingBlog = await prisma.blog.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingBlog) {
      return errorResponse("BLOG_NOT_FOUND", "Blog post not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const formData = await request.formData();
    const updateData: Record<string, unknown> = {};

    const fields = [
      "title",
      "content",
      "category",
      "serialNo",
      "date",
      "location",
      "authorName",
      "authorRole",
      "authorEmail",
    ];

    fields.forEach((field) => {
      if (formData.has(field)) {
        const val = formData.get(field);
                        updateData[field] = val === "" ? undefined : val;
      }
    });

    const parsed = updateBlogSchema.safeParse(updateData);
    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

        let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (formData.has("image")) {
      const file = formData.get("image") as File | null;
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

                if (existingBlog.imagePublicId) {
          await deleteAsset(existingBlog.imagePublicId);
        }

        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.publicId;
      }
    }

        const prismaUpdateData: Record<string, any> = {};

        Object.keys(parsed.data).forEach((key) => {
      const val = parsed.data[key as keyof typeof parsed.data];
            if (
        (val === undefined || val === "") &&
        ["serialNo", "location", "authorRole", "authorEmail"].includes(key)
      ) {
        prismaUpdateData[key] = null;
      } else if (val !== undefined) {
        prismaUpdateData[key] = val;
      }
    });

    if (imageUrl && imagePublicId) {
      prismaUpdateData.imageUrl = imageUrl;
      prismaUpdateData.imagePublicId = imagePublicId;
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: prismaUpdateData,
    });

    return successResponse(updatedBlog, {
      message: "Blog post updated successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;
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

    const existingBlog = await prisma.blog.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingBlog) {
      return errorResponse("BLOG_NOT_FOUND", "Blog post not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    await prisma.blog.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

        if (existingBlog.imagePublicId) {
      await deleteAsset(existingBlog.imagePublicId);
    }

    return successResponse(null, {
      message: "Blog post deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
