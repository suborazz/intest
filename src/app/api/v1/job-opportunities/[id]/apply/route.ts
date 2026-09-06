import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteContext,
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

    const emailSchema = z
      .string({ error: "Email is required" })
      .email("Invalid email address")
      .toLowerCase()
      .trim();

    const createJobApplicationSchema = z.object({
      name: z.string().min(2, "Name is required"),
      age: z.coerce.number().int().min(1, "Age is required"),
      address: z.string().min(2, "Address is required"),
      mobile: z.string().min(10, "Mobile must be at least 10 digits"),
      email: emailSchema,
      qualification: z.string().min(2, "Qualification is required"),
      skills: z.string().optional(),
    });

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

    const ALLOWED_RESUME_TYPES = [
      "application/pdf",
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
    ];

    const MAX_RESUME_SIZE = 5 * 1024 * 1024;

  try {
    const { id: jobOpportunityId } = await params;

        const jobOpportunity = await prisma.jobOpportunity.findFirst({
      where: { id: jobOpportunityId, isActive: true, deletedAt: null },
    });

    if (!jobOpportunity) {
      return errorResponse(
        "JOB_NOT_FOUND",
        "Job Opportunity not found or is no longer active",
        {
          status: HTTP_2.NOT_FOUND,
        },
      );
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const age = formData.get("age") as string;
    const address = formData.get("address") as string;
    const mobile = formData.get("mobile") as string;
    const email = formData.get("email") as string;
    const qualification = formData.get("qualification") as string;
    const skills = formData.get("skills") as string | null;
    const resume = formData.get("resume") as File | null;

        const parsed = createJobApplicationSchema.safeParse({
      name,
      age,
      address,
      mobile,
      email,
      qualification,
      skills: skills || undefined,
    });

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid form data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

        const requesterId = request.headers.get("X-User-Id") || null;
    const requesterRole = request.headers.get("X-User-Role") || null;

    if (requesterRole === "STUDENT") {
      return errorResponse(
        "FORBIDDEN",
        "Students are not permitted to apply for job openings. Job applications are restricted to external candidates only.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

        const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobOpportunityId,
        OR: [
          ...(requesterId ? [{ userId: requesterId }] : []),
          { email: parsed.data.email },
        ],
        deletedAt: null,
      },
    });

    if (existingApplication) {
      return errorResponse(
        "CONFLICT",
        "You have already applied for this job opportunity. Multiple applications or updates are not permitted.",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

        if (!resume || resume.size === 0) {
      return errorResponse("VALIDATION_ERROR", "Resume file is required", {
        status: HTTP_2.UNPROCESSABLE,
        details: { resume: ["Resume file is required"] },
      });
    }

    if (resume.size > MAX_RESUME_SIZE) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Resume size exceeds the 5MB limit",
        {
          status: HTTP_2.UNPROCESSABLE,
          details: { resume: ["Resume must be smaller than 5MB"] },
        },
      );
    }

        const fileExt = resume.name.split(".").pop()?.toLowerCase() || "";
    if (
      !["pdf", "doc", "docx"].includes(fileExt) &&
      !ALLOWED_RESUME_TYPES.includes(resume.type)
    ) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Invalid resume format. Only PDF, DOC, or DOCX formats are allowed.",
        {
          status: HTTP_2.UNPROCESSABLE,
          details: { resume: ["Only PDF, DOC, or DOCX formats are allowed."] },
        },
      );
    }

        const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await uploadBuffer(
      buffer,
      "iiit/jobs/resumes",
      "resume",
      "raw",
    );
    const resumeUrl = uploadResult.url;
    const resumePublicId = uploadResult.publicId;

    const application = await prisma.jobApplication.create({
      data: {
        jobOpportunityId,
        name: parsed.data.name,
        age: parsed.data.age,
        address: parsed.data.address,
        mobile: parsed.data.mobile,
        email: parsed.data.email,
        qualification: parsed.data.qualification,
        skills: parsed.data.skills ?? null,
        resumeUrl,
        resumePublicId,
        userId: requesterId,
      },
    });

        const { sendJobApplicationSubmittedEmail } = await import("@/x/b7e0f2d7");
    sendJobApplicationSubmittedEmail(
      parsed.data.email,
      parsed.data.name,
      jobOpportunity.postOpportunity,
      jobOpportunity.companyName,
    ).catch((err) =>
      console.error(
        "[EMAIL ERROR] Failed to send job application confirmation:",
        err,
      ),
    );

    return successResponse(application, {
      status: HTTP_2.CREATED,
      message: "Your expression of interest has been successfully submitted.",
    });
  } catch (error) {
    return handleError(error);
  }
}
