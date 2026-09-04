import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

interface CloudinaryUploadResult {
    url: string;
    publicId: string;
}

async function uploadBuffer(
  buffer: Buffer,
  folder: string,
  publicIdPrefix: string,
  resourceType: "image" | "raw" | "auto" = "auto",
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${publicIdPrefix}-${Date.now()}`,
        resource_type: resourceType,
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload returned no result"));
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );
    uploadStream.end(buffer);
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

async function deleteAsset(
  publicId: string | null | undefined,
  resourceType: "image" | "raw" | "auto" = "auto",
): Promise<void> {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (err) {
        console.error(`[Cloudinary] Failed to delete asset "${publicId}":`, err);
  }
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

const updateNoticeSchema = z.object({
  noticeNumber: z
    .string()
    .min(1, "Notice number is required")
    .trim()
    .optional(),
  date: z.string().min(1, "Date is required").trim().optional(),
  title: z.string().min(3, "Title is required").trim().optional(),
  category: z
    .enum(["Important", "General", "Result", "Schedule", "Guidelines"])
    .optional(),
  description: z.string().min(5, "Description is required").trim().optional(),
  targetRole: z.enum(["STUDENT", "INSTRUCTOR"]).optional().nullable(),
  receiverId: z.string().optional().nullable(),
  pdfUrl: z.string().optional().nullable(),
  pdfPublicId: z.string().optional().nullable(),
});

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role") as UserRole;

    if (!userId || !userRole) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const existingNotice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!existingNotice) {
      return errorResponse("NOTICE_NOT_FOUND", "Notice not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    let body: {
      noticeNumber?: string;
      date?: string;
      title?: string;
      category?: string;
      description?: string;
      targetRole?: string | null;
      receiverId?: string | null;
    } = {};
    let pdfFile: File | null = null;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {
        noticeNumber: (formData.get("noticeNumber") as string) || undefined,
        date: (formData.get("date") as string) || undefined,
        title: (formData.get("title") as string) || undefined,
        category: (formData.get("category") as string) || undefined,
        description: (formData.get("description") as string) || undefined,
        targetRole: (formData.get("targetRole") as string) || undefined,
        receiverId: (formData.get("receiverId") as string) || undefined,
      };
      pdfFile =
        (formData.get("pdf") as File | null) ||
        (formData.get("pdfFile") as File | null);
    } else {
      body = await request.json();
    }

        if (body.targetRole === "") body.targetRole = null;
    if (body.receiverId === "") body.receiverId = null;

    const result = updateNoticeSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("VALIDATION_ERROR", "Validation failed.", {
        status: HTTP_2.UNPROCESSABLE,
        details: result.error.flatten().fieldErrors,
      });
    }

    let pdfUrl =
      result.data.pdfUrl !== undefined
        ? result.data.pdfUrl
        : existingNotice.pdfUrl;
    let pdfPublicId =
      result.data.pdfPublicId !== undefined
        ? result.data.pdfPublicId
        : existingNotice.pdfPublicId;

        if (pdfFile && pdfFile.size > 0) {
      if (pdfFile.size > 5 * 1024 * 1024) {
        return errorResponse(
          "VALIDATION_ERROR",
          "PDF document size exceeds the 5MB limit",
          {
            status: HTTP_2.UNPROCESSABLE,
            details: { pdf: ["PDF must be smaller than 5MB"] },
          },
        );
      }

            if (existingNotice.pdfPublicId) {
        try {
          await deleteAsset(existingNotice.pdfPublicId, "raw");
        } catch (e) {
          console.error("Failed to delete old PDF from Cloudinary:", e);
        }
      }

      const bytes = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await uploadBuffer(
        buffer,
        "iiit/notices",
        "notice",
        "raw",
      );
      pdfUrl = uploadResult.url;
      pdfPublicId = uploadResult.publicId;
    }

    const data = result.data;
    const updateData = {
      ...(data.noticeNumber !== undefined
        ? { noticeNumber: data.noticeNumber }
        : {}),
      ...(data.date !== undefined ? { date: data.date } : {}),
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.category !== undefined ? { category: data.category } : {}),
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
      ...(data.targetRole !== undefined ? { targetRole: data.targetRole } : {}),
      ...(data.receiverId !== undefined ? { receiverId: data.receiverId } : {}),
      pdfUrl,
      pdfPublicId,
    };

    const updatedNotice = await prisma.notice.update({
      where: { id },
      data: updateData,
      include: {
        sender: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    return successResponse(updatedNotice, {
      message: "Notice updated successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role") as UserRole;

    if (!userId || !userRole) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const existingNotice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!existingNotice) {
      return errorResponse("NOTICE_NOT_FOUND", "Notice not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        await prisma.notice.delete({
      where: { id },
    });

        if (existingNotice.pdfPublicId) {
      try {
        await deleteAsset(existingNotice.pdfPublicId, "raw");
      } catch (e) {
        console.error("Failed to delete PDF from Cloudinary:", e);
      }
    }

    return successResponse(null, {
      message: "Notice deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
