import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { set } from "date-fns";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

export async function POST(request: NextRequest): Promise<NextResponse> {
    type UserRole_2 =
      "STUDENT" | "INSTRUCTOR" | "IMMERSION_USER" | "SUPER_ADMIN" | "RECRUIT_USER";

    interface JwtPayload {
      sub: string; 
      email: string;
      role: UserRole_2;
      iat?: number;
      exp?: number;
    }

    const getSecret = (secret: string): Uint8Array =>
      new TextEncoder().encode(secret);

    async function signAccessToken(
      payload: Omit<JwtPayload, "iat" | "exp">,
    ): Promise<string> {
      const secret = process.env["JWT_SECRET"];
      if (!secret) throw new Error("[Auth] JWT_SECRET is not set");

      return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setSubject(payload.sub)
        .setExpirationTime(process.env["JWT_EXPIRES_IN"] ?? "7d")
        .sign(getSecret(secret));
    }

    async function verifyRefreshToken(token: string): Promise<JWTPayload> {
      const secret = process.env["JWT_REFRESH_SECRET"];
      if (!secret) throw new Error("[Auth] JWT_REFRESH_SECRET is not set");

      const { payload } = await jwtVerify(token, getSecret(secret));
      return payload;
    }

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

    const refreshTokenSchema = z.object({
      refreshToken: z.string({ error: "Refresh token is required" }).min(1),
    });

  try {
    const body: unknown = await request.json();
    const parsed = refreshTokenSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Refresh token is required", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { refreshToken } = parsed.data;

    let userId: string;
    try {
      const payload = await verifyRefreshToken(refreshToken);
      userId = String(payload.sub ?? "");
    } catch {
      return errorResponse(
        "INVALID_TOKEN",
        "Refresh token is invalid or expired",
        {
          status: HTTP_2.UNAUTHORIZED,
        },
      );
    }

        const user = await prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
      select: { id: true, email: true, role: true, isActive: true },
    });

    if (!user) {
      return errorResponse("USER_NOT_FOUND", "User no longer exists", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (!user.isActive) {
      return errorResponse(
        "ACCOUNT_DEACTIVATED",
        "Your account has been deactivated.",
        {
          status: HTTP_2.UNAUTHORIZED,
        },
      );
    }

        const accessToken = await signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return successResponse(
      {
        accessToken,
        expiresIn: 7 * 24 * 60 * 60,
      },
      { message: "Token refreshed successfully" },
    );
  } catch (error) {
    return handleError(error);
  }
}
