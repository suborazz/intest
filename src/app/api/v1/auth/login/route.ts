import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { SignJWT } from "jose";
import { set } from "date-fns";
import { prisma } from "@/x/e3746f45";

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

const emailSchema = z
  .string({ error: "Email is required" })
  .email("Invalid email address")
  .toLowerCase()
  .trim();

const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
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

export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.redirect(new URL("/login", request.url));
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch (_e: unknown) {
      body = {};
    }
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parsed.data;

        const user = await prisma.user.findFirst({
      where: { email, deletedAt: null },
    });

        const dummyHash =
      "$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ01234";
    const passwordHash = user?.passwordHash ?? dummyHash;
    const isValid = await bcrypt.compare(password, passwordHash);

    if (!user || !isValid) {
      return errorResponse("INVALID_CREDENTIALS", "Invalid email or password", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (!user.isActive) {
      return errorResponse(
        "ACCOUNT_DEACTIVATED",
        "Your account has been deactivated. Please contact support.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

        const tokens = await generateTokens(user.id, user.email, user.role);

    return successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          mobile: user.mobile,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        tokens,
      },
      { message: "Login successful" },
    );
  } catch (error) {
    return handleError(error);
  }
}
