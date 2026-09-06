import { JobApplicationStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cloudinary } from "@/x/cloudinary";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
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
    interface CloudinaryUploadResult {
        url: string;
        publicId: string;
    }

    async function uploadBase64(
      base64DataUrl: string,
      folder: string,
      publicIdPrefix: string,
      resourceType: "image" | "raw" | "auto" = "auto",
    ): Promise<CloudinaryUploadResult> {
      const result = await cloudinary.uploader.upload(base64DataUrl, {
        folder,
        public_id: `${publicIdPrefix}-${Date.now()}`,
        resource_type: resourceType,
        overwrite: false,
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
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

    const updateStatusSchema = z.object({
      status: z.nativeEnum(JobApplicationStatus, {
        error: "Status is required",
      }),
      message: z.string().optional(),
      pdfBase64: z.string().optional(),
      link: z.string().optional(),
    });

  const uploadedAssetIds: string[] = [];
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

    const application = await prisma.jobApplication.findFirst({
      where: { id, deletedAt: null },
    });

    if (!application) {
      return errorResponse(
        "APPLICATION_NOT_FOUND",
        "Job Application not found.",
        {
          status: HTTP_2.NOT_FOUND,
        },
      );
    }

    const body = await request.json();
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid status payload", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { status, message, pdfBase64, link } = parsed.data;

    let attachmentUrl = "";
    if (pdfBase64) {
      try {
        const uploadRes = await uploadBase64(
          pdfBase64,
          "recruit/attachments",
          `status-attach-${id}-${Date.now()}`,
        );
        attachmentUrl = uploadRes.url;
        uploadedAssetIds.push(uploadRes.publicId);
      } catch (uploadErr) {
        console.error("Failed to upload status attachment:", uploadErr);
        return errorResponse(
          "UPLOAD_FAILED",
          "Failed to upload attached document",
          {
            status: HTTP_2.INTERNAL_SERVER_ERROR,
          },
        );
      }
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id },
      data: {
        status,
      },
      include: {
        jobOpportunity: {
          select: {
            companyName: true,
            postOpportunity: true,
          },
        },
      },
    });

        const { sendJobApplicationStatusUpdateEmail } = await import("@/x/b7e0f2d7");
    sendJobApplicationStatusUpdateEmail(
      updatedApplication.email,
      updatedApplication.name,
      updatedApplication.jobOpportunity.postOpportunity,
      updatedApplication.jobOpportunity.companyName,
      updatedApplication.status,
      message,
      attachmentUrl,
      link,
    ).catch((err) =>
      console.error(
        "[EMAIL ERROR] Failed to send job application status update email:",
        err,
      ),
    );

    return successResponse(updatedApplication, {
      message: `Job Application status updated to ${status} successfully.`,
    });
  } catch (error) {
    for (const assetId of uploadedAssetIds) {
      await deleteAsset(assetId).catch(console.error);
    }
    return handleError(error);
  }
}
