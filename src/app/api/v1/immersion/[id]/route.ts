import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

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

const createImmersionSchema = z.object({
  title: z.string().min(3, "Title is required").trim(),
  description: z.string().min(10, "Description is required").trim(),
  startDate: z.coerce.date({ error: "Start date is required" }),
  endDate: z.coerce.date({ error: "End date is required" }),
  location: z.string().min(2, "Location is required").trim(),
  period: z.string().min(2, "Period is required").trim(),
  facilities: z.string().min(5, "Facilities list is required").trim(),
  benefits: z.string().min(5, "Benefits details are required").trim(),
  fees: z.number().nonnegative("Fees must be a positive number or zero"),
  categoryId: z.string().optional().nullable(),
  instructorId: z.string().optional().nullable(),
});

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const immersion = await prisma.immersion.findUnique({
      where: { id },
      include: {
        category: true,
        instructor: { select: { id: true, name: true, email: true } },
      },
    });

    if (!immersion) {
      return errorResponse("NOT_FOUND", "Immersion program not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    return successResponse(immersion);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Super Admin privileges required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = createImmersionSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Invalid immersion program inputs.",
        {
          status: HTTP_2.UNPROCESSABLE,
          details: parsed.error.flatten().fieldErrors,
        },
      );
    }

    const {
      title,
      description,
      startDate,
      endDate,
      location,
      period,
      facilities,
      benefits,
      fees,
      categoryId,
      instructorId,
    } = parsed.data;

        const existing = await prisma.immersion.findUnique({
      where: { id },
    });
    if (!existing) {
      return errorResponse("NOT_FOUND", "Immersion program not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        if (categoryId) {
      const categoryExists = await prisma.immersionCategory.findUnique({
        where: { id: categoryId },
      });
      if (!categoryExists) {
        return errorResponse("NOT_FOUND", "Specified category not found.", {
          status: HTTP_2.NOT_FOUND,
        });
      }
    }

        if (instructorId) {
      const instructorExists = await prisma.user.findFirst({
        where: { id: instructorId, role: "INSTRUCTOR" },
      });
      if (!instructorExists) {
        return errorResponse(
          "NOT_FOUND",
          "Specified instructor user not found.",
          { status: HTTP_2.NOT_FOUND },
        );
      }
    }

    const currentInstructorId = instructorId || null;
    const isInstructorChanged = currentInstructorId !== existing.instructorId;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(startDate);
    const end = new Date(endDate);

    let computedStatus: "UPCOMING" | "ACTIVE" | "COMPLETED" = "UPCOMING";
    if (end < today) {
      computedStatus = "COMPLETED";
    } else if (start <= today) {
      computedStatus = "ACTIVE";
    }

    const updated = await prisma.immersion.update({
      where: { id },
      data: {
        title,
        description,
        startDate,
        endDate,
        location,
        period,
        facilities,
        benefits,
        fees,
        status: computedStatus,
        categoryId: categoryId || null,
        instructorId: currentInstructorId,
        ...(isInstructorChanged
          ? {
              instructorApprovalStatus: "PENDING",
              instructorApprovedAt: null,
              instructorRemarks: null,
            }
          : {}),
      },
      include: {
        category: true,
        instructor: { select: { id: true, name: true, email: true } },
      },
    });

    if (isInstructorChanged) {
      await prisma.immersionApplication.updateMany({
        where: { immersionId: id },
        data: { assignedMentorId: null },
      });
    }

    return successResponse(updated, {
      message: "Immersion program updated successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Super Admin privileges required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const { id } = await params;

        const existing = await prisma.immersion.findUnique({
      where: { id },
    });
    if (!existing) {
      return errorResponse("NOT_FOUND", "Immersion program not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    await prisma.immersion.delete({
      where: { id },
    });

    return successResponse(null, {
      message: "Immersion program deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
