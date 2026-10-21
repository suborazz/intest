import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
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
    const requesterRole = _request.headers.get("X-User-Role");

    if (requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const existingReview = await prisma.review.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingReview) {
      return errorResponse("REVIEW_NOT_FOUND", "Review not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    await prisma.review.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return successResponse(null, {
      message: "Review deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  const HTTP = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE: 422,
    INTERNAL_SERVER_ERROR: 500,
  } as const;

  function errorResponse(
    code: string,
    message: string,
    options?: { status?: number; details?: unknown },
  ): NextResponse {
    return NextResponse.json(
      {
        success: false,
        error: { code, message, ...(options?.details !== undefined && { details: options.details }) },
      },
      { status: options?.status ?? HTTP.INTERNAL_SERVER_ERROR },
    );
  }

  function successResponse<T>(data: T, options?: { message?: string; status?: number }): NextResponse {
    return NextResponse.json(
      { success: true, data, ...(options?.message && { message: options.message }) },
      { status: options?.status ?? HTTP.OK },
    );
  }

  const updateReviewSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(120).optional(),
    email: z.string().trim().email("Invalid email address").optional(),
    role: z.string().trim().max(100).nullable().optional(),
    rating: z.coerce
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .optional(),
    comment: z
      .string()
      .trim()
      .min(10, "Comment must be at least 10 characters")
      .max(1000)
      .optional(),
    isApproved: z.boolean().optional(),
  });

  try {
    const requesterRole = request.headers.get("X-User-Role");
    if (requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required.",
        { status: HTTP.FORBIDDEN },
      );
    }

    const { id } = await params;

    const existingReview = await prisma.review.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingReview) {
      return errorResponse("REVIEW_NOT_FOUND", "Review not found", {
        status: HTTP.NOT_FOUND,
      });
    }

    const body = await request.json().catch(() => ({}));
    const parsed = updateReviewSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Request validation failed", {
        status: HTTP.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;
    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.rating !== undefined) updateData.rating = data.rating;
    if (data.comment !== undefined) updateData.comment = data.comment;

    if (data.isApproved !== undefined) {
      updateData.isApproved = data.isApproved;
      if (data.isApproved) {
        updateData.approvedAt = existingReview.approvedAt ?? new Date();
      } else {
        updateData.approvedAt = null;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return errorResponse("VALIDATION_ERROR", "No valid fields provided to update", {
        status: HTTP.BAD_REQUEST,
      });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: updateData,
    });

    return successResponse(updatedReview, {
      message: "Testimonial updated successfully.",
    });
  } catch (error) {
    console.error("[API Error]", error);
    if (error instanceof ZodError) {
      return errorResponse("VALIDATION_ERROR", "Request validation failed", {
        status: HTTP.UNPROCESSABLE,
        details: error.flatten().fieldErrors,
      });
    }
    return errorResponse(
      "INTERNAL_SERVER_ERROR",
      process.env["NODE_ENV"] === "production"
        ? "An internal server error occurred"
        : error instanceof Error
          ? error.message
          : "An unexpected error occurred",
      { status: HTTP.INTERNAL_SERVER_ERROR },
    );
  }
}
