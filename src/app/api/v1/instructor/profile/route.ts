import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { ZodError } from "zod";
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

const createInstructorProfileSchema = z.object({
  qualification: z.string().min(2, "Qualification is required"),
  experience: z.string().min(1, "Experience is required"),
  specialization: z.string().min(2, "Specialization is required"),
  bio: z.string().max(1000).optional(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "INSTRUCTOR") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Instructor credentials required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");
    const isJson = contentType.includes("application/json");

    if (!isMultipart && !isJson) {
      return errorResponse(
        "BAD_REQUEST",
        "Content-type must be application/json or multipart/form-data",
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

    let inputData: Record<string, unknown>;
    let resumeFile: File | null = null;

    if (isJson) {
      const body = await request.json();
      inputData = {
        qualification: body.qualification,
        experience: body.experience,
        specialization: body.specialization,
        bio: body.bio || undefined,
      };
    } else {
      const formData = await request.formData();
      inputData = {
        qualification: formData.get("qualification"),
        experience: formData.get("experience"),
        specialization: formData.get("specialization"),
        bio: formData.get("bio") || undefined,
      };
      resumeFile = formData.get("resume") as File | null;
    }

        const parsed = createInstructorProfileSchema.safeParse(inputData);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid form inputs.", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { qualification, experience, specialization, bio } = parsed.data;

        const existingProfile = await prisma.instructorProfile.findUnique({
      where: { userId },
    });

        let resumeUrl: string | null = null;
    let resumePublicId: string | null = null;

    if (
      resumeFile &&
      typeof resumeFile !== "string" &&
      "size" in resumeFile &&
      resumeFile.size > 0
    ) {
            if (resumeFile.size > 5 * 1024 * 1024) {
        return errorResponse(
          "VALIDATION_ERROR",
          "Resume file size exceeds the 5MB limit.",
          {
            status: HTTP_2.UNPROCESSABLE,
          },
        );
      }

            if (
        resumeFile.type !== "application/pdf" &&
        resumeFile.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return errorResponse(
          "VALIDATION_ERROR",
          "Resume must be a PDF or DOCX file.",
          {
            status: HTTP_2.UNPROCESSABLE,
          },
        );
      }

      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await uploadBuffer(
        buffer,
        "iiit/instructors/resumes",
        `resume-${userId}`,
        "raw", 
      );
      resumeUrl = uploadResult.url;
      resumePublicId = uploadResult.publicId;

            if (existingProfile?.resumePublicId) {
        await deleteAsset(existingProfile.resumePublicId, "raw");
      }
    }

    let profile;

    if (existingProfile) {
      profile = await prisma.instructorProfile.update({
        where: { userId },
        data: {
          qualification,
          experience,
          specialization,
          bio: bio ?? null,
          ...(resumeUrl ? { resumeUrl, resumePublicId } : {}),
        },
      });
    } else {
      profile = await prisma.instructorProfile.create({
        data: {
          userId,
          qualification,
          experience,
          specialization,
          bio: bio ?? null,
          resumeUrl,
          resumePublicId,
          isApproved: true,
          approvedAt: new Date(),
        },
      });
    }

    return successResponse(profile, {
      message: "INSTRUCTOR profile updated successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "INSTRUCTOR") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Instructor credentials required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const profile = await prisma.instructorProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (!profile) {
      return errorResponse(
        "PROFILE_NOT_FOUND",
        "INSTRUCTOR profile has not been created yet.",
        {
          status: HTTP_2.NOT_FOUND,
        },
      );
    }

    return successResponse(profile);
  } catch (error) {
    return handleError(error);
  }
}
