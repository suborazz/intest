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

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (userRole !== "STUDENT" && userRole !== "IMMERSION_USER") {
      return errorResponse(
        "FORBIDDEN",
        "Only students and immersion participants can access this dashboard summary.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

        const [
      totalApplied,
      totalEnrolled,
      totalCompleted,
      totalCertificates,
      recentApplications,
      recentEnrollments,
      recentCertificates,
      recentNotices,
      recentSubmissions,
    ] = await Promise.all([
            prisma.internshipApplication.count({ where: { studentId: userId } }),

            prisma.enrollment.count({ where: { userId, completedAt: null } }),

            prisma.enrollment.count({
        where: { userId, NOT: { completedAt: null } },
      }),

            prisma.certificate.count({ where: { studentId: userId } }),

            prisma.internshipApplication.findMany({
        where: { studentId: userId },
        include: {
          internship: {
            select: {
              id: true,
              title: true,
              companyName: true,
              mode: true,
              location: true,
              type: true,
              startDate: true,
            },
          },
        },
        orderBy: { appliedAt: "desc" },
        take: 3,
      }),

            prisma.enrollment.findMany({
        where: { userId, completedAt: null },
        include: {
          internship: {
            select: {
              id: true,
              title: true,
              companyName: true,
              location: true,
              mode: true,
              duration: true,
              startDate: true,
              instructor: { select: { id: true, name: true, email: true } },
            },
          },
          idCard: { select: { id: true, cardNo: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),

            prisma.certificate.findMany({
        where: { studentId: userId },
        include: {
          internship: { select: { id: true, title: true, companyName: true } },
        },
        orderBy: { issuedAt: "desc" },
        take: 3,
      }),

            prisma.notice.findMany({
        where: {
          OR: [{ targetRole: "STUDENT" }, { receiverId: userId }],
        },
        include: {
          sender: { select: { id: true, name: true, email: true, role: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),

            prisma.projectSubmission.findMany({
        where: {
          enrollment: { userId },
        },
        include: {
          enrollment: {
            include: {
              internship: { select: { title: true } },
            },
          },
          gradedBy: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);

    const dashboardData = {
      stats: {
        totalApplied,
        totalEnrolled,
        totalCompleted,
        totalCertificates,
      },
      recentApplications,
      recentEnrollments,
      recentCertificates,
      recentNotices,
      recentSubmissions,
    };

    return successResponse(dashboardData);
  } catch (error) {
    return handleError(error);
  }
}
