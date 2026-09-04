import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
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

    const createJobPlacementLeadSchema = z.object({
      name: z.string().min(1, "Name is required").trim(),
      age: z.coerce.number().int().min(18, "Age must be at least 18"),
      address: z.string().min(5, "Address is required").trim(),
      mobile: z
        .string()
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
      email: z.string().email("Invalid email address").trim(),
      qualification: z.string().min(1, "Qualification is required").trim(),
      skill: z.string().optional().nullable(),
      resumeUrl: z.string().optional().nullable(),
      resumePublicId: z.string().optional().nullable(),
    });

  try {
    const { id: jobPlacementCompanyId } = await params;

        const company = await prisma.jobPlacementCompany.findUnique({
      where: { id: jobPlacementCompanyId },
    });

    if (!company) {
      return errorResponse("NOT_FOUND", "Job Placement Company not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    let body: {
      name?: string;
      age?: string;
      address?: string;
      mobile?: string;
      email?: string;
      qualification?: string;
      skill?: string;
    } = {};
    let resumeFile: File | null = null;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {
        name: formData.get("name") as string,
        age: formData.get("age") as string,
        address: formData.get("address") as string,
        mobile: formData.get("mobile") as string,
        email: formData.get("email") as string,
        qualification: formData.get("qualification") as string,
        skill: (formData.get("skill") as string) || undefined,
      };
      resumeFile =
        (formData.get("resume") as File | null) ||
        (formData.get("resumeFile") as File | null);
    } else {
      body = await request.json();
    }

    const result = createJobPlacementLeadSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("VALIDATION_ERROR", "Validation failed.", {
        status: HTTP_2.UNPROCESSABLE,
        details: result.error.flatten().fieldErrors,
      });
    }

    if (!resumeFile || resumeFile.size === 0) {
      return errorResponse("VALIDATION_ERROR", "Resume document is required.", {
        status: HTTP_2.UNPROCESSABLE,
        details: { resume: ["Resume document is required."] },
      });
    }

        if (resumeFile.size > 5 * 1024 * 1024) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Resume size exceeds the 5MB limit.",
        {
          status: HTTP_2.UNPROCESSABLE,
          details: { resume: ["Resume must be smaller than 5MB"] },
        },
      );
    }

        const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await uploadBuffer(
      buffer,
      "iiit/placement-leads",
      "resume",
      "raw",
    );

    const lead = await prisma.jobPlacementLead.create({
      data: {
        jobPlacementCompanyId,
        name: result.data.name,
        age: result.data.age,
        address: result.data.address,
        mobile: result.data.mobile,
        email: result.data.email,
        qualification: result.data.qualification,
        skill: result.data.skill || null,
        resumeUrl: uploadResult.url,
        resumePublicId: uploadResult.publicId,
      },
    });

        const { sendJobPlacementLeadConfirmationEmail } =
      await import("@/x/b7e0f2d7");
    sendJobPlacementLeadConfirmationEmail(
      result.data.email,
      result.data.name,
      company.name,
    ).catch((err) =>
      console.error(
        "[EMAIL ERROR] Failed to send job placement interest confirmation email:",
        err,
      ),
    );

    return successResponse(lead, {
      message: "Interest submitted successfully.",
      status: HTTP_2.CREATED,
    });
  } catch (error) {
    return handleError(error);
  }
}
