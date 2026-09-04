import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
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

    const IMMERSION_STATUS_RANK: Record<string, number> = {
      APPROVED: 4,
      UNDER_REVIEW: 3,
      SUBMITTED: 3,
      REJECTED: 2,
      DRAFT: 1,
    };

    function pickPrimaryImmersionApplication<
      T extends { status: string; createdAt?: Date | string | null },
    >(applications: readonly T[]): T | null {
      if (applications.length === 0) return null;

      return applications.reduce((best, current) => {
        const bestRank = IMMERSION_STATUS_RANK[best.status] ?? 0;
        const currentRank = IMMERSION_STATUS_RANK[current.status] ?? 0;
        if (currentRank !== bestRank)
          return currentRank > bestRank ? current : best;

        const bestTime = best.createdAt ? new Date(best.createdAt).getTime() : 0;
        const currentTime = current.createdAt
          ? new Date(current.createdAt).getTime()
          : 0;
        return currentTime > bestTime ? current : best;
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
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "IMMERSION_USER") {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const applications = await prisma.immersionApplication.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        createdAt: true,
        remarks: true,
        submittedAt: true,
        approvedAt: true,
        assignedMentor: { select: { id: true, name: true, email: true } },
        immersion: {
          select: {
            id: true,
            title: true,
            location: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    const application = pickPrimaryImmersionApplication(applications);

    if (!application) {
      return successResponse({
        status: "NOT_REGISTERED",
        message: "You have not submitted an application yet.",
      });
    }

        let status: "NOT_REGISTERED" | "PENDING" | "APPROVED" | "REJECTED" =
      "NOT_REGISTERED";
    if (application.status === "DRAFT") {
      status = "NOT_REGISTERED";
    } else if (
      application.status === "SUBMITTED" ||
      application.status === "UNDER_REVIEW"
    ) {
      status = "PENDING";
    } else if (application.status === "APPROVED") {
      status = "APPROVED";
    } else if (application.status === "REJECTED") {
      status = "REJECTED";
    }

    return successResponse({
      status,
      remarks: application.remarks,
      submittedAt: application.submittedAt
        ? application.submittedAt.toISOString()
        : null,
      reviewedAt: application.approvedAt
        ? application.approvedAt.toISOString()
        : null,
      applicationId: application.id,
      assignedMentor: application.assignedMentor,
      immersion: application.immersion,
    });
  } catch (error) {
    return handleError(error);
  }
}
