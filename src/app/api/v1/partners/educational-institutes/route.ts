import { Prisma, UserRole } from "@prisma/client";
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

const createEducationalInstituteSchema = z.object({
  name: z.string().min(2, "Name is required").trim(),
  address: z.string().min(5, "Address is required").trim(),
  naacAccreditation: z.string().min(1, "NAAC Accreditation is required").trim(),
  website: z.string().url("Invalid website URL").trim(),
  logo: z.string().optional().nullable(),
  logoPublicId: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
  photoPublicId: z.string().optional().nullable(),
});

const listPartnersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
});

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = request.nextUrl;

    const parsed = listPartnersQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      search: searchParams.get("search") ?? undefined,
    });

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid query parameters", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { page, limit, search } = parsed.data;
    const skip = (page - 1) * limit;

    const where: Prisma.EducationalInstituteWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ];
    }

    const [institutes, total] = await Promise.all([
      prisma.educationalInstitute.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.educationalInstitute.count({ where }),
    ]);

    const meta = buildPaginationMeta(total, page, limit);

    return successResponse(institutes, { meta });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role") as UserRole;

    if (!userId || !userRole) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    let body: {
      name?: string;
      address?: string;
      naacAccreditation?: string;
      website?: string;
    } = {};
    let logoFile: File | null = null;
    let photoFile: File | null = null;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {
        name: formData.get("name") as string,
        address: formData.get("address") as string,
        naacAccreditation: formData.get("naacAccreditation") as string,
        website: formData.get("website") as string,
      };
      logoFile = formData.get("logo") as File | null;
      photoFile = formData.get("photo") as File | null;
    } else {
      body = await request.json();
    }

    const result = createEducationalInstituteSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("VALIDATION_ERROR", "Validation failed.", {
        status: HTTP_2.UNPROCESSABLE,
        details: result.error.flatten().fieldErrors,
      });
    }

    let logoUrl = null;
    let logoPublicId = null;
    let photoUrl = null;
    let photoPublicId = null;

        if (logoFile && logoFile.size > 0) {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadBuffer(
        buffer,
        "iiit/partners/logos",
        "logo",
      );
      logoUrl = uploadResult.url;
      logoPublicId = uploadResult.publicId;
    }

        if (photoFile && photoFile.size > 0) {
      const bytes = await photoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadBuffer(
        buffer,
        "iiit/partners/photos",
        "photo",
      );
      photoUrl = uploadResult.url;
      photoPublicId = uploadResult.publicId;
    }

    const institute = await prisma.educationalInstitute.create({
      data: {
        name: result.data.name,
        address: result.data.address,
        naacAccreditation: result.data.naacAccreditation,
        website: result.data.website,
        logo: logoUrl,
        logoPublicId,
        photo: photoUrl,
        photoPublicId,
      },
    });

    return successResponse(institute, {
      message: "Educational Institute added successfully.",
      status: HTTP_2.CREATED,
    });
  } catch (error) {
    return handleError(error);
  }
}
