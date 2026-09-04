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

const updateJobOpportunitySchema = createJobOpportunitySchema.partial();

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

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const requesterRole = request.headers.get("X-User-Role");

    const where: { id: string; deletedAt: null; isActive?: boolean } = {
      id,
      deletedAt: null,
    };

    if (requesterRole !== "SUPER_ADMIN") {
      where.isActive = true;
    }

    const job = await prisma.jobOpportunity.findFirst({
      where,
    });

    if (!job) {
      return errorResponse("JOB_NOT_FOUND", "Job Opportunity not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    return successResponse(job);
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

    const existingJob = await prisma.jobOpportunity.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingJob) {
      return errorResponse("JOB_NOT_FOUND", "Job Opportunity not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const formData = await request.formData();

        const updateData: Record<string, unknown> = {};

    const fields = [
      "companyName",
      "address",
      "postOpportunity",
      "jobNature",
      "fieldOfEmployment",
      "minQualification",
      "skillsRequired",
      "totalStaffStrength",
      "website",
      "isActive",
      "advtNo",
      "advtDate",
      "closingDate",
      "jdDescription",
    ];

    fields.forEach((field) => {
      if (formData.has(field)) {
        const val = formData.get(field);
        if (field === "isActive") {
          updateData[field] = val === "true";
        } else {
          updateData[field] = val === "" ? null : val;
        }
      }
    });

        const parsed = updateJobOpportunitySchema.safeParse(updateData);
    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

        if (formData.has("logo")) {
      const logo = formData.get("logo") as File | null;
      if (logo && logo.size > 0) {
        const ALLOWED_LOGO_TYPES = [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/webp",
        ];
        const MAX_LOGO_SIZE = 2 * 1024 * 1024; 

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
                logo: [
                  "Only PNG, JPG, JPEG, SVG, and WEBP formats are allowed.",
                ],
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

                if (existingJob.logoPublicId) {
          await deleteAsset(existingJob.logoPublicId);
        }

        updateData.logoUrl = uploadResult.url;
        updateData.logoPublicId = uploadResult.publicId;
      }
    }

        if (formData.has("jdDoc")) {
      const jdDoc = formData.get("jdDoc") as File | null;
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

                if (existingJob.jdDocPublicId) {
          await deleteAsset(existingJob.jdDocPublicId, "raw");
        }

        updateData.jdDocUrl = uploadResult.url;
        updateData.jdDocPublicId = uploadResult.publicId;
      }
    }

        if (typeof updateData.website === "string") {
      const trimmed = updateData.website.trim();
      if (trimmed) {
        updateData.website = /^https?:\/\//i.test(trimmed)
          ? trimmed
          : `https://${trimmed}`;
      } else {
        updateData.website = null;
      }
    }

    const updatedJob = await prisma.jobOpportunity.update({
      where: { id },
      data: updateData,
    });

    return successResponse(updatedJob, {
      message: "Job Opportunity updated successfully.",
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

    const existingJob = await prisma.jobOpportunity.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingJob) {
      return errorResponse("JOB_NOT_FOUND", "Job Opportunity not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    await prisma.jobOpportunity.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    if (existingJob.logoPublicId) {
      await deleteAsset(existingJob.logoPublicId);
    }

    if (existingJob.jdDocPublicId) {
      await deleteAsset(existingJob.jdDocPublicId, "raw");
    }

    return successResponse(null, {
      message: "Job Opportunity deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
