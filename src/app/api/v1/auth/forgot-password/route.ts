import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
import { config } from "@/x/a948e663";
import { sendPasswordResetEmail } from "@/x/b7e0f2d7";

export const dynamic = "force-dynamic";

const forgotPasswordSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request data",
            details: parsed.error.flatten().fieldErrors,
          },
        },
        { status: 422 },
      );
    }

    const { email } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        {
          success: true,
          data: {
            message: "If the email exists, a password reset link has been sent.",
          },
        },
        { status: 200 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpires: expires,
      },
    });

    const envAppUrl =
      process.env.NEXT_PUBLIC_CLIENT_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.CLIENT_URL;

    let resolvedBaseUrl = config.clientUrl;
    if (envAppUrl) {
      resolvedBaseUrl = envAppUrl;
    } else if (process.env.NODE_ENV === "production") {
      resolvedBaseUrl = "https://www.iiinternship.in";
    } else if (request.nextUrl.origin) {
      resolvedBaseUrl = request.nextUrl.origin;
    }

    await sendPasswordResetEmail(
      email,
      token,
      user.name ?? undefined,
      resolvedBaseUrl,
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "If the email exists, a password reset link has been sent.",
          ...(process.env.NODE_ENV === "development" ? { devToken: token } : {}),
        },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("[Forgot Password API Error]", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Request validation failed",
            details: error.flatten().fieldErrors,
          },
        },
        { status: 422 },
      );
    }

    const message =
      process.env.NODE_ENV === "production"
        ? "An internal server error occurred"
        : error instanceof Error
          ? error.message
          : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message,
        },
      },
      { status: 500 },
    );
  }
}
