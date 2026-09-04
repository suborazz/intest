import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { v2 as cloudinary } from "cloudinary";
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

const emailSchema = z
  .string({ error: "Email is required" })
  .email("Invalid email address")
  .toLowerCase()
  .trim();

const immersionParticipantProfileSchema = z.object({
    fullName: z.string().min(2, "Full name is required").trim(),
  fatherMotherName: z.string().min(2, "Father/Mother name is required").trim(),
  dateOfBirth: z.coerce.date({ error: "Date of birth is required" }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  mobileNumber: z.string().min(10, "Valid mobile number is required").trim(),
  alternateMobileNo: z.string().optional(),
  emailAddress: emailSchema.optional(),

    permLocalArea: z.string().min(1, "Local area is required").trim(),
  permDistrict: z.string().min(1, "District is required").trim(),
  permState: z.string().min(1, "State is required").trim(),
  permCountry: z.string().min(1, "Country is required").trim(),
  permPinCode: z.string().min(4, "Pin code is required").trim(),

    currentAddressSameAsPerm: z.boolean().default(true),
  currLocalArea: z.string().optional(),
  currDistrict: z.string().optional(),
  currState: z.string().optional(),
  currCountry: z.string().optional(),
  currPinCode: z.string().optional(),
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

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || (userRole !== "IMMERSION_USER" && userRole !== "STUDENT")) {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const profile = await prisma.immersionParticipantProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            registrationNo: true,
          },
        },
      },
    });

    return successResponse(profile ?? null);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || (userRole !== "IMMERSION_USER" && userRole !== "STUDENT")) {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const contentType = request.headers.get("content-type") ?? "";
    let profileData: Record<string, unknown> = {};
    let passportPhotoUrl: string | undefined;
    let resumeUrl: string | undefined;
    let nocUrl: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

            formData.forEach((value, key) => {
        if (typeof value === "string") {
          profileData[key] = value;
        }
      });

            const passportPhoto = formData.get("passportPhoto") as File | null;
      if (passportPhoto && passportPhoto.size > 0) {
        const buf = Buffer.from(await passportPhoto.arrayBuffer());
        const result = await uploadBuffer(
          buf,
          "iiit/immersion/photos",
          `photo-${userId}`,
          "image",
        );
        passportPhotoUrl = result.url;
      }

            const resume = formData.get("resume") as File | null;
      if (resume && resume.size > 0) {
        const buf = Buffer.from(await resume.arrayBuffer());
        const result = await uploadBuffer(
          buf,
          "iiit/immersion/resumes",
          `resume-${userId}`,
          "raw",
        );
        resumeUrl = result.url;
      }

            const noc = formData.get("noc") as File | null;
      if (noc && noc.size > 0) {
        const buf = Buffer.from(await noc.arrayBuffer());
        const result = await uploadBuffer(
          buf,
          "iiit/immersion/noc",
          `noc-${userId}`,
          "raw",
        );
        nocUrl = result.url;
      }

            if (typeof profileData["currentAddressSameAsPerm"] === "string") {
        profileData["currentAddressSameAsPerm"] =
          profileData["currentAddressSameAsPerm"] === "true";
      }
    } else {
      profileData = (await request.json()) as Record<string, unknown>;
    }

    const parsed = immersionParticipantProfileSchema.safeParse(profileData);
    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid profile data.", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const d = parsed.data;
    const data = {
      fullName: d.fullName,
      fatherMotherName: d.fatherMotherName,
      dateOfBirth: d.dateOfBirth,
      gender: d.gender,
      mobileNumber: d.mobileNumber,
      alternateMobileNo: d.alternateMobileNo ?? null,
      emailAddress:
        d.emailAddress ||
        (
          await prisma.user.findUnique({
            where: { id: userId },
            select: { email: true },
          })
        )?.email ||
        "",
      permLocalArea: d.permLocalArea,
      permDistrict: d.permDistrict,
      permState: d.permState,
      permCountry: d.permCountry,
      permPinCode: d.permPinCode,
      currentAddressSameAsPerm: d.currentAddressSameAsPerm,
      currLocalArea: d.currLocalArea ?? null,
      currDistrict: d.currDistrict ?? null,
      currState: d.currState ?? null,
      currCountry: d.currCountry ?? null,
      currPinCode: d.currPinCode ?? null,
      ...(passportPhotoUrl !== undefined ? { passportPhotoUrl } : {}),
      ...(resumeUrl !== undefined ? { resumeUrl } : {}),
      ...(nocUrl !== undefined ? { nocUrl } : {}),
    };

    const profile = await prisma.$transaction(async (tx) => {
      const p = await tx.immersionParticipantProfile.upsert({
        where: { userId },
        create: { userId, ...data },
        update: data,
        include: {
          user: {
            select: {
              registrationNo: true,
            },
          },
        },
      });

      if (data.fullName) {
        await tx.user.update({
          where: { id: userId },
          data: { name: data.fullName },
        });
      }

      return p;
    });

    return successResponse(profile, {
      message: "Profile updated successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
