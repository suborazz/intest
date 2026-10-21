import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

export const dynamic = "force-dynamic";

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
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

function validationErrorResponse(error: ZodError): NextResponse<ApiErrorResponse> {
  return errorResponse("VALIDATION_ERROR", "Request validation failed", {
    status: HTTP.UNPROCESSABLE,
    details: error.flatten().fieldErrors,
  });
}

function handleError(error: unknown): NextResponse<ApiErrorResponse> {
  console.error("[API Error in reject application]", error);

  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  if (error instanceof Error) {
    let message = error.message;

    const prismaError = error as { code?: string; meta?: any };
    if (prismaError.code === "P2003") {
      message = "A referenced record was not found.";
    } else if (prismaError.code === "P2025") {
      message = "Application record was not found.";
    }

    return errorResponse("INTERNAL_SERVER_ERROR", message, {
      status: HTTP.INTERNAL_SERVER_ERROR,
    });
  }

  return errorResponse("UNKNOWN_ERROR", "An unexpected error occurred", {
    status: HTTP.INTERNAL_SERVER_ERROR,
  });
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

const rejectApplicationSchema = z.object({
  reviewNote: z
    .string({ error: "Rejection reason is required" })
    .min(5, "Rejection reason must be at least 5 characters")
    .max(500),
});

interface RouteContext {
  params: Promise<{ id: string; appId: string }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP.UNAUTHORIZED,
      });
    }

    const { id: internshipId, appId } = await params;

    const application = await prisma.internshipApplication.findFirst({
      where: { id: appId, internshipId },
      include: { internship: true },
    });

    if (!application) {
      return errorResponse("APPLICATION_NOT_FOUND", "Application not found.", {
        status: HTTP.NOT_FOUND,
      });
    }

    const normalizedRole = requesterRole?.toUpperCase();
    const hasAccess =
      normalizedRole === "SUPER_ADMIN" ||
      (normalizedRole === "INSTRUCTOR" &&
        (application.internship.instructorId === requesterId ||
          application.internship.createdById === requesterId));

    if (!hasAccess) {
      return errorResponse(
        "FORBIDDEN",
        "Only the assigned instructor or admin can reject applications.",
        {
          status: HTTP.FORBIDDEN,
        },
      );
    }

    if (application.status === "REJECTED") {
      return successResponse(application, {
        message: "Application is already rejected.",
      });
    }

    const rawBody: unknown = await request.json().catch(() => ({}));
    const bodyObj =
      rawBody && typeof rawBody === "object"
        ? (rawBody as Record<string, unknown>)
        : {};
    let initialReviewNote =
      typeof bodyObj.reviewNote === "string" ? bodyObj.reviewNote.trim() : "";
    if (initialReviewNote.length < 5) {
      initialReviewNote = "Rejected by administrator";
    }
    const parsed = rejectApplicationSchema.safeParse({
      reviewNote: initialReviewNote,
    });

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Rejection reason is required.", {
        status: HTTP.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const reviewNote = parsed.data.reviewNote;

    // Verify reviewer ID exists in User table
    let validReviewerId: string | null = null;
    if (requesterId) {
      const reviewer = await prisma.user.findUnique({
        where: { id: requesterId },
        select: { id: true },
      });
      if (reviewer) {
        validReviewerId = reviewer.id;
      }
    }

    const updatedApp = await prisma.$transaction(async (tx) => {
      if (application.enrollmentId) {
        await tx.enrollment
          .delete({
            where: { id: application.enrollmentId },
          })
          .catch((e) =>
            console.log("Enrollment already deleted or missing:", e.message),
          );
      } else {
        await tx.enrollment
          .deleteMany({
            where: {
              userId: application.studentId,
              internshipId: application.internshipId,
            },
          })
          .catch(() => {});
      }

      return await tx.internshipApplication.update({
        where: { id: appId },
        data: {
          status: "REJECTED",
          reviewedAt: new Date(),
          reviewedById: validReviewerId,
          reviewNote,
          enrollmentId: null,
        },
        include: {
          student: { select: { id: true, name: true, email: true } },
          internship: { select: { id: true, title: true, companyName: true } },
          reviewedBy: { select: { id: true, name: true } },
        },
      });
    });

    if (updatedApp.student?.email) {
      try {
        const { sendInternshipApplicationStatusUpdateEmail } = await import(
          "@/x/b7e0f2d7"
        );
        sendInternshipApplicationStatusUpdateEmail(
          updatedApp.student.email,
          updatedApp.student.name || "Student",
          updatedApp.internship?.title || "Internship Program",
          "REJECTED",
        ).catch((err) =>
          console.error(
            "[EMAIL ERROR] Failed to send internship application rejection email:",
            err,
          ),
        );
      } catch (err) {
        console.error("[EMAIL ERROR] Could not trigger status update email:", err);
      }
    }

    return successResponse(updatedApp, {
      message: "Application rejected. Any active enrollment was rolled back.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  return PATCH(request, context);
}
