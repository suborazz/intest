import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { SignJWT } from "jose";
import { join } from "path";
import { set } from "date-fns";
import nodemailer from "nodemailer";
import { prisma } from "@/x/e3746f45";
import { axiosInstance } from "@/x/acfb3dca";

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

    function formatRoleName(role: string): string {
      switch (role) {
        case "STUDENT":
          return "Student / Trainee";
        case "INSTRUCTOR":
          return "Instructor / Mentor";
        case "IMMERSION_USER":
          return "Immersion Participant";
        case "SUPER_ADMIN":
          return "Super Admin";
        default:
          return role;
      }
    }

    const emailStyleHeader = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Outfit', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc; }
    .wrapper { max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05); }
    .header { text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 24px; font-weight: 800; color: #3b82f6; text-decoration: none; letter-spacing: -0.5px; }
    .logo span { color: #10b981; }
    .title { color: #0f172a; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 15px; }
    .button { display: inline-block; padding: 12px 28px; background-color: #3b82f6; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 25px 0; text-align: center; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2); }
    .footer { font-size: 12px; color: #64748b; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; line-height: 1.8; text-align: center; }
    .highlight { color: #3b82f6; font-weight: 600; }
    .credentials { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .credential-item { margin: 8px 0; font-size: 14px; }
    .label { font-weight: bold; color: #475569; display: inline-block; width: 140px; }
    .value { font-family: monospace; font-size: 15px; color: #0f172a; font-weight: bold; }
    .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; border-radius: 8px; overflow: hidden; }
    .details-table th, .details-table td { text-align: left; padding: 12px 16px; border-bottom: 1px solid #e2e8f0; }
    .details-table th { background-color: #f8fafc; color: #475569; font-weight: 600; font-size: 13px; text-transform: uppercase; tracking-wider: 0.05em; }
    .badge { display: inline-block; padding: 4px 10px; background-color: #10b981; color: #ffffff; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
    .badge.failed { background-color: #ef4444; }
    .badge.pending { background-color: #f59e0b; }
    .card { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0; }
  </style>
`;

    function getBaseTemplate(title: string, content: string): string {
      return `
    <!DOCTYPE html>
    <html>
    <head>
      ${emailStyleHeader}
      <title>${title}</title>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <a href="${config.clientUrl}" class="logo">II<span>Internship</span></a>
        </div>
        ${content}
        <div class="footer">
          <p>This email was sent automatically. Please do not reply.<br>&copy; ${new Date().getFullYear()} IIInternship Team. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
    }

    function getWelcomeEmailTemplate(name: string, role: string): string {
      const roleDisplay = formatRoleName(role);
      return getBaseTemplate(
        "Welcome to IIInternship",
        `
      <h2 class="title">Welcome to IIInternship, ${name}! 🎉</h2>
      <p>Thank you for registering on our platform. Your account has been created successfully with the role of <span class="highlight">${roleDisplay}</span>.</p>
      <p>You can now log in and access your portal to explore internships, courses, and opportunities tailored just for you.</p>
      <div style="text-align: center;">
        <a href="${config.clientUrl}/login" class="button">Access Your Portal</a>
      </div>
    `,
      );
    }

    interface SendEmailPayload {
      to: { email: string; name?: string }[];
      subject: string;
      htmlContent: string;
      attachment?: { content: string; name: string }[] | undefined;
    }

    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465, 
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });

    async function sendEmail(payload: SendEmailPayload): Promise<boolean> {
      const { nodeEnv, smtpSenderEmail, smtpSenderName } = config;

        if (
        !config.smtpUser ||
        config.smtpUser === "mock-user" ||
        nodeEnv === "test"
      ) {
        console.log("\n======================================================");
        console.log(
          "[MOCK EMAIL] Simulating email dispatch (SMTP not configured or Test Env):",
        );
        console.log(
          `[MOCK EMAIL] Sender: "${smtpSenderName}" <${smtpSenderEmail}>`,
        );
        console.log(
          `[MOCK EMAIL] Recipient: ${payload.to.map((t) => t.email).join(", ")}`,
        );
        console.log(`[MOCK EMAIL] Subject: ${payload.subject}`);
        if (payload.attachment) {
          console.log(
            `[MOCK EMAIL] Attachments: ${payload.attachment.map((a) => a.name).join(", ")}`,
          );
        }
        console.log("------------------------------------------------------");
        console.log(payload.htmlContent);
        console.log("======================================================\n");
        return true;
      }

      try {
        const mailOptions = {
          from: `"${smtpSenderName}" <${smtpSenderEmail}>`,
          to: payload.to
            .map((t) => (t.name ? `"${t.name}" <${t.email}>` : t.email))
            .join(", "),
          subject: payload.subject,
          html: payload.htmlContent,
          attachments: payload.attachment
            ? payload.attachment.map((att) => ({
                filename: att.name,
                content: Buffer.from(att.content, "base64"),
              }))
            : [],
        };

        await transporter.sendMail(mailOptions);
        return true;
      } catch (error) {
        console.error(
          "[Email Service] Failed to send email via SMTP/Nodemailer:",
          error,
        );
        return false;
      }
    }

    async function sendWelcomeEmail(
      email: string,
      name: string,
      role: string,
    ): Promise<boolean> {
      const htmlContent = getWelcomeEmailTemplate(name, role);
      return sendEmail({
        to: [{ email, name }],
        subject: "Welcome to IIInternship! 🎉",
        htmlContent,
      });
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

    const passwordSchema = z
      .string({ error: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number");

    const nameSchema = z
      .string()
      .min(1, "Name cannot be empty")
      .max(100, "Name must be at most 100 characters")
      .trim();

    const mobileSchema = z
      .string({ error: "Mobile number is required" })
      .trim()
      .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits");

    const registerSchema = z.object({
      email: emailSchema,
      mobile: mobileSchema,
      password: passwordSchema,
      name: nameSchema.optional(),
      role: z
        .enum([
          "STUDENT",
          "INSTRUCTOR",
          "IMMERSION_USER",
          "SUPER_ADMIN",
          "RECRUIT_USER",
        ])
        .default("STUDENT"),
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

  try {
    const body: unknown = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, mobile, password, name, role } = parsed.data;

        const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return errorResponse(
        "EMAIL_TAKEN",
        "An account with this email already exists",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

        const rounds = parseInt(process.env["BCRYPT_ROUNDS"] ?? "12", 10);
    const passwordHash = await bcrypt.hash(password, rounds);

        let user;
    if (role === "RECRUIT_USER") {
      const currentYear = new Date().getFullYear();
      user = await prisma.$transaction(async (tx) => {
        const count = await tx.user.count({
          where: {
            role: "RECRUIT_USER",
            registrationNo: { startsWith: `REG-${currentYear}-` },
          },
        });

        const nextSeq = count + 1;
        const formattedSeq = String(nextSeq).padStart(4, "0");
        const registrationNo = `REG-${currentYear}-${formattedSeq}`;

        return tx.user.create({
          data: {
            email,
            mobile,
            passwordHash,
            name: name ?? null,
            role,
            registrationNo,
          },
          select: {
            id: true,
            email: true,
            mobile: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      });
    } else {
      user = await prisma.user.create({
        data: { email, mobile, passwordHash, name: name ?? null, role },
        select: {
          id: true,
          email: true,
          mobile: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

        const tokens = await generateTokens(user.id, user.email, user.role);

        sendWelcomeEmail(user.email, user.name || "User", user.role).catch(
      (err) => {
        console.error(
          "[Welcome Email] Failed to send welcome email asynchronously:",
          err,
        );
      },
    );

    return successResponse(
      { user, tokens },
      { message: "Account created successfully", status: HTTP_2.CREATED },
    );
  } catch (error) {
    return handleError(error);
  }
}
