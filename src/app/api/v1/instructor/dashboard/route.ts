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

    if (!userId || userRole !== "INSTRUCTOR") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Instructor credentials required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

        const [
      totalAssignedByI3,
      totalPostYourself,
      myTotalInterns,
      totalInternshipsDone,
      totalImmersionsDone,
      totalPendingEvaluations,
      totalPendingApplications,
      totalPendingImmersionRegistrations,
      recentApplications,
      recentStudents,
      assignedInternships,
      recentNotices,
      recentSubmissions,
      recentFeedbacks,
      assignedImmersions,
      recentImmersionRegistrations,
      paymentsEarningsAggregate,
    ] = await Promise.all([
            prisma.internship.count({
        where: {
          instructorId: userId,
          createdById: { not: userId },
          isApproved: true,
          deletedAt: null,
        },
      }),

            prisma.internship.count({
        where: {
          instructorId: userId,
          createdById: userId,
          isApproved: true,
          deletedAt: null,
        },
      }),

            Promise.resolve(0),

            Promise.resolve(0),

            prisma.immersion.count({
        where: {
          instructorId: userId,
          instructorApprovalStatus: "APPROVED",
        },
      }),

            prisma.projectSubmission.count({
        where: {
          status: "PENDING",
          enrollment: {
            internship: { instructorId: userId, deletedAt: null },
          },
        },
      }),

            prisma.internshipApplication.count({
        where: {
          status: "UNDER_REVIEW",
          internship: { instructorId: userId, deletedAt: null },
        },
      }),

            prisma.immersionRegistration.count({
        where: {
          status: "PENDING",
          immersion: { instructorId: userId },
        },
      }),

            prisma.internshipApplication.findMany({
        where: {
          internship: { instructorId: userId, deletedAt: null },
          status: "UNDER_REVIEW",
        },
        include: {
          student: { select: { id: true, name: true, email: true } },
          internship: { select: { id: true, title: true } },
        },
        orderBy: { appliedAt: "desc" },
        take: 3,
      }),

            prisma.enrollment.findMany({
        where: {
          internship: { instructorId: userId, deletedAt: null },
          completedAt: null,
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
          internship: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),

            prisma.internship.findMany({
        where: { instructorId: userId, deletedAt: null, isActive: true },
        select: {
          id: true,
          title: true,
          companyName: true,
          mode: true,
          type: true,
          startDate: true,
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),

            prisma.notice.findMany({
        where: {
          OR: [{ targetRole: "INSTRUCTOR" }, { receiverId: userId }],
        },
        include: {
          sender: { select: { id: true, name: true, email: true, role: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

            prisma.projectSubmission.findMany({
        where: {
          enrollment: {
            internship: { instructorId: userId, deletedAt: null },
          },
        },
        include: {
          enrollment: {
            include: {
              user: { select: { id: true, name: true, email: true } },
              internship: { select: { id: true, title: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

            prisma.feedback.findMany({
        where: {
          receiverId: userId,
          type: "STUDENT_TO_INSTRUCTOR",
        },
        include: {
          sender: { select: { id: true, name: true, email: true } },
          enrollment: {
            include: {
              internship: { select: { id: true, title: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),

            prisma.immersion.findMany({
        where: { instructorId: userId },
        select: {
          id: true,
          title: true,
          status: true,
          startDate: true,
          endDate: true,
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),

            prisma.immersionRegistration.findMany({
        where: {
          status: "PENDING",
          immersion: { instructorId: userId },
        },
        include: {
          student: { select: { id: true, name: true, email: true } },
          immersion: { select: { id: true, title: true } },
        },
        orderBy: { registeredAt: "desc" },
        take: 3,
      }),

            prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: "COMPLETED",
          internship: { instructorId: userId, deletedAt: null },
        },
      }),
    ]);

    const dashboardData = {
      stats: {
        totalInternshipsAssignedByI3: totalAssignedByI3,
        totalInternshipsPostYourself: totalPostYourself,
        myTotalInterns: myTotalInterns,
        totalImmersionDoneByMe: totalImmersionsDone,
        totalPaymentEarnings: paymentsEarningsAggregate._sum.amount || 0,
        totalPendingEvaluations,
        totalPendingApplications,
        totalPendingImmersionRegistrations,
      },
      recentApplications,
      recentStudents,
      assignedInternships,
      recentNotices,
      recentSubmissions,
      recentFeedbacks,
      assignedImmersions,
      recentImmersionRegistrations,
    };

    return successResponse(dashboardData);
  } catch (error) {
    return handleError(error);
  }
}
