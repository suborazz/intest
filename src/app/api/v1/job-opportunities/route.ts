import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { v2 as cloudinary } from "cloudinary";
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

const createJobOpportunitySchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  address: z.string().min(2, "Address is required"),
  postOpportunity: z.string().min(2, "Post opportunity is required"),
  jobNature: z.string().min(2, "Job nature is required"),
  fieldOfEmployment: z.string().min(2, "Field of employment is required"),
  minQualification: z.string().min(2, "Minimum qualification is required"),
  skillsRequired: z.string().optional(),
  totalStaffStrength: z.string().optional(),
  website: z.string().optional().or(z.literal("")),
  logoUrl: z.string().optional(),
  advtNo: z.string().optional(),
  advtDate: z.string().optional(),
  closingDate: z.string().optional(),
        jdDescription: z.string().nullish().or(z.literal("")),
});

const listJobOpportunitiesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
});

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = request.nextUrl;

    const parsed = listJobOpportunitiesQuerySchema.safeParse({
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

    const requesterRole = request.headers.get("X-User-Role");

    const where: Prisma.JobOpportunityWhereInput = {
      deletedAt: null,
    };

        if (requesterRole !== "SUPER_ADMIN") {
      where.isActive = true;
    }

    if (search) {
      where.OR = [
        { companyName: { contains: search, mode: "insensitive" } },
        { postOpportunity: { contains: search, mode: "insensitive" } },
        { fieldOfEmployment: { contains: search, mode: "insensitive" } },
        { skillsRequired: { contains: search, mode: "insensitive" } },
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.jobOpportunity.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.jobOpportunity.count({ where }),
    ]);

    const meta = buildPaginationMeta(total, page, limit);

    return successResponse(jobs, { meta });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
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

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const formData = await request.formData();
    const companyName = formData.get("companyName") as string;
    const address = formData.get("address") as string;
    const postOpportunity = formData.get("postOpportunity") as string;
    const jobNature = formData.get("jobNature") as string;
    const fieldOfEmployment = formData.get("fieldOfEmployment") as string;
    const minQualification = formData.get("minQualification") as string;
    const skillsRequired = formData.get("skillsRequired") as string | null;
    const totalStaffStrength = formData.get("totalStaffStrength") as
      string | null;
    const website = formData.get("website") as string | null;
    const logo = formData.get("logo") as File | null;

        const advtNo = formData.get("advtNo") as string | null;
    const advtDate = formData.get("advtDate") as string | null;
    const closingDate = formData.get("closingDate") as string | null;
    const jdDoc = formData.get("jdDoc") as File | null;
    const jdDescription = formData.get("jdDescription") as string | null;

    const parsed = createJobOpportunitySchema.safeParse({
      companyName,
      address,
      postOpportunity,
      jobNature,
      fieldOfEmployment,
      minQualification,
      skillsRequired: skillsRequired || undefined,
      totalStaffStrength: totalStaffStrength || undefined,
      website: website || undefined,
      advtNo: advtNo || undefined,
      advtDate: advtDate || undefined,
      closingDate: closingDate || undefined,
      jdDescription: jdDescription || undefined,
    });

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;
    let logoUrl = null;
    let logoPublicId = null;

    const ALLOWED_LOGO_TYPES = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
      "image/webp",
    ];
    const MAX_LOGO_SIZE = 2 * 1024 * 1024; 

    if (logo && logo.size > 0) {
      if (logo.size > MAX_LOGO_SIZE) {
        return errorResponse(
          "VALIDATION_ERROR",
          "Logo size exceeds the 2MB limit",
          {
            status: HTTP_2.UNPROCESSABLE,
            details: { logo: ["Logo must be smaller than 2MB"] },
          },
        );
      }

      const fileExt = logo.name.split(".").pop()?.toLowerCase() || "";
      if (
        !["png", "jpg", "jpeg", "svg", "webp"].includes(fileExt) &&
        !ALLOWED_LOGO_TYPES.includes(logo.type)
      ) {
        return errorResponse(
          "VALIDATION_ERROR",
          "Invalid logo format. Only PNG, JPG, JPEG, SVG, and WEBP formats are allowed.",
          {
            status: HTTP_2.UNPROCESSABLE,
            details: {
              logo: ["Only PNG, JPG, JPEG, SVG, and WEBP formats are allowed."],
            },
          },
        );
      }

      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await uploadBuffer(
        buffer,
        "iiit/jobs/logos",
        "logo",
      );
      logoUrl = uploadResult.url;
      logoPublicId = uploadResult.publicId;
    }

        let jdDocUrl = null;
    let jdDocPublicId = null;

    if (jdDoc && jdDoc.size > 0) {
      if (jdDoc.size > 5 * 1024 * 1024) {
        return errorResponse(
          "VALIDATION_ERROR",
          "JD Document size exceeds the 5MB limit",
          {
            status: HTTP_2.UNPROCESSABLE,
            details: { jdDoc: ["JD Document must be smaller than 5MB"] },
          },
        );
      }

      const bytes = await jdDoc.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await uploadBuffer(
        buffer,
        "iiit/jobs/jds",
        "jd",
        "raw",
      );
      jdDocUrl = uploadResult.url;
      jdDocPublicId = uploadResult.publicId;
    }

        let normalizedWebsite = null;
    if (data.website) {
      const trimmed = data.website.trim();
      if (trimmed) {
        normalizedWebsite = /^https?:\/\//i.test(trimmed)
          ? trimmed
          : `https://${trimmed}`;
      }
    }

    const job = await prisma.jobOpportunity.create({
      data: {
        companyName: data.companyName,
        address: data.address,
        postOpportunity: data.postOpportunity,
        jobNature: data.jobNature,
        fieldOfEmployment: data.fieldOfEmployment,
        minQualification: data.minQualification,
        skillsRequired: data.skillsRequired ?? null,
        totalStaffStrength: data.totalStaffStrength ?? null,
        website: normalizedWebsite,
        logoUrl,
        logoPublicId,
        advtNo: data.advtNo ?? null,
        advtDate: data.advtDate ?? null,
        closingDate: data.closingDate ?? null,
        jdDocUrl,
        jdDocPublicId,
        jdDescription: data.jdDescription || null,
        createdById: requesterId,
      },
    });

    return successResponse(job, {
      status: HTTP_2.CREATED,
      message: "Job Opportunity posted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
