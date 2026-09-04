import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
    interface PaginationMeta {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    }

    function buildPaginationMeta(
      total: number,
      page: number,
      limit: number,
    ): PaginationMeta {
      const totalPages = Math.ceil(total / limit);
      return {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      };
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

    function parsePaginationParams(searchParams: URLSearchParams): {
      page: number;
      limit: number;
      skip: number;
    } {
      const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
      const limit = Math.min(
        100,
        Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)),
      );
      return { page, limit, skip: (page - 1) * limit };
    }

  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: targetId } = await params;

        const internship = await prisma.internship.findFirst({
      where: {
        id: targetId,
        deletedAt: null,
      },
    });

    if (!internship) {
      return errorResponse("INTERNSHIP_NOT_FOUND", "Internship not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const internshipId = internship.id;

        if (requesterRole !== "SUPER_ADMIN") {
      if (
        requesterRole !== "INSTRUCTOR" ||
        (internship.instructorId !== requesterId &&
          internship.createdById !== requesterId)
      ) {
        return errorResponse(
          "FORBIDDEN",
          "Access denied. Only the assigned instructor or admin can view applications.",
          {
            status: HTTP_2.FORBIDDEN,
          },
        );
      }
    }

    const { searchParams } = request.nextUrl;
    const statusFilter = searchParams.get("status") as
      "UNDER_REVIEW" | "APPROVED" | "REJECTED" | null;

    if (
      internship.category === "ON_CAMPUS" ||
      internship.category === "VIRTUAL"
    ) {
      const interests = await prisma.internshipInterest.findMany({
        where: { internshipId },
        orderBy: { createdAt: "desc" },
      });

      const formattedInterests = interests.map((interest) => {
        return {
          id: interest.id,
          status: "APPROVED",
          appliedAt: interest.createdAt,
          reviewedAt: interest.createdAt,
          reviewNote: "Expression of Interest",
          updatedAt: interest.createdAt,
          studentId: null,
          internshipId: interest.internshipId,
          reviewedById: null,
          enrollmentId: null,
          student: null,
          reviewedBy: null,
          applicationId: interest.id,
          paymentStatus: "FREE",
          applicationStatus: "APPROVED",
          registration: {
            id: interest.id,
            fullName: interest.name,
            email: interest.email,
            mobileNo: interest.mobile,
            education: interest.education,
            localAddress: interest.address || "",
            permanentAddress: interest.address || "",
            academics: [
              {
                qualification: interest.education,
                stream: "",
              },
            ],
          },
        };
      });

      let combined = formattedInterests;
      if (statusFilter) {
        combined = combined.filter((app) => app.status === statusFilter);
      }

      const total = combined.length;
      const limitParam = searchParams.get("limit");
      const pageParam = searchParams.get("page");
      let paginated = combined;
      let page = 1;
      let limit = total || 10;

      if (limitParam || pageParam) {
        const params = parsePaginationParams(searchParams);
        page = params.page;
        limit = params.limit;
        paginated = combined.slice(params.skip, params.skip + params.limit);
      }

      const meta = buildPaginationMeta(total, page, limit);
      return successResponse(paginated, { meta });
    }

        const applications = await prisma.internshipApplication.findMany({
      where: { internshipId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            studentRegistration: {
              include: {
                academics: true,
                skills: true,
              },
            },
          },
        },
        reviewedBy: { select: { id: true, name: true } },
      },
      orderBy: { appliedAt: "desc" },
    });

        const enrollments = await prisma.enrollment.findMany({
      where: { internshipId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            studentRegistration: {
              include: {
                academics: true,
                skills: true,
              },
            },
          },
        },
        payment: true,
        certificate: true,
      },
    });

        const formattedApplications = applications.map((app) => {
      const reg = app.student?.studentRegistration;
      let localAddress = "";
      if (reg) {
        localAddress = [
          reg.localAddressLocal,
          reg.localAddressBlock,
          reg.localAddressDistrict,
          reg.localAddressState,
          reg.localAddressCountry,
          reg.localAddressPinCode,
        ]
          .filter(Boolean)
          .join(", ");
      }

      let permanentAddress = "";
      if (reg) {
        permanentAddress = reg.sameAsLocal
          ? localAddress
          : [
              reg.permAddressLocal,
              reg.permAddressBlock,
              reg.permAddressDistrict,
              reg.permAddressState,
              reg.permAddressCountry,
              reg.permAddressPinCode,
            ]
              .filter(Boolean)
              .join(", ");
      }

            const matchingEnrollment = enrollments.find(
        (e) => e.userId === app.studentId,
      );
      const paymentStatus =
        matchingEnrollment?.payment?.status === "COMPLETED" ||
        (app.status === "APPROVED" && internship.type === "PAID")
          ? "PAID"
          : "FREE";

      return {
        ...app,
        applicationId: app.id,
        enrollmentId: matchingEnrollment?.id || null,
        certificate: matchingEnrollment?.certificate || null,
        isCertIssued: !!matchingEnrollment?.certificate,
        paymentStatus,
        applicationStatus: app.status,
        registration: reg
          ? {
              ...reg,
              fullName: reg.fullName || app.student?.name || "",
              email: app.student?.email || "",
              localAddress,
              permanentAddress,
            }
          : null,
      };
    });

        const enrolledUserIds = new Set(applications.map((app) => app.studentId));
    const orphanEnrollments = enrollments.filter(
      (e) => !enrolledUserIds.has(e.userId),
    );

    const formattedOrphans = orphanEnrollments.map((e) => {
      const reg = e.user?.studentRegistration;
      let localAddress = "";
      if (reg) {
        localAddress = [
          reg.localAddressLocal,
          reg.localAddressBlock,
          reg.localAddressDistrict,
          reg.localAddressState,
          reg.localAddressCountry,
          reg.localAddressPinCode,
        ]
          .filter(Boolean)
          .join(", ");
      }

      let permanentAddress = "";
      if (reg) {
        permanentAddress = reg.sameAsLocal
          ? localAddress
          : [
              reg.permAddressLocal,
              reg.permAddressBlock,
              reg.permAddressDistrict,
              reg.permAddressState,
              reg.permAddressCountry,
              reg.permAddressPinCode,
            ]
              .filter(Boolean)
              .join(", ");
      }

      const pStatus = e.payment?.status === "COMPLETED" ? "PAID" : "FREE";

      return {
        id: `enroll-${e.id}`,
        status: "APPROVED",
        appliedAt: e.createdAt,
        reviewedAt: e.createdAt,
        reviewNote: "Enrolled via Payment",
        updatedAt: e.createdAt,
        studentId: e.userId,
        internshipId: e.internshipId,
        reviewedById: null,
        enrollmentId: e.id,
        certificate: e.certificate || null,
        isCertIssued: !!e.certificate,
        student: e.user,
        reviewedBy: null,
        applicationId: `enroll-${e.id}`,
        paymentStatus: pStatus,
        applicationStatus: "APPROVED",
        registration: reg
          ? {
              ...reg,
              fullName: reg.fullName || e.user?.name || "",
              email: e.user?.email || "",
              localAddress,
              permanentAddress,
            }
          : null,
      };
    });

        let combined = [...formattedApplications, ...formattedOrphans];
    if (statusFilter) {
      combined = combined.filter((app) => app.status === statusFilter);
    }

    const total = combined.length;

        const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");
    let paginated = combined;
    let page = 1;
    let limit = total || 10;

    if (limitParam || pageParam) {
      const params = parsePaginationParams(searchParams);
      page = params.page;
      limit = params.limit;
      paginated = combined.slice(params.skip, params.skip + params.limit);
    }

    const meta = buildPaginationMeta(total, page, limit);
    return successResponse(paginated, { meta });
  } catch (error) {
    return handleError(error);
  }
}
