import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/x/cloudinary";
import { z, ZodError } from "zod";
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

const createMediaPhotoSchema = z.object({
  title: z.string().min(2, "Title is required"),
  date: z.string().min(2, "Date is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

const updateMediaPhotoSchema = createMediaPhotoSchema.partial();

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

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; 

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const requesterRole = request.headers.get("X-User-Role");

    if (requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const existingPhoto = await prisma.mediaPhoto.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingPhoto) {
      return errorResponse("PHOTO_NOT_FOUND", "Photo not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const formData = await request.formData();
    const updateData: Record<string, unknown> = {};

    const fields = ["title", "date", "description"];
    fields.forEach((field) => {
      if (formData.has(field)) {
        updateData[field] = formData.get(field);
      }
    });

    const parsed = updateMediaPhotoSchema.safeParse(updateData);
    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

        if (formData.has("photo")) {
      const file = formData.get("photo") as File | null;
      if (file && file.size > 0) {
        if (file.size > MAX_IMAGE_SIZE) {
          return errorResponse(
            "VALIDATION_ERROR",
            "Photo size exceeds the 5MB limit",
            {
              status: HTTP_2.UNPROCESSABLE,
              details: { photo: ["Photo must be smaller than 5MB"] },
            },
          );
        }

        const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
        if (
          !["png", "jpg", "jpeg", "webp"].includes(fileExt) &&
          !ALLOWED_IMAGE_TYPES.includes(file.type)
        ) {
          return errorResponse(
            "VALIDATION_ERROR",
            "Invalid file format. Only PNG, JPG, JPEG, and WEBP formats are allowed.",
            {
              status: HTTP_2.UNPROCESSABLE,
              details: {
                photo: ["Only PNG, JPG, JPEG, and WEBP formats are allowed."],
              },
            },
          );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await uploadBuffer(
          buffer,
          "iiit/media/photos",
          "photo",
        );

                if (existingPhoto.filePublicId) {
          await deleteAsset(existingPhoto.filePublicId);
        }

        updateData.url = uploadResult.url;
        updateData.filePublicId = uploadResult.publicId;
      }
    }

    const updatedPhoto = await prisma.mediaPhoto.update({
      where: { id },
      data: updateData,
    });

    return successResponse(updatedPhoto, {
      message: "Photo updated successfully.",
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
    const requesterRole = request.headers.get("X-User-Role");

    if (requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const existingPhoto = await prisma.mediaPhoto.findFirst({
      where: { id, deletedAt: null },
    });

    if (!existingPhoto) {
      return errorResponse("PHOTO_NOT_FOUND", "Photo not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    await prisma.mediaPhoto.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    if (existingPhoto.filePublicId) {
      await deleteAsset(existingPhoto.filePublicId);
    }

    return successResponse(null, {
      message: "Photo deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
