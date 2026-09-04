import { execSync } from "child_process";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import os from "os";
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

export async function GET(request: NextRequest): Promise<NextResponse> {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465, 
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });

    async function verifyEmailConnection(): Promise<boolean> {
      try {
        if (!config.smtpUser || config.smtpUser === "mock-user") {
          return false;
        }
        await transporter.verify();
        return true;
      } catch {
        return false;
      }
    }

  const startTime = Date.now();
  let userRole = request.headers.get("X-User-Role");

    if (!userRole) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;
    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env["JWT_SECRET"] ?? "",
        );
        const { payload } = await jwtVerify(token, secret);
        userRole = String(payload["role"] ?? "");
      } catch (e) {
        console.error("Manual JWT verification in health check failed:", e);
      }
    }
  }

    let dbStatus: "ok" | "error" = "ok";
  let dbLatencyMs = 0;

  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - dbStart;
  } catch {
    dbStatus = "error";
  }

    let emailStatus: "ok" | "error" = "ok";
  try {
    const isEmailHealthy = await verifyEmailConnection();
    emailStatus = isEmailHealthy ? "ok" : "error";
  } catch {
    emailStatus = "error";
  }

  const totalLatencyMs = Date.now() - startTime;
  const isHealthy = dbStatus === "ok" && emailStatus === "ok";

    if (userRole !== "SUPER_ADMIN") {
    return NextResponse.json(
      {
        success: true,
        status: isHealthy ? "ok" : "degraded",
        timestamp: new Date().toISOString(),
        latencyMs: totalLatencyMs,
        services: {
          database: { status: dbStatus },
          email: { status: emailStatus },
        },
      },
      { status: isHealthy ? 200 : 503 },
    );
  }

    const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsagePercent =
    totalMem > 0 ? ((usedMem / totalMem) * 100).toFixed(2) : "0";

  const cpuLoad = os.loadavg(); 
  const cpus = os.cpus().length;

    const memoryUsage = process.memoryUsage();

    let diskSpace = null;
  try {
    const stdout = execSync("df -Ph .").toString().split("\n");
    if (stdout.length > 1) {
      const line = stdout[1].replace(/\s+/g, " ").split(" ");
      diskSpace = {
        size: line[1],
        used: line[2],
        available: line[3],
        usagePercent: line[4],
      };
    }
  } catch {}

  return NextResponse.json(
    {
      success: true,
      status: isHealthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env["npm_package_version"] ?? "0.1.0",
      environment: process.env["NODE_ENV"] ?? "development",
      latencyMs: totalLatencyMs,
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        cpuCount: cpus,
        cpuLoad1m: cpuLoad[0],
        cpuLoad5m: cpuLoad[1],
        cpuLoad15m: cpuLoad[2],
        memory: {
          totalBytes: totalMem,
          freeBytes: freeMem,
          usedBytes: usedMem,
          usagePercent: parseFloat(memUsagePercent),
        },
        disk: diskSpace,
      },
      process: {
        memory: {
          rss: memoryUsage.rss,
          heapTotal: memoryUsage.heapTotal,
          heapUsed: memoryUsage.heapUsed,
          external: memoryUsage.external,
        },
      },
      services: {
        database: {
          status: dbStatus,
          latencyMs: dbLatencyMs,
        },
        email: {
          status: emailStatus,
        },
      },
    },
    { status: isHealthy ? 200 : 503 },
  );
}
