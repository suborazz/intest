import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const internship = await prisma.internship.findUnique({
      where: { id },
      include: {
        _count: {
          select: { interests: true },
        },
      },
    });

    if (!internship) {
      return errorResponse("NOT_FOUND", "Internship not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    return successResponse(internship);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.internship.update({
      where: { id },
      data: {
        title: body.title,
        duration: body.duration,
        category: body.category as "ON_CAMPUS" | "VIRTUAL" | "RUNNING",
        description: body.description,
        department: body.department || null,
        projectFocus: body.project || body.projectFocus || null,
        modules: Array.isArray(body.modules)
          ? body.modules
          : typeof body.modules === "string"
            ? body.modules
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : undefined,
        tools: Array.isArray(body.tools)
          ? body.tools
          : typeof body.tools === "string"
            ? body.tools
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : undefined,
        location:
          body.category === "VIRTUAL" ? "Virtual / Online" : "On Campus",
        mode: body.category === "VIRTUAL" ? "ONLINE" : "OFFLINE",
      },
    });

    return successResponse(updated, {
      message: "Internship updated successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.internship.delete({
      where: { id },
    });

    return successResponse(null, {
      message: "Internship deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
