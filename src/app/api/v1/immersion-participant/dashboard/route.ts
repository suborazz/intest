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

    if (!userId || (userRole !== "IMMERSION_USER" && userRole !== "STUDENT")) {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

        const [
      user,
      profile,
      applications,
      notices,
      tickets,
      certificateCount,
      idCardCount,
      projectCount,
    ] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.immersionParticipantProfile.findUnique({
        where: { userId },
      }),
      prisma.immersionApplication.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          immersionId: true,
          createdAt: true,
          remarks: true,
          preferredDuration: true,
          preferredLocation: true,
          preferredStartDate: true,
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
              status: true,
              categoryId: true,
              category: { select: { id: true, name: true } },
            },
          },
          certificate: {
            select: { id: true, certificateNo: true, issuedAt: true },
          },
          idCard: { select: { id: true, cardNo: true, issuedAt: true } },
        },
      }),
            prisma.notice.findMany({
        where: {
          OR: [{ targetRole: "IMMERSION_USER" }, { receiverId: userId }],
        },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          noticeNumber: true,
          date: true,
          title: true,
          category: true,
          description: true,
          pdfUrl: true,
          createdAt: true,
          sender: { select: { name: true } },
        },
      }),
            prisma.supportTicket.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          ticketNo: true,
          title: true,
          status: true,
          priority: true,
          createdAt: true,
        },
      }),
            prisma.immersionCertificate.count({
        where: { application: { userId } },
      }),
            prisma.immersionIdCard.count({
        where: { studentId: userId },
      }),
            prisma.projectSubmission.count({
        where: { enrollment: { userId } },
      }),
    ]);

        const application = pickPrimaryImmersionApplication(applications);

        let profileCompletion = 0;
    if (profile) {
      const fields = [
        profile.fullName,
        profile.fatherMotherName,
        profile.dateOfBirth,
        profile.gender,
        profile.mobileNumber,
        profile.emailAddress,
        profile.permLocalArea,
        profile.permDistrict,
        profile.permState,
        profile.permCountry,
        profile.permPinCode,
        profile.passportPhotoUrl,
        profile.resumeUrl,
        profile.nocUrl,
      ];
      const filled = fields.filter(
        (f) => f !== null && f !== undefined && String(f).trim() !== "",
      ).length;
      profileCompletion = Math.round((filled / fields.length) * 100);
    }

        let totalImmersionDays = 0;
    if (application?.immersion?.startDate && application?.immersion?.endDate) {
      const start = new Date(application.immersion.startDate).getTime();
      const end = new Date(application.immersion.endDate).getTime();
      totalImmersionDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }

        let applicationStatus:
      "NOT_REGISTERED" | "PENDING" | "APPROVED" | "REJECTED" = "NOT_REGISTERED";
    if (application) {
      if (application.status === "DRAFT") {
        applicationStatus = "NOT_REGISTERED";
      } else if (
        application.status === "SUBMITTED" ||
        application.status === "UNDER_REVIEW"
      ) {
        applicationStatus = "PENDING";
      } else if (application.status === "APPROVED") {
        applicationStatus = "APPROVED";
      } else if (application.status === "REJECTED") {
        applicationStatus = "REJECTED";
      }
    }

        let registrationStatus:
      "PENDING" | "APPROVED" | "REJECTED" | "NOT_REGISTERED" = "NOT_REGISTERED";
    if (application?.immersionId) {
      const reg = await prisma.immersionRegistration.findUnique({
        where: {
          studentId_immersionId: {
            studentId: userId,
            immersionId: application.immersionId,
          },
        },
      });
      if (reg) {
        if (reg.status === "PENDING") registrationStatus = "PENDING";
        else if (reg.status === "APPROVED") registrationStatus = "APPROVED";
        else if (reg.status === "REJECTED") registrationStatus = "REJECTED";
      }
    }

    const stats = {
      totalApplications: applications.length,
      totalProjectsSubmitted: projectCount,
      totalCertificatesIssued: certificateCount,
      totalIdCardsIssued: idCardCount,
    };

    interface ActivityItem {
      id: string;
      type: "NOTICE" | "SUPPORT_TICKET";
      title: string;
      description?: string;
      createdAt: string;
    }

        const recentActivities: ActivityItem[] = [];
    notices.forEach((notice) => {
      recentActivities.push({
        id: notice.id,
        type: "NOTICE",
        title: notice.title,
        description: notice.description || undefined,
        createdAt: notice.createdAt.toISOString(),
      });
    });
    tickets.forEach((ticket) => {
      recentActivities.push({
        id: ticket.id,
        type: "SUPPORT_TICKET",
        title: `Ticket: ${ticket.title}`,
        description: `Status: ${ticket.status}`,
        createdAt: ticket.createdAt.toISOString(),
      });
    });
    recentActivities.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return successResponse({
      user,
      profile,
      application,
      applications,
      stats,
      recentActivities: recentActivities.slice(0, 10),
      notices: notices.slice(0, 5),
      registrationStatus,
      applicationStatus,
      applicationId: application?.id || null,
    });
  } catch (error) {
    return handleError(error);
  }
}
