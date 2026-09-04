import { NextRequest, NextResponse } from "next/server";
import { create } from "zustand";
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
    async function generateIdCardNo(): Promise<string> {
      const year = new Date().getFullYear();
      const prefix = `ID-${year}-`;

      const last = await prisma.idCard.findFirst({
        where: { cardNo: { startsWith: prefix } },
        orderBy: { cardNo: "desc" },
      });

      if (!last) {
        return `${prefix}0001`;
      }

      const lastSeq = parseInt(last.cardNo.replace(prefix, ""), 10);
      const nextSeq = String(lastSeq + 1).padStart(4, "0");
      return `${prefix}${nextSeq}`;
    }

    async function issueIdCard(studentId: string, enrollmentId: string) {
        const existing = await prisma.idCard.findUnique({
        where: { enrollmentId },
      });

      if (existing) {
        return existing;
      }

      const cardNo = await generateIdCardNo();

      return await prisma.idCard.create({
        data: {
          cardNo,
          studentId,
          enrollmentId,
        },
      });
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
    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: internshipId } = await params;

        const internship = await prisma.internship.findFirst({
      where: { id: internshipId, deletedAt: null },
    });

    if (!internship) {
      return errorResponse("INTERNSHIP_NOT_FOUND", "Internship not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

            if (internship.type === "PAID") {
      return errorResponse(
        "PAID_INTERNSHIP_REQUIRED_PAYMENT",
        "This is a paid internship. Please use the payment flow to enroll: POST /api/v1/payments/create-order",
        { status: HTTP_2.BAD_REQUEST },
      );
    }

        const existingEnrollment = await prisma.enrollment.findFirst({
      where: { userId, internshipId },
    });

    if (existingEnrollment) {
      return errorResponse(
        "ALREADY_ENROLLED",
        "You are already enrolled in this internship.",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

        const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        internshipId,
      },
    });

        await issueIdCard(userId, enrollment.id);

    return successResponse(
      {
        enrollmentId: enrollment.id,
        internshipId: enrollment.internshipId,
        createdAt: enrollment.createdAt,
      },
      {
        message: "Successfully enrolled and ID Card issued.",
        status: HTTP_2.CREATED,
      },
    );
  } catch (error) {
    return handleError(error);
  }
}
