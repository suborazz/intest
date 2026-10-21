import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
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

const updateTicketStatusSchema = z
  .object({
    status: z
      .preprocess((val) => {
        if (typeof val === "string") {
          const normalized = val.trim().toUpperCase().replace(/[\s-]+/g, "_");
          if (normalized === "PENDING") return "IN_PROGRESS";
          return normalized;
        }
        return val;
      }, z.enum(["OPEN", "IN_PROGRESS", "PENDING", "RESOLVED", "CLOSED"]).optional())
      .transform((val) => (val === "PENDING" ? ("IN_PROGRESS" as const) : val)),
    priority: z.preprocess(
      (val) => (typeof val === "string" ? val.trim().toUpperCase() : val),
      z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
    ),
    message: z.string().optional(),
    reply: z.string().optional(),
    response: z.string().optional(),
    comment: z.string().optional(),
  })
  .passthrough();

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id } = await params;

    const ticket = await prisma.supportTicket.findFirst({
      where: {
        OR: [{ id }, { ticketNo: id }],
        deletedAt: null,
      },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        replies: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            message: true,
            authorId: true,
            authorName: true,
            authorRole: true,
            createdAt: true,
          },
        },
      },
    });

    if (!ticket) {
      return errorResponse("NOT_FOUND", "Ticket not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    if (userRole !== "SUPER_ADMIN" && ticket.userId !== userId) {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    return successResponse(ticket);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }
    if (userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Only Super Admins can update support ticket status.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    const result = updateTicketStatusSchema.safeParse(body);
    if (!result.success) {
      return errorResponse("BAD_REQUEST", "Validation failed.", {
        status: HTTP_2.BAD_REQUEST,
        details: result.error.flatten().fieldErrors,
      });
    }

    const existing = await prisma.supportTicket.findFirst({
      where: {
        OR: [{ id }, { ticketNo: id }],
        deletedAt: null,
      },
    });

    if (!existing) {
      return errorResponse("NOT_FOUND", "Ticket not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const { status, priority, message, reply, response, comment } = result.data;
    const replyText = (message || reply || response || comment)?.trim();

    let targetStatus = status;
    if (replyText && !status && existing.status === "OPEN") {
      targetStatus = "IN_PROGRESS";
    }

    const updated = await prisma.supportTicket.update({
      where: { id: existing.id },
      data: {
        ...(targetStatus && { status: targetStatus }),
        ...(priority && { priority }),
      },
    });

    // Persist the admin reply so the full conversation history is saved
    // and can be reviewed in the admin panel (in addition to the email).
    if (replyText) {
      try {
        const admin = await prisma.user.findUnique({
          where: { id: userId },
          select: { name: true, email: true },
        });
        await prisma.ticketReply.create({
          data: {
            ticketId: existing.id,
            authorId: userId,
            authorName: admin?.name || admin?.email || "Support Team",
            authorRole: userRole || "SUPER_ADMIN",
            message: replyText,
          },
        });
      } catch (replyErr) {
        console.error(
          "[TICKET REPLY ERROR] Failed to persist reply:",
          replyErr,
        );
      }
    }

    (async () => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: existing.userId },
          select: { email: true, name: true },
        });
        if (user) {
          if (replyText) {
            const { sendSupportTicketReplyEmail } = await import("@/x/b7e0f2d7");
            await sendSupportTicketReplyEmail(
              user.email,
              user.name || "User",
              existing.ticketNo,
              existing.title,
              replyText,
            );
          } else if (targetStatus && targetStatus !== existing.status) {
            const { sendSupportTicketStatusUpdateEmail } =
              await import("@/x/b7e0f2d7");
            await sendSupportTicketStatusUpdateEmail(
              user.email,
              user.name || "User",
              existing.ticketNo,
              existing.title,
              targetStatus,
            );
          }
        }
      } catch (err) {
        console.error(
          "[EMAIL ERROR] Failed to send support ticket email:",
          err,
        );
      }
    })();

    return successResponse(updated, {
      message: "Ticket updated successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id } = await params;

    const existing = await prisma.supportTicket.findFirst({
      where: {
        OR: [{ id }, { ticketNo: id }],
        deletedAt: null,
      },
    });

    if (!existing) {
      return errorResponse("NOT_FOUND", "Ticket not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    if (userRole !== "SUPER_ADMIN" && existing.userId !== userId) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied to delete this ticket.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    await prisma.supportTicket.update({
      where: { id: existing.id },
      data: { deletedAt: new Date() },
    });

    return successResponse(null, { message: "Ticket deleted successfully." });
  } catch (error) {
    return handleError(error);
  }
}
