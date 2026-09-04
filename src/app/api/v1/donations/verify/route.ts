import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { join } from "path";
import PDFDocument from "pdfkit";
import { ZodError } from "zod";
import nodemailer from "nodemailer";
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

    function getDonationReceiptEmailTemplate(
      name: string,
      amount: number,
    ): string {
      return getBaseTemplate(
        "Thank You for Your Donation",
        `
      <h2 class="title">Thank You for Your Support! 🙏</h2>
      <p>Dear ${name},</p>
      <p>We are deeply grateful for your generous donation to IIINTERNSHIP TRUST. Your contribution supports our community initiatives.</p>
      <div class="card">
        <strong>Donation Summary:</strong><br>
        • Amount: INR ${amount.toFixed(2)}<br>
        • Donor Name: ${name}<br>
        • Status: COMPLETED
      </div>
      <p>Please find your official <strong>80G Tax Exemption Receipt</strong> attached to this email.</p>
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

    async function sendDonationReceiptEmail(
      email: string,
      name: string,
      amount: number,
      receiptBuffer: Buffer,
    ): Promise<boolean> {
      let attachmentPayload: { content: string; name: string }[] | undefined;

      try {
        const base64Content = receiptBuffer.toString("base64");
        attachmentPayload = [
          {
            content: base64Content,
            name: `80G_Donation_Receipt_${name.replace(/\s+/g, "_")}.pdf`,
          },
        ];
      } catch (err) {
        console.error("[Email Service] Failed to attach donation receipt:", err);
      }

      const htmlContent = getDonationReceiptEmailTemplate(name, amount);
      return sendEmail({
        to: [{ email, name }],
        subject: `Thank You for Your Donation — IIInternship Trust`,
        htmlContent,
        attachment: attachmentPayload,
      });
    }

    function numberToWords(num: number): string {
      const a = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ];
      const b = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];

      function helper(n: number): string {
        if (n < 20) return a[n];
        if (n < 100)
          return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
        if (n < 1000)
          return (
            a[Math.floor(n / 100)] +
            " Hundred" +
            (n % 100 !== 0 ? " and " + helper(n % 100) : "")
          );
        if (n < 100000)
          return (
            helper(Math.floor(n / 1000)) +
            " Thousand" +
            (n % 1000 !== 0 ? " " + helper(n % 1000) : "")
          );
        if (n < 10000000)
          return (
            helper(Math.floor(n / 100000)) +
            " Lakh" +
            (n % 100000 !== 0 ? " " + helper(n % 100000) : "")
          );
        return (
          helper(Math.floor(n / 10000000)) +
          " Crore" +
          (n % 10000000 !== 0 ? " " + helper(n % 10000000) : "")
        );
      }

      const integerPart = Math.floor(num);
      const words = helper(integerPart);
      return words ? words + " Rupees Only" : "Zero Rupees Only";
    }

    async function generateDonationReceiptPDF(donation: {
      id: string;
      amount: number;
      donorName: string;
      email: string;
      mobile: string;
      address: string;
      notes?: string | null;
      wants80G: boolean;
      panNumber?: string | null;
      razorpayPaymentId?: string | null;
      createdAt: Date;
    }): Promise<Buffer> {
      return new Promise((resolve, reject) => {
        try {
          const doc = new PDFDocument({ margin: 50 });
          const chunks: Buffer[] = [];
          doc.on("data", (chunk) => chunks.push(chunk));
          doc.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
          doc.on("error", reject);

                doc
            .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
            .stroke("#2ECC71");
          doc
            .rect(23, 23, doc.page.width - 46, doc.page.height - 46)
            .stroke("#16A085");

                doc
            .fillColor("#2C3E50")
            .fontSize(22)
            .font("Helvetica-Bold")
            .text("IIINTERNSHIP TRUST", { align: "center" });

          doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#7F8C8D")
            .text(
              "Regd. Office: Hilux Tech Park, Cyber City, Gurugram, Haryana - 122002",
              { align: "center" },
            )
            .text("Email: support@iiinternship.org | Web: www.iiinternship.org", {
              align: "center",
            });

          doc.moveDown(1.5);

                doc
            .fillColor("#16A085")
            .rect(50, doc.y, doc.page.width - 100, 25)
            .fill();

          doc
            .fillColor("#FFFFFF")
            .fontSize(12)
            .font("Helvetica-Bold")
            .text("DONATION RECEIPT (UNDER SECTION 80G)", 50, doc.y - 18, {
              align: "center",
            });

          doc.moveDown(1.5);

                doc.fillColor("#2C3E50");

                const gridStartY = doc.y;

                doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .text("Organization PAN:", 60, gridStartY)
            .font("Helvetica")
            .text("AAATI1234F", 180, gridStartY);

          doc
            .font("Helvetica-Bold")
            .text("80G Registration No:", 60, gridStartY + 15)
            .font("Helvetica")
            .text("80G/TRUST/REG/2026/0045", 180, gridStartY + 15);

                doc
            .font("Helvetica-Bold")
            .text("Receipt Serial No:", 320, gridStartY)
            .font("Helvetica")
            .text(`REC-${donation.id.slice(-8).toUpperCase()}`, 430, gridStartY);

          doc
            .font("Helvetica-Bold")
            .text("Date of Receipt:", 320, gridStartY + 15)
            .font("Helvetica")
            .text(
              new Date(donation.createdAt).toLocaleDateString("en-IN"),
              430,
              gridStartY + 15,
            );

          doc.moveDown(3);

                doc
            .moveTo(50, doc.y)
            .lineTo(doc.page.width - 50, doc.y)
            .stroke("#BDC3C7");
          doc.moveDown(1);

                const donorStartY = doc.y;
          doc
            .fontSize(12)
            .fillColor("#16A085")
            .font("Helvetica-Bold")
            .text("Donor Details", 50, donorStartY);
          doc.moveDown(0.5);

          doc.fontSize(10).fillColor("#2C3E50").font("Helvetica");

          doc
            .font("Helvetica-Bold")
            .text("Donor Name:", 50, doc.y)
            .font("Helvetica")
            .text(donation.donorName, 150, doc.y - 10);

          doc
            .font("Helvetica-Bold")
            .text("Mobile Number:", 50, doc.y + 5)
            .font("Helvetica")
            .text(donation.mobile, 150, doc.y - 5);

          doc
            .font("Helvetica-Bold")
            .text("Email Address:", 50, doc.y + 10)
            .font("Helvetica")
            .text(donation.email, 150, doc.y);

          doc
            .font("Helvetica-Bold")
            .text("PAN Card Number:", 50, doc.y + 15)
            .font("Helvetica")
            .text(donation.panNumber || "N/A", 150, doc.y + 5);

          doc
            .font("Helvetica-Bold")
            .text("Donor Address:", 50, doc.y + 20)
            .font("Helvetica")
            .text(donation.address, 150, doc.y + 10);

          doc.moveDown(6);

                const paymentStartY = doc.y;
          doc
            .fontSize(12)
            .fillColor("#16A085")
            .font("Helvetica-Bold")
            .text("Payment Summary", 50, paymentStartY);
          doc.moveDown(0.5);

          doc.fontSize(10).fillColor("#2C3E50").font("Helvetica");

          doc
            .font("Helvetica-Bold")
            .text("Amount Received:", 50, doc.y)
            .font("Helvetica")
            .text(`INR ${donation.amount.toFixed(2)}`, 160, doc.y - 10);

          doc
            .font("Helvetica-Bold")
            .text("Amount in Words:", 50, doc.y + 5)
            .font("Helvetica")
            .text(numberToWords(donation.amount), 160, doc.y - 5);

          doc
            .font("Helvetica-Bold")
            .text("Transaction ID:", 50, doc.y + 10)
            .font("Helvetica")
            .text(donation.razorpayPaymentId || "N/A", 160, doc.y);

          doc
            .font("Helvetica-Bold")
            .text("Status:", 50, doc.y + 15)
            .font("Helvetica")
            .text("COMPLETED (SUCCESS)", 160, doc.y + 5);

          doc.moveDown(4);

                doc
            .fontSize(8)
            .fillColor("#7F8C8D")
            .font("Helvetica-Bold")
            .text("Notes:", 50, doc.y)
            .font("Helvetica")
            .text(
              "1. All donations to IIINTERNSHIP TRUST are eligible for tax exemption under Section 80G of the Income Tax Act, 1961.",
              55,
              doc.y + 2,
            )
            .text(
              "2. This is a computer-generated document and does not require a physical signature for digital verification.",
              55,
              doc.y + 12,
            );

          doc.moveDown(3);

                const sigY = doc.y;
          doc
            .fontSize(10)
            .fillColor("#2C3E50")
            .font("Helvetica-Bold")
            .text("For IIINTERNSHIP TRUST", doc.page.width - 200, sigY, {
              align: "right",
            });

                doc
            .fontSize(8)
            .font("Helvetica")
            .fillColor("#7F8C8D")
            .text("Authorized Signatory", doc.page.width - 200, sigY + 50, {
              align: "right",
            });

          doc.end();
        } catch (error) {
          reject(error);
        }
      });
    }

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

    const verifySignatureSchema = z.object({
      razorpayOrderId: z.string().min(1, "Order ID is required"),
      razorpayPaymentId: z.string().min(1, "Payment ID is required"),
      razorpaySignature: z.string().min(1, "Signature is required"),
    });

  try {
    const body: unknown = await request.json();
    const parsed = verifySignatureSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      parsed.data;

        const donation = await prisma.donation.findUnique({
      where: { razorpayOrderId },
    });

    if (!donation) {
      return errorResponse(
        "DONATION_NOT_FOUND",
        "Donation record not found for this order.",
        {
          status: HTTP_2.NOT_FOUND,
        },
      );
    }

    if (donation.status !== "PENDING") {
      return errorResponse(
        "INVALID_DONATION_STATUS",
        `Donation is already processed. Current status: ${donation.status}`,
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

    let isValid = false;

        if (isMockRazorpay || razorpayOrderId.startsWith("order_mock_")) {
      isValid = true;
      console.log(
        `[MOCK RAZORPAY] Signature verification bypassed for donation order: ${razorpayOrderId}`,
      );
    } else {
      const hmac = crypto.createHmac("sha256", config.razorpayKeySecret);
      hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const generatedSignature = hmac.digest("hex");

      isValid = generatedSignature === razorpaySignature;
    }

    if (!isValid) {
            await prisma.donation.update({
        where: { id: donation.id },
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

        const updatedDonation = await prisma.donation.update({
      where: { id: donation.id },
      data: {
        status: "COMPLETED",
        razorpayPaymentId,
        razorpaySignature,
      },
    });

        let receiptBuffer: Buffer | null = null;
    const downloadUrl = `/api/v1/donations/${updatedDonation.id}/download`;

    try {
      receiptBuffer = await generateDonationReceiptPDF(updatedDonation);

            await prisma.donation.update({
        where: { id: updatedDonation.id },
        data: { receiptPath: downloadUrl },
      });
    } catch (pdfErr) {
      console.error(
        "[PDF ERROR] Failed to generate donation receipt PDF:",
        pdfErr,
      );
    }

        if (receiptBuffer) {
      sendDonationReceiptEmail(
        updatedDonation.email,
        updatedDonation.donorName,
        updatedDonation.amount,
        receiptBuffer,
      ).catch((emailErr) => {
        console.error(
          "[EMAIL ERROR] Failed to send donation receipt email:",
          emailErr,
        );
      });
    }

    return successResponse(
      {
        donationId: updatedDonation.id,
        amount: updatedDonation.amount,
        donorName: updatedDonation.donorName,
        status: "COMPLETED",
        receiptUrl: downloadUrl,
      },
      {
        message:
          "Donation payment verified and receipt generated successfully.",
      },
    );
  } catch (error) {
    return handleError(error);
  }
}
