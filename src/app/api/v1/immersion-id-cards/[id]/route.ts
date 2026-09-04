import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
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
    const { id } = await params;

    const idCard = await prisma.immersionIdCard.findFirst({
      where: {
        OR: [{ id }, { cardNo: id }],
      },
      include: {
        application: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                registrationNo: true,
                immersionParticipantProfile: {
                  select: {
                    fullName: true,
                    mobileNumber: true,
                    passportPhotoUrl: true,
                    permLocalArea: true,
                    permDistrict: true,
                    permState: true,
                    permCountry: true,
                    permPinCode: true,
                  },
                },
              },
            },
            immersion: {
              select: { id: true, title: true, location: true, period: true },
            },
          },
        },
      },
    });

    if (!idCard) {
      return errorResponse(
        "ID_CARD_NOT_FOUND",
        "ID Card not found or invalid card number.",
        { status: HTTP_2.NOT_FOUND },
      );
    }

    const profile = idCard.application.user.immersionParticipantProfile;
    const address = profile
      ? `${profile.permLocalArea}, ${profile.permDistrict}, ${profile.permState}, ${profile.permCountry} - ${profile.permPinCode}`
      : "N/A";

    const responsePayload = {
      cardNo: idCard.cardNo,
      issuedAt: idCard.issuedAt,
      studentId: idCard.application.user.registrationNo || idCard.studentId,
      studentName: profile?.fullName || idCard.application.user.name || "N/A",
      studentEmail: idCard.application.user.email,
      studentMobile: profile?.mobileNumber || "N/A",
      studentAddress: address,
      photoUrl: profile?.passportPhotoUrl || "",
      programId: idCard.application.immersion?.id || idCard.applicationId,
      programTitle: idCard.application.immersion?.title || "Immersion Program",
      programLocation: idCard.application.immersion?.location || "Remote",
      status: "VERIFIED",
    };

    return successResponse(responsePayload);
  } catch (error) {
    return handleError(error);
  }
}
