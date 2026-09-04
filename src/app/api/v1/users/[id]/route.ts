import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
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

const nameSchema = z
  .string()
  .min(1, "Name cannot be empty")
  .max(100, "Name must be at most 100 characters")
  .trim();

const updateUserSchema = z.object({
  name: nameSchema.optional(),
  role: z
    .enum([
      "STUDENT",
      "INSTRUCTOR",
      "IMMERSION_USER",
      "SUPER_ADMIN",
      "RECRUIT_USER",
    ])
    .optional(),
  isActive: z.boolean().optional(),
});

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

type UserRole =
  "STUDENT" | "INSTRUCTOR" | "IMMERSION_USER" | "SUPER_ADMIN" | "RECRUIT_USER";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");
    const { id: targetId } = await params;

        if (requesterId !== targetId && requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. You can only view your own profile.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: targetId, deletedAt: null },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return errorResponse("USER_NOT_FOUND", "User not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    return successResponse({ user });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");
    const { id: targetId } = await params;

        if (requesterId !== targetId && requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. You can only update your own profile.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const body: unknown = await request.json();
    const parsed = updateUserSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid update data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, role, isActive } = parsed.data;

        if (
      (role !== undefined || isActive !== undefined) &&
      requesterRole !== "SUPER_ADMIN"
    ) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Only administrators can update roles or status.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

        const existingUser = await prisma.user.findFirst({
      where: { id: targetId, deletedAt: null },
    });
    if (!existingUser) {
      return errorResponse("USER_NOT_FOUND", "User not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        const updatedUser = await prisma.user.update({
      where: { id: targetId },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(role !== undefined ? { role: role as UserRole } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return successResponse(
      { user: updatedUser },
      { message: "Profile updated successfully" },
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");
    const { id: targetId } = await params;

        if (requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required to delete users.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (requesterId === targetId) {
      return errorResponse(
        "FORBIDDEN",
        "You cannot delete your own user account.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

        const existingUser = await prisma.user.findFirst({
      where: { id: targetId, deletedAt: null },
    });
    if (!existingUser) {
      return errorResponse("USER_NOT_FOUND", "User not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        const requester = await prisma.user.findFirst({
      where: { id: requesterId, deletedAt: null },
    });

    if (!requester) {
      return errorResponse("UNAUTHORIZED", "Requester account not found.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

        if (existingUser.role === "SUPER_ADMIN") {
      if (requester.createdAt.getTime() >= existingUser.createdAt.getTime()) {
        return errorResponse(
          "FORBIDDEN",
          "Access denied. You can only delete Super Admin accounts created after yours.",
          {
            status: HTTP_2.FORBIDDEN,
          },
        );
      }
    }

        await prisma.user.update({
      where: { id: targetId },
      data: { deletedAt: new Date() },
    });

    return successResponse(null, {
      message: "User account has been deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
