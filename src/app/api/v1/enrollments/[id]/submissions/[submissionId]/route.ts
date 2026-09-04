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

const updateSubmissionSchema = z.object({
  projectTitle: z.string().min(3, "Project title is required").trim(),
  projectUrl: z
    .string()
    .url("Invalid URL format for project submission")
    .trim(),
  comments: z.string().optional(),
});

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; submissionId: string }>;
}

async function loadOwnedSubmission(
  enrollmentId: string,
  submissionId: string,
  requesterId: string,
) {
  const submission = await prisma.projectSubmission.findFirst({
    where: { id: submissionId, enrollmentId },
    include: { enrollment: true },
  });

  if (!submission) return { submission: null, error: "NOT_FOUND" as const };
  if (submission.enrollment.userId !== requesterId) {
    return { submission: null, error: "FORBIDDEN" as const };
  }
  return { submission, error: null };
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: enrollmentId, submissionId } = await params;
    const { submission, error } = await loadOwnedSubmission(
      enrollmentId,
      submissionId,
      requesterId,
    );

    if (error === "NOT_FOUND") {
      return errorResponse("NOT_FOUND", "Submission not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }
    if (error === "FORBIDDEN" || !submission) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. You do not own this submission.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    if (submission.status === "GRADED") {
      return errorResponse(
        "CONFLICT",
        "This submission has already been graded and can no longer be edited.",
        { status: HTTP_2.CONFLICT },
      );
    }

    const body = await request.json();
    const parsed = updateSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const updated = await prisma.projectSubmission.update({
      where: { id: submissionId },
      data: {
        projectTitle: parsed.data.projectTitle,
        projectUrl: parsed.data.projectUrl,
        comments: parsed.data.comments || null,
      },
    });

    return successResponse(updated, {
      message: "Submission updated successfully.",
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
    const requesterId = request.headers.get("X-User-Id");
    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: enrollmentId, submissionId } = await params;
    const { submission, error } = await loadOwnedSubmission(
      enrollmentId,
      submissionId,
      requesterId,
    );

    if (error === "NOT_FOUND") {
      return errorResponse("NOT_FOUND", "Submission not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }
    if (error === "FORBIDDEN" || !submission) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. You do not own this submission.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    if (submission.status === "GRADED") {
      return errorResponse(
        "CONFLICT",
        "This submission has already been graded and can no longer be deleted.",
        { status: HTTP_2.CONFLICT },
      );
    }

    await prisma.projectSubmission.delete({ where: { id: submissionId } });

    return successResponse(null, {
      message: "Submission deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
