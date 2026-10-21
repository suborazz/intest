import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    const createTicketSchema = z
      .object({
        title: z.string().min(3, "Title must be at least 3 characters long").trim(),
        description: z.string().optional(),
        message: z.string().optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
      })
      .refine(
        (data) =>
          (data.description && data.description.trim().length >= 3) ||
          (data.message && data.message.trim().length >= 3),
        {
          message: "Description must be at least 3 characters long",
          path: ["description"],
        },
      );

    async function generateUniqueTicketNo(): Promise<string> {
      let isUnique = false;
      let ticketNo = "";
      while (!isUnique) {
        const randomDigits = Math.floor(100000 + Math.random() * 900000); 
        ticketNo = `TKT-${randomDigits}`;
        const existing = await prisma.supportTicket.findUnique({
          where: { ticketNo },
        });
        if (!existing) {
          isUnique = true;
        }
      }
      return ticketNo;
    }

  try {
    const userId = request.headers.get("X-User-Id");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const body = await request.json();
    const result = createTicketSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("BAD_REQUEST", "Validation failed.", {
        status: HTTP_2.BAD_REQUEST,
        details: result.error.flatten().fieldErrors,
      });
    }

    const { title, description, message, priority } = result.data;
    const finalDescription = (description || message)!.trim();
    const ticketNo = await generateUniqueTicketNo();

    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNo,
        title,
        description: finalDescription,
        priority,
        userId,
      },
    });

        (async () => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { email: true, name: true },
        });
        if (user) {
          const { sendSupportTicketReceivedEmail } =
            await import("@/x/b7e0f2d7");
          await sendSupportTicketReceivedEmail(
            user.email,
            user.name || "User",
            ticketNo,
            title,
            finalDescription,
          );
        }
      } catch (err) {
        console.error(
          "[EMAIL ERROR] Failed to send support ticket email:",
          err,
        );
      }
    })();

    return successResponse(ticket, {
      message: "Support ticket raised successfully.",
      status: HTTP_2.CREATED,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required." } },
        { status: 401 },
      );
    }

    if (userRole === "SUPER_ADMIN") {
      const tickets = await prisma.supportTicket.findMany({
        where: { deletedAt: null },
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ success: true, data: tickets });
    }

    const tickets = await prisma.supportTicket.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: tickets });
  } catch (error) {
    console.error("[GET /api/v1/tickets Error]:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" } },
      { status: 500 },
    );
  }
}
