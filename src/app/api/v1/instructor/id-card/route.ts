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
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (requesterRole !== "INSTRUCTOR" && requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Only instructors can access this ID Card.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: requesterId },
      include: {
        instructorRegistration: true,
        instructorIdCard: true,
      },
    });

    if (!user) {
      return errorResponse("USER_NOT_FOUND", "Instructor user not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    if (!user.instructorRegistration) {
      return errorResponse(
        "REGISTRATION_NOT_FOUND",
        "Instructor registration profile not found. Please register first.",
        { status: HTTP_2.NOT_FOUND },
      );
    }

    let idCard = user.instructorIdCard;

    if (!idCard) {
      const year = new Date().getFullYear();
      const prefix = `IID-${year}-`;

            const last = await prisma.instructorIdCard.findFirst({
        where: { cardNo: { startsWith: prefix } },
        orderBy: { cardNo: "desc" },
      });

      let nextSeq = "0001";
      if (last) {
        const lastSeq = parseInt(last.cardNo.replace(prefix, ""), 10);
        nextSeq = String(lastSeq + 1).padStart(4, "0");
      }
      const cardNo = `${prefix}${nextSeq}`;

      try {
        idCard = await prisma.instructorIdCard.create({
          data: {
            cardNo,
            userId: user.id,
          },
        });
      } catch (err) {
                idCard = await prisma.instructorIdCard.findUnique({
          where: { userId: user.id },
        });
        if (!idCard) throw err;
      }
    }

    const reg = user.instructorRegistration;
    const address = `${reg.currentAddressLocal}, ${reg.currentAddressDistrict}, ${reg.currentAddressState} - ${reg.currentAddressPinCode}`;

    const responsePayload = {
      cardNo: idCard.cardNo,
      issuedAt: idCard.issuedAt,
      instructorId: reg.instructorId,
      instructorName: reg.fullName,
      instructorMobile: reg.mobileNo,
      instructorEmail: user.email,
      instructorAddress: address,
      photoUrl: reg.photoUrl || "",
    };

    return successResponse(responsePayload);
  } catch (error) {
    return handleError(error);
  }
}
