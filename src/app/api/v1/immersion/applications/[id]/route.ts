import { NextRequest, NextResponse } from "next/server";
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

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "SUPER_ADMIN") {
      return errorResponse("FORBIDDEN", "Access denied. Super Admin only.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id } = await params;

    const application = await prisma.immersionApplication.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            registrationNo: true,
            createdAt: true,
            studentRegistration: {
              include: {
                academics: { orderBy: { id: "asc" } },
              },
            },
            immersionApplications: {
              where: { immersionId: null },
              include: {
                academicDetails: { orderBy: { createdAt: "asc" } },
              },
            },
          },
        },
        immersion: {
          select: {
            id: true,
            title: true,
            location: true,
            startDate: true,
            endDate: true,
          },
        },
        assignedMentor: { select: { id: true, name: true, email: true } },
        academicDetails: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!application) {
      return errorResponse("NOT_FOUND", "Application not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        const profile = await prisma.immersionParticipantProfile.findUnique({
      where: { userId: application.userId },
    });

    return successResponse({ application, profile });
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
      return errorResponse("FORBIDDEN", "Access denied. Super Admin only.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id } = await params;

    const existing = await prisma.immersionApplication.findUnique({
      where: { id },
    });
    if (!existing) {
      return errorResponse("NOT_FOUND", "Application not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    await prisma.immersionApplication.delete({
      where: { id },
    });

    return successResponse(null, {
      message: "Application deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
