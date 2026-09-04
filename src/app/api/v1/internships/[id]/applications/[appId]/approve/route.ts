import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { create } from "zustand";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

async function generateIdCardNo(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ID-${year}-`;

  const last = await prisma.idCard.findFirst({
    where: { cardNo: { startsWith: prefix } },
    orderBy: { cardNo: "desc" },
  });

  if (!last) {
    return `${prefix}0001`;
  }

  const lastSeq = parseInt(last.cardNo.replace(prefix, ""), 10);
  const nextSeq = String(lastSeq + 1).padStart(4, "0");
  return `${prefix}${nextSeq}`;
}

async function issueIdCard(studentId: string, enrollmentId: string) {
    const existing = await prisma.idCard.findUnique({
    where: { enrollmentId },
  });

  if (existing) {
    return existing;
  }

  const cardNo = await generateIdCardNo();

  return await prisma.idCard.create({
    data: {
      cardNo,
      studentId,
      enrollmentId,
    },
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

const approveApplicationSchema = z.object({
  reviewNote: z.string().max(500).optional(),
});

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; appId: string }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: internshipId, appId } = await params;

    const application = await prisma.internshipApplication.findFirst({
      where: { id: appId, internshipId },
      include: { internship: true },
    });

    if (!application) {
      return errorResponse("APPLICATION_NOT_FOUND", "Application not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const hasAccess =
      requesterRole === "SUPER_ADMIN" ||
      (requesterRole === "INSTRUCTOR" &&
        (application.internship.instructorId === requesterId ||
          application.internship.createdById === requesterId));

    if (!hasAccess) {
      return errorResponse(
        "FORBIDDEN",
        "Only the assigned instructor or admin can approve applications.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    if (
      application.status !== "UNDER_REVIEW" &&
      application.status !== "REJECTED"
    ) {
      return errorResponse(
        "INVALID_STATUS",
        `Cannot approve — application is already ${application.status}.`,
        { status: HTTP_2.CONFLICT },
      );
    }

    const body: unknown = await request.json().catch(() => ({}));
    const parsed = approveApplicationSchema.safeParse(body);
    const reviewNote = parsed.success ? (parsed.data.reviewNote ?? null) : null;

        const [enrollment] = await prisma.$transaction([
      prisma.enrollment.create({
        data: {
          userId: application.studentId,
          internshipId: application.internshipId,
        },
      }),
    ]);

        await issueIdCard(application.studentId, enrollment.id);

    const updatedApp = await prisma.internshipApplication.update({
      where: { id: appId },
      data: {
        status: "APPROVED",
        reviewedAt: new Date(),
        reviewedById: requesterId,
        reviewNote,
        enrollmentId: enrollment.id,
      },
      include: {
        student: { select: { id: true, name: true, email: true } },
        internship: {
          select: {
            id: true,
            title: true,
            companyName: true,
            type: true,
            mode: true,
          },
        },
        reviewedBy: { select: { id: true, name: true } },
      },
    });

        const { sendInternshipApplicationStatusUpdateEmail } =
      await import("@/x/b7e0f2d7");
    sendInternshipApplicationStatusUpdateEmail(
      updatedApp.student.email,
      updatedApp.student.name || "Student",
      updatedApp.internship.title,
      "APPROVED",
    ).catch((err) =>
      console.error(
        "[EMAIL ERROR] Failed to send internship application approval email:",
        err,
      ),
    );

    return successResponse(updatedApp, {
      message:
        "Application approved. Enrollment & ID Card created successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  return PATCH(request, context);
}
