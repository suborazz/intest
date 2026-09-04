import { UserRole } from "@prisma/client";
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

const createJobPlacementCompanySchema = z.object({
  name: z.string().min(2, "Name is required").trim(),
  address: z.string().min(5, "Address is required").trim(),
  postOpportunity: z
    .string()
    .min(2, "Post/Opportunity title is required")
    .trim(),
  jobNature: z.string().min(2, "Job nature is required").trim(),
  fieldOfEmployment: z
    .string()
    .min(2, "Field of employment is required")
    .trim(),
  minQualification: z
    .string()
    .min(2, "Minimum qualification is required")
    .trim(),
  skillsRequired: z.array(z.string()).min(1, "At least one skill is required"),
  staffStrength: z.string().min(1, "Staff strength is required").trim(),
  website: z.string().url("Invalid website URL").trim(),
  logo: z.string().optional().nullable(),
  logoPublicId: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
  photoPublicId: z.string().optional().nullable(),
});

const updateJobPlacementCompanySchema =
  createJobPlacementCompanySchema.partial();

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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const company = await prisma.jobPlacementCompany.findUnique({
      where: { id },
    });

    if (!company) {
      return errorResponse("NOT_FOUND", "Job Placement Company not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    return successResponse(company);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;
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

    const existing = await prisma.jobPlacementCompany.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("NOT_FOUND", "Job Placement Company not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    let body: {
      name?: string;
      address?: string;
      postOpportunity?: string;
      jobNature?: string;
      fieldOfEmployment?: string;
      minQualification?: string;
      skillsRequired?: string[];
      staffStrength?: string;
      website?: string;
    } = {};
    let logoFile: File | null = null;
    let photoFile: File | null = null;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {};

      const name = formData.get("name");
      if (name !== null) body.name = name as string;

      const address = formData.get("address");
      if (address !== null) body.address = address as string;

      const postOpportunity = formData.get("postOpportunity");
      if (postOpportunity !== null)
        body.postOpportunity = postOpportunity as string;

      const jobNature = formData.get("jobNature");
      if (jobNature !== null) body.jobNature = jobNature as string;

      const fieldOfEmployment = formData.get("fieldOfEmployment");
      if (fieldOfEmployment !== null)
        body.fieldOfEmployment = fieldOfEmployment as string;

      const minQualification = formData.get("minQualification");
      if (minQualification !== null)
        body.minQualification = minQualification as string;

      const staffStrength = formData.get("staffStrength");
      if (staffStrength !== null) body.staffStrength = staffStrength as string;

      const website = formData.get("website");
      if (website !== null) body.website = website as string;

      const skillsRequiredRaw = formData.get("skillsRequired");
      if (skillsRequiredRaw !== null) {
        try {
          body.skillsRequired = JSON.parse(skillsRequiredRaw as string);
        } catch {
          body.skillsRequired = (skillsRequiredRaw as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }

      logoFile = formData.get("logo") as File | null;
      photoFile = formData.get("photo") as File | null;
    } else {
      body = await request.json();
    }

    const result = updateJobPlacementCompanySchema.safeParse(body);

    if (!result.success) {
      return errorResponse("VALIDATION_ERROR", "Validation failed.", {
        status: HTTP_2.UNPROCESSABLE,
        details: result.error.flatten().fieldErrors,
      });
    }

    const updateData: {
      name?: string;
      address?: string;
      postOpportunity?: string;
      jobNature?: string;
      fieldOfEmployment?: string;
      minQualification?: string;
      skillsRequired?: string[];
      staffStrength?: string;
      website?: string;
      logo?: string;
      logoPublicId?: string;
      photo?: string;
      photoPublicId?: string;
    } = {
      ...result.data,
      logo: result.data.logo ?? undefined,
      logoPublicId: result.data.logoPublicId ?? undefined,
      photo: result.data.photo ?? undefined,
      photoPublicId: result.data.photoPublicId ?? undefined,
    };

        if (logoFile && logoFile.size > 0) {
      if (existing.logoPublicId) {
        await deleteAsset(existing.logoPublicId, "image");
      }

      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadBuffer(
        buffer,
        "iiit/partners/logos",
        "logo",
      );
      updateData.logo = uploadResult.url;
      updateData.logoPublicId = uploadResult.publicId;
    }

        if (photoFile && photoFile.size > 0) {
      if (existing.photoPublicId) {
        await deleteAsset(existing.photoPublicId, "image");
      }

      const bytes = await photoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadBuffer(
        buffer,
        "iiit/partners/photos",
        "photo",
      );
      updateData.photo = uploadResult.url;
      updateData.photoPublicId = uploadResult.publicId;
    }

    const updated = await prisma.jobPlacementCompany.update({
      where: { id },
      data: updateData,
    });

    return successResponse(updated, {
      message: "Job Placement Company updated successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;
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

    const existing = await prisma.jobPlacementCompany.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse("NOT_FOUND", "Job Placement Company not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        if (existing.logoPublicId) {
      await deleteAsset(existing.logoPublicId, "image");
    }
    if (existing.photoPublicId) {
      await deleteAsset(existing.photoPublicId, "image");
    }

    await prisma.jobPlacementCompany.delete({
      where: { id },
    });

    return successResponse(
      { id },
      {
        message: "Job Placement Company deleted successfully.",
      },
    );
  } catch (error) {
    return handleError(error);
  }
}
