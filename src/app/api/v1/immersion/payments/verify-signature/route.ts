import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";
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
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const { razorpayKeyId, razorpayKeySecret } = config;

    const isMockRazorpay =
      razorpayKeyId === "mock-razorpay-key-id" ||
      razorpayKeySecret === "mock-razorpay-key-secret" ||
      razorpayKeyId.includes("mock") ||
      razorpayKeySecret.includes("mock");

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

    const verifyEmersionSignatureSchema = z.object({
      razorpayOrderId: z.string().min(1, "Order ID is required"),
      razorpayPaymentId: z.string().min(1, "Payment ID is required"),
      razorpaySignature: z.string().min(1, "Signature is required"),
    });

  try {
    const userId = request.headers.get("X-User-Id");
    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const body: unknown = await request.json();
    const parsed = verifyEmersionSignatureSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      parsed.data;

        const payment = await prisma.immersionPayment.findUnique({
      where: { razorpayOrderId },
      include: {
        application: { include: { immersion: true } },
      },
    });

    if (!payment) {
      return errorResponse(
        "PAYMENT_NOT_FOUND",
        "Payment record not found for this order.",
        {
          status: HTTP_2.NOT_FOUND,
        },
      );
    }

    if (payment.status !== "PENDING") {
      return errorResponse(
        "INVALID_PAYMENT_STATUS",
        `Payment is already processed. Current status: ${payment.status}`,
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

    let isValid = false;

        if (isMockRazorpay || razorpayOrderId.startsWith("order_mock_")) {
            isValid = true;
      console.log(
        `[MOCK RAZORPAY] Signature verification bypassed for: ${razorpayOrderId}`,
      );
    } else if (razorpaySignature) {
      const hmac = crypto.createHmac("sha256", config.razorpayKeySecret);
      hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const generatedSignature = hmac.digest("hex");

      isValid = generatedSignature === razorpaySignature;
    }

        if (!isValid && !isMockRazorpay) {
      try {
        const rzp = new Razorpay({
          key_id: config.razorpayKeyId,
          key_secret: config.razorpayKeySecret,
        });
        const rzpPayment = await rzp.payments.fetch(razorpayPaymentId);
        if (
          rzpPayment &&
          rzpPayment.order_id === razorpayOrderId &&
          (rzpPayment.status === "captured" || rzpPayment.status === "authorized")
        ) {
          isValid = true;
          console.log(
            `[RAZORPAY API] Immersion payment verified via direct API lookup for order ${razorpayOrderId}, payment ${razorpayPaymentId}`
          );
        }
      } catch (err) {
        console.error(
          `[RAZORPAY API ERROR] Failed to fetch payment status from Razorpay for immersion:`,
          err
        );
      }
    }

    if (!isValid) {
            await prisma.immersionPayment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });

      return errorResponse(
        "SIGNATURE_VERIFICATION_FAILED",
        "Invalid signature. Payment could not be verified.",
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

        const updatedPayment = await prisma.$transaction(async (tx) => {
      await tx.immersionApplication.update({
        where: { id: payment.applicationId },
        data: {
          status: "SUBMITTED",
          submittedAt: new Date(),
        },
      });

      return tx.immersionPayment.update({
        where: { id: payment.id },
        data: {
          status: "COMPLETED",
          razorpayPaymentId,
          razorpaySignature: razorpaySignature ?? null,
        },
      });
    });

    return successResponse(
      {
        paymentId: updatedPayment.id,
        applicationId: payment.applicationId,
        status: "COMPLETED",
      },
      {
        message: "Payment verified successfully.",
      },
    );
  } catch (error) {
    return handleError(error);
  }
}
