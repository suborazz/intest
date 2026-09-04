import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
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

    async function generateImmersionCertificateNo(): Promise<string> {
      const year = new Date().getFullYear();
      const prefix = `IMC-${year}-`;

      const last = await prisma.immersionCertificate.findFirst({
        where: { certificateNo: { startsWith: prefix } },
        orderBy: { certificateNo: "desc" },
      });

      if (!last) {
        return `${prefix}0001`;
      }

      const lastSeq = parseInt(last.certificateNo.replace(prefix, ""), 10);
      const nextSeq = String(lastSeq + 1).padStart(4, "0");
      return `${prefix}${nextSeq}`;
    }

  try {
    const requesterRole = request.headers.get("X-User-Role");
    const requesterId = request.headers.get("X-User-Id");

    if (!requesterId) {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id: applicationId } = await params;

    const application = await prisma.immersionApplication.findFirst({
      where: { id: applicationId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        immersion: {
          select: {
            id: true,
            title: true,
            location: true,
            period: true,
            credits: true,
          },
        },
        certificate: true,
      },
    });

    if (!application) {
      return errorResponse(
        "APPLICATION_NOT_FOUND",
        "Immersion application not found.",
        {
          status: HTTP_2.NOT_FOUND,
        },
      );
    }

        if (
      requesterRole !== "SUPER_ADMIN" &&
      application.assignedMentorId !== requesterId
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You are not authorized to issue a certificate for this application.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    if (application.certificate) {
      return errorResponse(
        "CERTIFICATE_ALREADY_ISSUED",
        "A certificate has already been issued for this application.",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

    const body = await request.json().catch(() => ({}));
    const grade =
      typeof body?.grade === "string" && body.grade.trim()
        ? body.grade.trim()
        : null;
        const credits =
      typeof body?.credits === "string" && body.credits.trim()
        ? body.credits.trim()
        : application.immersion?.credits || null;

    const certificateNo = await generateImmersionCertificateNo();

    const certificate = await prisma.immersionCertificate.create({
      data: {
        certificateNo,
        applicationId: application.id,
        issuedById: requesterId,
        grade: grade || undefined,
        credits: credits || undefined,
      },
      include: {
        application: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            immersion: { select: { id: true, title: true } },
          },
        },
        issuedBy: { select: { id: true, name: true } },
      },
    });

    return successResponse(certificate, {
      status: HTTP_2.CREATED,
      message: `Certificate ${certificateNo} issued successfully.`,
    });
  } catch (error) {
    return handleError(error);
  }
}
