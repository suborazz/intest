import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

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

import { cloudinary } from "@/x/cloudinary";

const createSubmissionSchema = z
  .object({
    enrollmentId: z.string().min(1, "Enrollment ID is required"),
    projectTitle: z.string().min(3, "Project title is required").trim(),
    projectUrl: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || /^https?:\/\/.+/i.test(val), {
        message: "Invalid URL format for project submission",
      }),
    documentBase64: z
      .string()
      .max(16_000_000, "Document file must be under 10 MB")
      .optional(),
    documentName: z.string().optional(),
    comments: z.string().optional(),
  })
  .refine((data) => Boolean(data.projectUrl || data.documentBase64), {
    message: "Please provide either a Project Link or upload a Project Document.",
    path: ["projectUrl"],
  });

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || !userRole) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }
    if (userRole !== "INSTRUCTOR" && userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Instructor privileges required.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const submissions = await prisma.projectSubmission.findMany({
      where:
        userRole === "INSTRUCTOR"
          ? {
              enrollment: {
                internship: { instructorId: userId },
              },
            }
          : {},
      include: {
        enrollment: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            internship: { select: { id: true, title: true } },
          },
        },
        gradedBy: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(submissions);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || !userRole) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }
    if (userRole !== "STUDENT") {
      return errorResponse(
        "FORBIDDEN",
        "Only enrolled Students can submit projects.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const body = await request.json();
    const result = createSubmissionSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("BAD_REQUEST", "Validation failed.", {
        status: HTTP_2.BAD_REQUEST,
        details: result.error.flatten().fieldErrors,
      });
    }

    const {
      enrollmentId,
      projectTitle,
      projectUrl,
      documentBase64,
      documentName,
      comments,
    } = result.data;

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      return errorResponse("NOT_FOUND", "Enrollment not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }
    if (enrollment.userId !== userId) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. You do not own this enrollment.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    let finalProjectUrl = projectUrl?.trim() || "";
    let finalComments = comments?.trim() || "";

    if (documentBase64) {
      try {
        const fileExt = documentName && documentName.includes(".")
          ? documentName.slice(documentName.lastIndexOf("."))
          : "";
        const uploadRes = await cloudinary.uploader.upload(documentBase64, {
          folder: "project-submissions",
          resource_type: "auto",
          public_id: `doc-${enrollmentId}-${Date.now()}${fileExt}`,
          overwrite: false,
        });

        if (!finalProjectUrl) {
          finalProjectUrl = uploadRes.secure_url;
        } else {
          const docNote = `[Uploaded Document: ${documentName || "Project Document"}](${uploadRes.secure_url})`;
          finalComments = finalComments ? `${finalComments}\n\n${docNote}` : docNote;
        }
      } catch (uploadError) {
        console.error("[Upload Error] Failed to upload project document:", uploadError);
        return errorResponse(
          "INTERNAL_SERVER_ERROR",
          "Failed to upload project document to cloud storage.",
          { status: HTTP_2.INTERNAL_SERVER_ERROR },
        );
      }
    }

    const submission = await prisma.projectSubmission.create({
      data: {
        enrollmentId,
        projectTitle,
        projectUrl: finalProjectUrl,
        comments: finalComments || null,
      },
    });

    return successResponse(submission, {
      message: "Project submitted successfully.",
      status: HTTP_2.CREATED,
    });
  } catch (error) {
    return handleError(error);
  }
}
