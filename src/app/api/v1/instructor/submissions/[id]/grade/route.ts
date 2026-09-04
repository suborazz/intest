import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
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

    const gradeSubmissionSchema = z.object({
      grade: z.string().optional().or(z.literal("")),
      feedback: z.string().optional().or(z.literal("")),
    });

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || !userRole) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }
    if (userRole !== "INSTRUCTOR" && userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Instructor privileges required.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const { id } = await params;
    const body = await request.json();

    const result = gradeSubmissionSchema.safeParse(body);
    if (!result.success) {
      return errorResponse("BAD_REQUEST", "Validation failed.", {
        status: HTTP_2.BAD_REQUEST,
        details: result.error.flatten().fieldErrors,
      });
    }

    const { grade, feedback } = result.data;

        const submission = await prisma.projectSubmission.findUnique({
      where: { id },
      include: {
        enrollment: {
          include: {
            internship: { select: { instructorId: true } },
          },
        },
      },
    });

    if (!submission) {
      return errorResponse("NOT_FOUND", "Project submission not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        if (
      userRole === "INSTRUCTOR" &&
      submission.enrollment.internship.instructorId !== userId
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You are not the assigned instructor for this student submission.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const isClearing = !grade && !feedback;

    const updated = await prisma.projectSubmission.update({
      where: { id },
      data: {
        grade: grade || null,
        feedback: feedback || null,
        status: isClearing ? "PENDING" : "GRADED",
        gradedById: isClearing ? null : userId,
        gradedAt: isClearing ? null : new Date(),
      },
    });

    return successResponse(updated, {
      message: "Submission graded successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
