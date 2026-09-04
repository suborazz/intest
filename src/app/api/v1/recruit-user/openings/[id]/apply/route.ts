import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
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
    const { id: jobOpportunityId } = await params;
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "RECRUIT_USER") {
      return errorResponse(
        "UNAUTHORIZED",
        "Recruit User credentials required.",
        {
          status: HTTP_2.UNAUTHORIZED,
        },
      );
    }

        const jobOpportunity = await prisma.jobOpportunity.findFirst({
      where: { id: jobOpportunityId, isActive: true, deletedAt: null },
    });

    if (!jobOpportunity) {
      return errorResponse(
        "JOB_NOT_FOUND",
        "Job Opportunity not found or is no longer active",
        {
          status: HTTP_2.NOT_FOUND,
        },
      );
    }

        const existing = await prisma.jobApplication.findFirst({
      where: {
        jobOpportunityId,
        userId,
        deletedAt: null,
      },
    });

    if (existing) {
      return errorResponse(
        "CONFLICT",
        "You have already applied for this job opportunity.",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

        const profile = await prisma.recruitProfile.findUnique({
      where: { userId },
      include: {
        academics: true,
      },
    });

    if (!profile) {
      return errorResponse(
        "PROFILE_NOT_FOUND",
        "Please complete your personal, educational, and document details in the profile section before applying.",
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

        let age = 0;
    if (profile.dob) {
      const birthDate = new Date(profile.dob);
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    }

        const address = `${profile.currAddressLocal}, ${profile.currAddressDistrict}, ${profile.currAddressState} - ${profile.currAddressPinCode}`;

        const qualification =
      profile.academics.map((a) => a.qualification).join(", ") || "N/A";

        const application = await prisma.jobApplication.create({
      data: {
        jobOpportunityId,
        userId,
        name: profile.fullName,
        age,
        address,
        mobile: profile.mobileNo,
        email: profile.email,
        qualification,
        skills: profile.languagesKnown || "N/A",
        resumeUrl: profile.resumeUrl,
        resumePublicId: profile.resumePublicId || "N/A",
      },
    });

        const { sendJobApplicationSubmittedEmail } = await import("@/x/b7e0f2d7");
    sendJobApplicationSubmittedEmail(
      profile.email,
      profile.fullName,
      jobOpportunity.postOpportunity,
      "IIInternship",
    ).catch((err) =>
      console.error(
        "[EMAIL ERROR] Failed to send job application confirmation:",
        err,
      ),
    );

    return successResponse(application, {
      status: HTTP_2.CREATED,
      message: "You have successfully applied for this job opportunity.",
    });
  } catch (error) {
    return handleError(error);
  }
}
