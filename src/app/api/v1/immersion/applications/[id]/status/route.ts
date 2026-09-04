import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(
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

    const updateImmersionAppStatusSchema = z.object({
      status: z.enum(["UNDER_REVIEW", "APPROVED", "REJECTED"]),
      remarks: z.string().optional(),
    });

    async function generateImmersionIdCardNo(): Promise<string> {
      const year = new Date().getFullYear();
      const prefix = `IMID-${year}-`;

      const last = await prisma.immersionIdCard.findFirst({
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

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "SUPER_ADMIN") {
      return errorResponse("FORBIDDEN", "Access denied. Super Admin only.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id } = await params;
    const body: unknown = await request.json();
    const parsed = updateImmersionAppStatusSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid status update data.", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { status, remarks } = parsed.data;

    const existing = await prisma.immersionApplication.findUnique({
      where: { id },
      include: { idCard: true },
    });
    if (!existing) {
      return errorResponse("NOT_FOUND", "Application not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const isNewlyApproved =
      status === "APPROVED" && existing.status !== "APPROVED";

    const updated = await prisma.$transaction(async (tx) => {
      const app = await tx.immersionApplication.update({
        where: { id },
        data: {
          status,
          remarks: remarks ?? null,
          approvedAt: status === "APPROVED" ? new Date() : existing.approvedAt,
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
          assignedMentor: { select: { id: true, name: true, email: true } },
          idCard: true,
        },
      });

            if (existing.immersionId) {
        let regStatus: "PENDING" | "APPROVED" | "REJECTED" = "PENDING";
        if (status === "APPROVED") regStatus = "APPROVED";
        else if (status === "REJECTED") regStatus = "REJECTED";

        await tx.immersionRegistration.upsert({
          where: {
            studentId_immersionId: {
              studentId: existing.userId,
              immersionId: existing.immersionId,
            },
          },
          create: {
            studentId: existing.userId,
            immersionId: existing.immersionId,
            status: regStatus,
          },
          update: {
            status: regStatus,
          },
        });
      }

      return app;
    });

                    if (isNewlyApproved && !existing.idCard) {
      const cardNo = await generateImmersionIdCardNo();
      await prisma.immersionIdCard.create({
        data: {
          cardNo,
          studentId: existing.userId,
          applicationId: existing.id,
        },
      });
    }

    return successResponse(updated, {
      message: `Application ${status.toLowerCase().replace("_", " ")} successfully.`,
    });
  } catch (error) {
    return handleError(error);
  }
}
