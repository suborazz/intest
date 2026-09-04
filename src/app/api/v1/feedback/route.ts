import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    const createFeedbackSchema = z.object({
      enrollmentId: z.string().min(1, "Enrollment ID is required"),
      rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
      comments: z
        .string()
        .min(5, "Comments must be at least 5 characters long")
        .trim(),
    });

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || !userRole) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const body = await request.json();
    const result = createFeedbackSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("BAD_REQUEST", "Validation failed.", {
        status: HTTP_2.BAD_REQUEST,
        details: result.error.flatten().fieldErrors,
      });
    }

    const { enrollmentId, rating, comments } = result.data;

        const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        internship: {
          select: { instructorId: true },
        },
      },
    });

    if (!enrollment) {
      return errorResponse("NOT_FOUND", "Enrollment not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const senderId = userId;
    let receiverId = "";
    let feedbackType: "STUDENT_TO_INSTRUCTOR" | "INSTRUCTOR_TO_STUDENT";

    if (userRole === "STUDENT") {
      if (enrollment.userId !== userId) {
        return errorResponse(
          "FORBIDDEN",
          "You are not enrolled in this internship.",
          { status: HTTP_2.FORBIDDEN },
        );
      }
      if (!enrollment.internship.instructorId) {
        return errorResponse(
          "BAD_REQUEST",
          "No instructor is assigned to this internship yet.",
          { status: HTTP_2.BAD_REQUEST },
        );
      }
      receiverId = enrollment.internship.instructorId;
      feedbackType = "STUDENT_TO_INSTRUCTOR";
    } else if (userRole === "INSTRUCTOR") {
      if (enrollment.internship.instructorId !== userId) {
        return errorResponse(
          "FORBIDDEN",
          "You are not the assigned instructor for this enrollment.",
          { status: HTTP_2.FORBIDDEN },
        );
      }
      receiverId = enrollment.userId;
      feedbackType = "INSTRUCTOR_TO_STUDENT";
    } else {
      return errorResponse(
        "FORBIDDEN",
        "Only Students and Instructors can submit feedback.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

        const existingFeedback = await prisma.feedback.findFirst({
      where: {
        enrollmentId,
        type: feedbackType,
      },
    });

    if (existingFeedback) {
      return errorResponse(
        "CONFLICT",
        "Feedback has already been submitted for this enrollment.",
        { status: HTTP_2.CONFLICT },
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        enrollmentId,
        senderId,
        receiverId,
        type: feedbackType,
        rating,
        comments,
      },
    });

    return successResponse(feedback, {
      message: "Feedback submitted successfully.",
      status: HTTP_2.CREATED,
    });
  } catch (error) {
    return handleError(error);
  }
}
