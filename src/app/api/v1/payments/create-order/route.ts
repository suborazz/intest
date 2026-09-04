import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Razorpay from "razorpay";
import { create } from "zustand";
import { ZodError } from "zod";
import { axiosInstance } from "@/x/acfb3dca";
import { prisma } from "@/x/e3746f45";

interface AppConfig {
  nodeEnv: "development" | "production" | "test";
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  allowedOrigins: string[];
  bcryptRounds: number;
  databaseUrl: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpSenderEmail: string;
  smtpSenderName: string;
  clientUrl: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  razorpayWebhookSecret: string;
}

function getEnv(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

function getEnvNumber(key: string, fallback: number): number {
  const val = process.env[key];
  if (!val) return fallback;
  const parsed = parseInt(val, 10);
  if (isNaN(parsed)) {
    throw new Error(
      `[Config] Environment variable ${key} must be a number, got: "${val}"`,
    );
  }
  return parsed;
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `[Config] Missing required environment variable: ${key}\n` +
        `Copy .env.example to .env and fill in the values.`,
    );
  }
  return value;
}

const buildConfig = (): AppConfig => ({
  nodeEnv: getEnv("NODE_ENV", "development") as AppConfig["nodeEnv"],
  port: getEnvNumber("PORT", 3001),
  databaseUrl: requireEnv("DATABASE_URL"),
  jwtSecret: requireEnv("JWT_SECRET"),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "7d"),
  jwtRefreshSecret: requireEnv("JWT_REFRESH_SECRET"),
  jwtRefreshExpiresIn: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
  allowedOrigins: getEnv("ALLOWED_ORIGINS", "http://localhost:3000")
    .split(",")
    .map((s) => s.trim()),
  bcryptRounds: getEnvNumber("BCRYPT_ROUNDS", 12),
  smtpHost: getEnv("SMTP_HOST", "smtp.gmail.com"),
  smtpPort: getEnvNumber("SMTP_PORT", 587),
  smtpUser: requireEnv("SMTP_USER"),
  smtpPass: requireEnv("SMTP_PASS"),
  smtpSenderEmail: getEnv(
    "SMTP_SENDER_EMAIL",
    getEnv("SMTP_USER", "i3.office2025@gmail.com"),
  ),
  smtpSenderName: getEnv("SMTP_SENDER_NAME", "II Internship"),
  clientUrl: getEnv("NEXT_PUBLIC_CLIENT_URL", "http://localhost:3000"),
  razorpayKeyId: getEnv("RAZORPAY_KEY_ID", "mock-razorpay-key-id"),
  razorpayKeySecret: getEnv("RAZORPAY_KEY_SECRET", "mock-razorpay-key-secret"),
  razorpayWebhookSecret: getEnv(
    "RAZORPAY_WEBHOOK_SECRET",
    "mock-webhook-secret",
  ),
});

const AUTH_KEYS = {
  ACCESS_TOKEN: "authToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
};

const config: AppConfig = buildConfig();
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      console.warn("Axios Interceptor: Could not fetch auth token", e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
const { razorpayKeyId, razorpayKeySecret } = config;

const isMockRazorpay =
  razorpayKeyId === "mock-razorpay-key-id" ||
  razorpayKeySecret === "mock-razorpay-key-secret" ||
  razorpayKeyId.includes("mock") ||
  razorpayKeySecret.includes("mock");

let razorpayClient: Razorpay | null = null;
if (!isMockRazorpay) {
  razorpayClient = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });
}
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
    interface RazorpayOrderParams {
      amount: number; 
      currency: string;
      receipt?: string;
    }

    interface RazorpayOrderResult {
      id: string;
      amount: number;
      currency: string;
      receipt?: string;
      status: string;
    }

    async function createRazorpayOrder(
      params: RazorpayOrderParams,
    ): Promise<RazorpayOrderResult> {
      if (isMockRazorpay) {
        console.log("[MOCK RAZORPAY] Simulating Order Creation:", params);
        return {
          id: `order_mock_${Math.random().toString(36).substring(2, 15)}`,
          amount: params.amount,
          currency: params.currency,
          status: "created",
          ...(params.receipt ? { receipt: params.receipt } : {}),
        };
      }

      if (!razorpayClient) {
        throw new Error("Razorpay client not initialized");
      }

        const orderData: any = {
        amount: params.amount,
        currency: params.currency,
        ...(params.receipt ? { receipt: params.receipt } : {}),
      };

      const order = (await razorpayClient.orders.create(orderData)) as any;

      return {
        id: String(order.id),
        amount:
          typeof order.amount === "string"
            ? parseInt(order.amount, 10)
            : Number(order.amount),
        currency: String(order.currency),
        status: String(order.status),
        ...(order.receipt ? { receipt: String(order.receipt) } : {}),
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

    const createOrderSchema = z.object({
      internshipId: z.string().cuid("Invalid Internship ID"),
    });

  try {
    const userId = request.headers.get("X-User-Id");
    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const body: unknown = await request.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { internshipId } = parsed.data;

        const internship = await prisma.internship.findFirst({
      where: { id: internshipId, deletedAt: null },
    });

    if (!internship) {
      return errorResponse("INTERNSHIP_NOT_FOUND", "Internship not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    if (internship.type !== "PAID") {
      return errorResponse(
        "INVALID_INTERNSHIP_TYPE",
        "This internship is not a paid program and does not require payment.",
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

    const price = internship.price ?? 0;
    if (price <= 0) {
      return errorResponse(
        "INVALID_INTERNSHIP_PRICE",
        "Internship price is invalid.",
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

        const existingEnrollment = await prisma.enrollment.findFirst({
      where: { userId, internshipId },
    });

    if (existingEnrollment) {
      return errorResponse(
        "ALREADY_ENROLLED",
        "You are already enrolled in this internship.",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

        const amountInPaise = Math.round(price * 100);
    const order = await createRazorpayOrder({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${internshipId.substring(0, 10)}_${userId.substring(0, 10)}`,
    });

        const payment = await prisma.payment.create({
      data: {
        amount: price,
        currency: "INR",
        status: "PENDING",
        razorpayOrderId: order.id,
        userId,
        internshipId,
      },
    });

    return successResponse(
      {
        paymentId: payment.id,
        razorpayOrderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: config.razorpayKeyId,
        isMockMode: isMockRazorpay,
      },
      {
        message: "Razorpay order created successfully.",
        status: HTTP_2.CREATED,
      },
    );
  } catch (error) {
    return handleError(error);
  }
}
