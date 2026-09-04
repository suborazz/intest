import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SignJWT } from "jose";
import { set } from "date-fns";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

export async function POST(request: NextRequest): Promise<NextResponse> {
    type UserRole_2 =
      "STUDENT" | "INSTRUCTOR" | "IMMERSION_USER" | "SUPER_ADMIN" | "RECRUIT_USER";

    interface AuthTokens_2 {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    }

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

    async function signRefreshToken(userId: string): Promise<string> {
      const secret = process.env["JWT_REFRESH_SECRET"];
      if (!secret) throw new Error("[Auth] JWT_REFRESH_SECRET is not set");

      return new SignJWT({ sub: userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setSubject(userId)
        .setExpirationTime(process.env["JWT_REFRESH_EXPIRES_IN"] ?? "30d")
        .sign(getSecret(secret));
    }

    async function generateTokens(
      userId: string,
      email: string,
      role: UserRole_2,
    ): Promise<AuthTokens_2> {
      const [accessToken, refreshToken] = await Promise.all([
        signAccessToken({ sub: userId, email, role }),
        signRefreshToken(userId),
      ]);

      return {
        accessToken,
        refreshToken,
            expiresIn: 7 * 24 * 60 * 60,
      };
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

    const passwordSchema = z
      .string({ error: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number");

    const recruitUserLoginSchema = z.object({
      identifier: z
        .string({ error: "Email or Registration Number is required" })
        .trim(),
      password: passwordSchema,
    });

  try {
    const body: unknown = await request.json();
    const parsed = recruitUserLoginSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { identifier, password } = parsed.data;

        const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: identifier, mode: "insensitive" } },
          { registrationNo: { equals: identifier, mode: "insensitive" } },
        ],
        deletedAt: null,
      },
    });

    const dummyHash =
      "$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234";
    const passwordHash = user?.passwordHash ?? dummyHash;
    const isValid = await bcrypt.compare(password, passwordHash);

    if (!user || !isValid) {
      return errorResponse("INVALID_CREDENTIALS", "Invalid credentials", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

        if (user.role !== "RECRUIT_USER") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Use the Main Portal to login.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    if (!user.isActive) {
      return errorResponse(
        "ACCOUNT_DEACTIVATED",
        "Your account has been deactivated. Contact support.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

        const tokens = await generateTokens(user.id, user.email, user.role);

    return successResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        registrationNo: user.registrationNo,
      },
      tokens,
    });
  } catch (error) {
    return handleError(error);
  }
}
