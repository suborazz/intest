import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
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

function generateApplicationCode(
  id: string,
  createdAt?: string | Date | null,
): string {
    const date = createdAt ? new Date(createdAt) : new Date();
  const year = String(date.getFullYear()).slice(-2);

    let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0; 
  }

    const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const c1 = ALPHA[hash % 26]!;
  const h2 = Math.floor(hash / 26);
  const c2 = ALPHA[h2 % 26]!;
  const h3 = Math.floor(h2 / 26);
  const c3 = ALPHA[h3 % 26]!;

    const h4 = Math.floor(h3 / 26);
  const numeric = String(10000 + (h4 % 90000)).padStart(5, "0");

  return `${year}${c1}${c2}${c3}${numeric}`;
}

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (userRole !== "STUDENT") {
      return errorResponse(
        "FORBIDDEN",
        "Only students can apply for internships.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const { id: internshipId } = await params;

    const internship = await prisma.internship.findFirst({
      where: { id: internshipId, isActive: true, deletedAt: null },
    });

    if (!internship) {
      return errorResponse(
        "INTERNSHIP_NOT_FOUND",
        "Internship not found or not active.",
        { status: HTTP_2.NOT_FOUND },
      );
    }

        const existingApp = await prisma.internshipApplication.findFirst({
      where: { studentId: userId, internshipId },
    });

    if (existingApp) {
      return errorResponse(
        "ALREADY_APPLIED",
        `You have already applied for this internship. Current status: ${existingApp.status}.`,
        { status: HTTP_2.CONFLICT },
      );
    }

        const existingEnrollment = await prisma.enrollment.findFirst({
      where: { userId, internshipId },
    });

    if (existingEnrollment) {
      return errorResponse(
        "ALREADY_ENROLLED",
        "You are already enrolled in this internship.",
        { status: HTTP_2.CONFLICT },
      );
    }

        const isPaid = internship.type === "PAID" && (internship.price ?? 0) > 0;
    const defaultStatus = isPaid ? "APPROVED" : "UNDER_REVIEW";

    const application = await prisma.$transaction(async (tx) => {
            const app = await tx.internshipApplication.create({
        data: {
          studentId: userId,
          internshipId,
          status: defaultStatus,
        },
      });

      const formattedCode = generateApplicationCode(app.id, app.appliedAt);

            if (isPaid) {
        const enrollment = await tx.enrollment.create({
          data: {
            userId,
            internshipId,
          },
        });

                const updatedApp = await tx.internshipApplication.update({
          where: { id: app.id },
          data: { enrollmentId: enrollment.id, code: formattedCode },
        });

        return { app: updatedApp, enrollmentId: enrollment.id };
      }

            const appWithCode = await tx.internshipApplication.update({
        where: { id: app.id },
        data: { code: formattedCode },
      });

      return { app: appWithCode };
    });

        if (isPaid && application.enrollmentId) {
            const { issueIdCard } = await import("@/x/c6f69c52");
      await issueIdCard(userId, application.enrollmentId);
    }

        if (!isPaid) {
      (async () => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { email: true, name: true },
          });
          if (user) {
            const { sendInternshipApplicationSubmittedEmail } =
              await import("@/x/b7e0f2d7");
            await sendInternshipApplicationSubmittedEmail(
              user.email,
              user.name || "Student",
              internship.title,
              internship.companyName,
            );
          }
        } catch (err) {
          console.error(
            "[EMAIL ERROR] Failed to send internship application submission email:",
            err,
          );
        }
      })();
    }

    return successResponse(application.app, {
      status: HTTP_2.CREATED,
      message: isPaid
        ? "Successfully applied and enrolled in Paid Internship."
        : "Application submitted successfully. Under review.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: internshipId } = await params;

    const application = await prisma.internshipApplication.findFirst({
      where: { studentId: userId, internshipId },
      include: {
        internship: {
          select: {
            id: true,
            title: true,
            companyName: true,
            type: true,
            mode: true,
            location: true,
          },
        },
        reviewedBy: { select: { id: true, name: true } },
      },
    });

    if (!application) {
      return errorResponse(
        "NOT_APPLIED",
        "You have not applied for this internship.",
        { status: HTTP_2.NOT_FOUND },
      );
    }

    return successResponse(application);
  } catch (error) {
    return handleError(error);
  }
}
