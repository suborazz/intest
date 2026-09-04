import { ApplicationStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; appId: string }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
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

    const updateInternshipStatusSchema = z.object({
      status: z.nativeEnum(ApplicationStatus, {
        error: "Status is required",
      }),
      reviewNote: z.string().optional(),
    });

  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: internshipId, appId } = await params;

    const internship = await prisma.internship.findFirst({
      where: { id: internshipId, deletedAt: null },
    });

    if (!internship) {
      return errorResponse("INTERNSHIP_NOT_FOUND", "Internship not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        const isOwner =
      requesterRole === "SUPER_ADMIN" ||
      (requesterRole === "INSTRUCTOR" &&
        (internship.instructorId === requesterId ||
          internship.createdById === requesterId));
    if (!isOwner) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Only the assigned instructor or admin can update application status.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const application = await prisma.internshipApplication.findFirst({
      where: { id: appId, internshipId },
    });

    if (!application) {
      return errorResponse("APPLICATION_NOT_FOUND", "Application not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const body = await request.json().catch(() => ({}));
    const parsed = updateInternshipStatusSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid status payload", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const newStatus = parsed.data.status;
    const reviewNote = parsed.data.reviewNote ?? null;

    const updatedApp = await prisma.$transaction(async (tx) => {
      let enrollmentId = application.enrollmentId;

            if (newStatus === "APPROVED" && !application.enrollmentId) {
        const enrollment = await tx.enrollment.create({
          data: {
            userId: application.studentId,
            internshipId: application.internshipId,
          },
        });
        enrollmentId = enrollment.id;
      }

            if (newStatus !== "APPROVED" && application.enrollmentId) {
        await tx.enrollment
          .delete({
            where: { id: application.enrollmentId },
          })
          .catch(() => {});
        enrollmentId = null;
      }

            return await tx.internshipApplication.update({
        where: { id: appId },
        data: {
          status: newStatus,
          reviewedAt: new Date(),
          reviewedById: requesterId,
          reviewNote,
          enrollmentId,
        },
        include: {
          student: { select: { id: true, name: true, email: true } },
          internship: {
            select: { id: true, title: true, companyName: true, type: true },
          },
          reviewedBy: { select: { id: true, name: true } },
        },
      });
    });

        if (newStatus === "APPROVED" && updatedApp.enrollmentId) {
      const { issueIdCard } = await import("@/x/c6f69c52");
      await issueIdCard(application.studentId, updatedApp.enrollmentId);
    }

    return successResponse(updatedApp, {
      message: `Internship application status updated to ${newStatus} successfully.`,
    });
  } catch (error) {
    return handleError(error);
  }
}
