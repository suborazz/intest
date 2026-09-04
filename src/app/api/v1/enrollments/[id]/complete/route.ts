import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
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

  try {
    const requesterRole = request.headers.get("X-User-Role");
    const requesterId = request.headers.get("X-User-Id");

    if (
      !requesterId ||
      (requesterRole !== "SUPER_ADMIN" && requesterRole !== "INSTRUCTOR")
    ) {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id: enrollmentId } = await params;

    const enrollment = await prisma.enrollment.findFirst({
      where: { id: enrollmentId },
      include: {
        internship: {
          select: {
            id: true,
            instructorId: true,
            title: true,
            companyName: true,
          },
        },
      },
    });

    if (!enrollment) {
      return errorResponse("ENROLLMENT_NOT_FOUND", "Enrollment not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        if (
      requesterRole === "INSTRUCTOR" &&
      enrollment.internship.instructorId !== requesterId
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You are not the assigned instructor for this internship.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    if (enrollment.completedAt) {
      return errorResponse(
        "ALREADY_COMPLETED",
        "This enrollment is already marked as completed.",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

    const updated = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { completedAt: new Date() },
      include: {
        internship: { select: { id: true, title: true, companyName: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });

        const { sendInternshipEnrollmentCompletedEmail } =
      await import("@/x/b7e0f2d7");
    sendInternshipEnrollmentCompletedEmail(
      updated.user.email,
      updated.user.name || "",
      updated.internship.title,
      updated.internship.companyName,
    ).catch((err) =>
      console.error(
        "[EMAIL ERROR] Failed to send enrollment completion email:",
        err,
      ),
    );

    return successResponse(updated, {
      message: "Enrollment marked as completed successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
