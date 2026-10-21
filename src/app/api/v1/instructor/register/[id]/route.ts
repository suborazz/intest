import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { z } from "zod";
import { format } from "date-fns";
import { prisma } from "@/x/e3746f45";
import { cloudinary } from "@/x/cloudinary";

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

async function uploadBase64(
  base64String: string,
  folder: string,
  publicIdPrefix: string,
  resourceType: "image" | "raw" | "auto" = "auto",
): Promise<CloudinaryUploadResult> {
  const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let buffer: Buffer;
  let finalResourceType = resourceType;

  if (matches && matches.length === 3) {
    const mimeType = matches[1];
    buffer = Buffer.from(matches[2], "base64");
    if (mimeType === "application/pdf") {
      finalResourceType = "raw";
    }
  } else {
    buffer = Buffer.from(base64String, "base64");
  }

  return uploadBuffer(buffer, folder, publicIdPrefix, finalResourceType);
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
  const firstIssue = error.issues[0];
  const message = firstIssue?.message || "Request validation failed";
  return errorResponse("VALIDATION_ERROR", message, {
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

const instructorAddressSchema = z.object({
  local: z.string().min(3, "Address line must be at least 3 characters"),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  pinCode: z.string().regex(/^\d{6}$/, "Pin code must be exactly 6 digits"),
});

const qualificationDetailSchema = z.object({
  highestQualification: z.string().min(1, "Highest qualification is required"),
  specialization: z.string().min(1, "Specialization is required"),
  universityName: z.string().min(2, "University name is required"),
  yearOfCompletion: z.string().min(1, "Year of completion is required"),
  percentage: z.string().min(1, "Percentage/CGPA is required"),
});

const instructorRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").trim(),
  fatherSpouseName: z
    .string()
    .min(2, "Father/Spouse name must be at least 2 characters")
    .trim(),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  gender: z.enum(["Male", "Female", "Transgender"]),
  mobileNo: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  alternateMobileNo: z
    .string()
    .regex(/^\d{10}$/, "Alternate mobile number must be exactly 10 digits")
    .optional()
    .or(z.literal("")),
  currentAddress: instructorAddressSchema,
  sameAsCurrentAddress: z.boolean(),
  permanentAddress: instructorAddressSchema,
  qualifications: z
    .array(qualificationDetailSchema)
    .min(1, "At least one qualification is required"),
  currentOrganization: z
    .string()
    .optional()
    .or(z.literal(""))
    .default(""),
  currentDesignation: z
    .string()
    .optional()
    .or(z.literal(""))
    .default(""),
  totalWorkExperience: z
    .string()
    .optional()
    .or(z.literal(""))
    .default(""),
  teachingExperience: z
    .string()
    .optional()
    .or(z.literal(""))
    .default(""),
  internshipExperience: z
    .string()
    .optional()
    .or(z.literal(""))
    .default(""),
  mentorshipAreas: z
    .string()
    .min(
      5,
      "TEMP_CAP_INSTRUCTORSHIP description must be at least 5 characters",
    ),
  preferredInternLevel: z
    .array(z.string())
    .min(1, "Select at least one intern level preference"),
  maxInterns: z.string().min(1, "Specify maximum interns"),
  mentorshipMode: z
    .array(z.string())
    .min(1, "Select at least one mentorship mode"),
  availability: z.string().min(1, "Specify availability slot"),
  selfIntroduction: z
    .string()
    .min(10, "Self introduction must be at least 10 characters"),
  photoBase64: z.string().min(1, "Photo is required"),
  photoName: z.string().min(1, "Photo filename is required"),
  identityProofBase64: z.string().optional().or(z.literal("")).default(""),
  identityProofName: z.string().optional().or(z.literal("")).default(""),
  educationCertBase64: z.string().optional().or(z.literal("")).default(""),
  educationCertName: z.string().optional().or(z.literal("")).default(""),
  experienceCertBase64: z.string().optional().or(z.literal("")).default(""),
  experienceCertName: z.string().optional().or(z.literal("")).default(""),
  agreeTerms: z.literal(true, { error: "You must agree to terms" }),
});

const updateInstructorAddressSchema = z.object({
  local: z.string().optional().or(z.literal("")),
  district: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  pinCode: z.string().optional().or(z.literal("")),
});

const updateInstructorRegistrationSchema = z.object({
  fullName: z.string().min(1).optional(),
  fatherSpouseName: z.string().optional(),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Transgender"]).or(z.string()).optional(),
  mobileNo: z.preprocess(
    (val) => {
      if (typeof val !== "string") return val;
      let cleaned = val.replace(/[\s-]/g, "");
      if (cleaned.startsWith("+91")) cleaned = cleaned.slice(3);
      else if (cleaned.startsWith("91") && cleaned.length === 12) cleaned = cleaned.slice(2);
      else if (cleaned.startsWith("0") && cleaned.length === 11) cleaned = cleaned.slice(1);
      return cleaned;
    },
    z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits").optional(),
  ),
  alternateMobileNo: z.string().nullable().optional().or(z.literal("")),
  currentAddress: updateInstructorAddressSchema.optional(),
  sameAsCurrentAddress: z.boolean().optional(),
  permanentAddress: updateInstructorAddressSchema.optional(),
  qualifications: z.array(z.any()).optional(),
  currentOrganization: z.string().optional().or(z.literal("")),
  currentDesignation: z.string().optional().or(z.literal("")),
  totalWorkExperience: z.string().optional().or(z.literal("")),
  teachingExperience: z.string().optional().or(z.literal("")),
  internshipExperience: z.string().optional().or(z.literal("")),
  mentorshipAreas: z.string().optional().or(z.literal("")),
  preferredInternLevel: z
    .union([
      z.array(z.string()),
      z.string().transform((s) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [])),
    ])
    .optional(),
  maxInterns: z.union([z.string(), z.number().transform(String)]).optional(),
  mentorshipMode: z
    .union([
      z.array(z.string()),
      z.string().transform((s) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [])),
    ])
    .optional(),
  availability: z.string().optional().or(z.literal("")),
  selfIntroduction: z.string().optional().or(z.literal("")),
  accountHolderName: z.string().optional().or(z.literal("")),
  accountNo: z.string().optional().or(z.literal("")),
  ifscCode: z.string().optional().or(z.literal("")),
  bankName: z.string().optional().or(z.literal("")),
  bankBranchAddress: z.string().optional().or(z.literal("")),
  photoBase64: z.string().optional().or(z.literal("")),
  photoName: z.string().optional().or(z.literal("")),
  identityProofBase64: z.string().optional().or(z.literal("")),
  identityProofName: z.string().optional().or(z.literal("")),
  educationCertBase64: z.string().optional().or(z.literal("")),
  educationCertName: z.string().optional().or(z.literal("")),
  experienceCertBase64: z.string().optional().or(z.literal("")),
  experienceCertName: z.string().optional().or(z.literal("")),
  isApproved: z.boolean().optional(),
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

    const registration = await prisma.instructorRegistration.findFirst({
      where: {
        OR: [{ id }, { instructorId: id }],
      },
      include: {
        qualifications: true,
        user: { select: { id: true, email: true, name: true, isActive: true } },
      },
    });

    if (!registration || registration.deletedAt) {
      return errorResponse("NOT_FOUND", "Registration not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    if (
      userRole !== "SUPER_ADMIN" &&
      (userRole !== "INSTRUCTOR" || registration.userId !== userId)
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You do not have permission to view this registration.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const mappedRegistration = {
      ...registration,
      email: registration.user?.email || null,
    };

    return successResponse(mappedRegistration);
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

    const { id } = await params;

    const existing = await prisma.instructorRegistration.findFirst({
      where: {
        OR: [{ id }, { instructorId: id }],
      },
    });
    if (!existing || existing.deletedAt) {
      return errorResponse("NOT_FOUND", "Registration not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    if (
      userRole !== "SUPER_ADMIN" &&
      (userRole !== "INSTRUCTOR" || existing.userId !== userId)
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You do not have permission to modify this registration.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const rawBody = await request.json();
    const body = { ...rawBody };
    if (body.sameAsCurrentAddress && body.currentAddress) {
      body.permanentAddress = { ...body.currentAddress };
    }
    const data = updateInstructorRegistrationSchema.parse(body);

    const updateData: Record<string, unknown> = {};

    if (data.fullName !== undefined) updateData["fullName"] = data.fullName;
    if (data.fatherSpouseName !== undefined)
      updateData["fatherSpouseName"] = data.fatherSpouseName;
    if (data.dob !== undefined) updateData["dob"] = data.dob;
    if (data.gender !== undefined) updateData["gender"] = data.gender;
    if (data.mobileNo !== undefined) updateData["mobileNo"] = data.mobileNo;
    if (data.alternateMobileNo !== undefined)
      updateData["alternateMobileNo"] = data.alternateMobileNo || null;
    if (data.currentOrganization !== undefined)
      updateData["currentOrganization"] = data.currentOrganization;
    if (data.currentDesignation !== undefined)
      updateData["currentDesignation"] = data.currentDesignation;
    if (data.totalWorkExperience !== undefined)
      updateData["totalWorkExperience"] = data.totalWorkExperience;
    if (data.teachingExperience !== undefined)
      updateData["teachingExperience"] = data.teachingExperience;
    if (data.internshipExperience !== undefined)
      updateData["internshipExperience"] = data.internshipExperience;
    if (data.mentorshipAreas !== undefined && data.mentorshipAreas !== "")
      updateData["mentorshipAreas"] = data.mentorshipAreas;
    if (data.preferredInternLevel !== undefined && data.preferredInternLevel.length > 0)
      updateData["preferredInternLevel"] = data.preferredInternLevel;
    if (data.maxInterns !== undefined && data.maxInterns !== "")
      updateData["maxInterns"] = data.maxInterns;
    if (data.mentorshipMode !== undefined && data.mentorshipMode.length > 0)
      updateData["mentorshipMode"] = data.mentorshipMode;
    if (data.availability !== undefined && data.availability !== "")
      updateData["availability"] = data.availability;
    if (data.selfIntroduction !== undefined && data.selfIntroduction !== "")
      updateData["selfIntroduction"] = data.selfIntroduction;
    if (data.accountHolderName !== undefined)
      updateData["accountHolderName"] = data.accountHolderName;
    if (data.accountNo !== undefined) updateData["accountNo"] = data.accountNo;
    if (data.ifscCode !== undefined) updateData["ifscCode"] = data.ifscCode;
    if (data.bankName !== undefined) updateData["bankName"] = data.bankName;
    if (data.bankBranchAddress !== undefined)
      updateData["bankBranchAddress"] = data.bankBranchAddress;

    if (data.currentAddress) {
      if (data.currentAddress.local !== undefined) updateData["currentAddressLocal"] = data.currentAddress.local;
      if (data.currentAddress.district !== undefined) updateData["currentAddressDistrict"] = data.currentAddress.district;
      if (data.currentAddress.state !== undefined) updateData["currentAddressState"] = data.currentAddress.state;
      if (data.currentAddress.country !== undefined) updateData["currentAddressCountry"] = data.currentAddress.country;
      if (data.currentAddress.pinCode !== undefined) updateData["currentAddressPinCode"] = data.currentAddress.pinCode;
    }
    if (data.permanentAddress) {
      if (data.permanentAddress.local !== undefined) updateData["permAddressLocal"] = data.permanentAddress.local;
      if (data.permanentAddress.district !== undefined) updateData["permAddressDistrict"] = data.permanentAddress.district;
      if (data.permanentAddress.state !== undefined) updateData["permAddressState"] = data.permanentAddress.state;
      if (data.permanentAddress.country !== undefined) updateData["permAddressCountry"] = data.permanentAddress.country;
      if (data.permanentAddress.pinCode !== undefined) updateData["permAddressPinCode"] = data.permanentAddress.pinCode;
    }
    if (data.sameAsCurrentAddress !== undefined)
      updateData["sameAsCurrentAddress"] = data.sameAsCurrentAddress;

    // Process new Photo upload if provided
    if (data.photoBase64 && (data.photoBase64.startsWith("data:") || data.photoBase64.length > 200)) {
      try {
        const photoResult = await uploadBase64(
          data.photoBase64,
          "iiit/instructors/photos",
          `inst-photo-${existing.instructorId || existing.id}`,
          "image",
        );
        updateData["photoUrl"] = photoResult.url;
        updateData["photoPublicId"] = photoResult.publicId;
        if (data.photoName) {
          updateData["photoName"] = data.photoName;
        }
        if (existing.photoPublicId) {
          await deleteAsset(existing.photoPublicId, "image");
        }
      } catch (uploadErr) {
        console.error("Failed to upload updated instructor photo:", uploadErr);
      }
    }

    // Process new Identity Proof upload if provided
    if (data.identityProofBase64 && (data.identityProofBase64.startsWith("data:") || data.identityProofBase64.length > 200)) {
      try {
        const idResult = await uploadBase64(
          data.identityProofBase64,
          "iiit/instructors/id-proofs",
          `inst-id-${existing.instructorId || existing.id}`,
        );
        updateData["identityProofUrl"] = idResult.url;
        updateData["identityProofPublicId"] = idResult.publicId;
        if (data.identityProofName) {
          updateData["identityProofName"] = data.identityProofName;
        }
        if (existing.identityProofPublicId) {
          await deleteAsset(existing.identityProofPublicId);
        }
      } catch (uploadErr) {
        console.error("Failed to upload updated identity proof:", uploadErr);
      }
    }

    // Process new Education Certificate upload if provided
    if (data.educationCertBase64 && (data.educationCertBase64.startsWith("data:") || data.educationCertBase64.length > 200)) {
      try {
        const eduResult = await uploadBase64(
          data.educationCertBase64,
          "iiit/instructors/edu-certs",
          `inst-edu-${existing.instructorId || existing.id}`,
        );
        updateData["educationCertUrl"] = eduResult.url;
        updateData["educationCertPublicId"] = eduResult.publicId;
        if (data.educationCertName) {
          updateData["educationCertName"] = data.educationCertName;
        }
        if (existing.educationCertPublicId) {
          await deleteAsset(existing.educationCertPublicId);
        }
      } catch (uploadErr) {
        console.error("Failed to upload updated education certificate:", uploadErr);
      }
    }

    // Process new Experience Certificate upload if provided
    if (data.experienceCertBase64 && (data.experienceCertBase64.startsWith("data:") || data.experienceCertBase64.length > 200)) {
      try {
        const expResult = await uploadBase64(
          data.experienceCertBase64,
          "iiit/instructors/exp-certs",
          `inst-exp-${existing.instructorId || existing.id}`,
        );
        updateData["experienceCertUrl"] = expResult.url;
        updateData["experienceCertPublicId"] = expResult.publicId;
        if (data.experienceCertName) {
          updateData["experienceCertName"] = data.experienceCertName;
        }
        if (existing.experienceCertPublicId) {
          await deleteAsset(existing.experienceCertPublicId);
        }
      } catch (uploadErr) {
        console.error("Failed to upload updated experience certificate:", uploadErr);
      }
    }

    const updatedRegistration = await prisma.$transaction(async (tx) => {
      if (data.qualifications && data.qualifications.length > 0) {
        await tx.instructorQualification.deleteMany({
          where: { registrationId: existing.id },
        });
        await tx.instructorQualification.createMany({
          data: data.qualifications.map((q: any) => ({
            registrationId: existing.id,
            highestQualification: q.highestQualification,
            specialization: q.specialization,
            universityName: q.universityName,
            yearOfCompletion: q.yearOfCompletion,
            percentage: q.percentage,
          })),
        });
      }

      const reg = await tx.instructorRegistration.update({
        where: { id: existing.id },
        data: updateData,
        include: { qualifications: true },
      });

      if (data.fullName && reg.userId) {
        await tx.user.update({
          where: { id: reg.userId },
          data: { name: data.fullName },
        });
      }

      return reg;
    });

    return successResponse(updatedRegistration, {
      message: "Registration updated successfully.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse("VALIDATION_ERROR", "Request validation failed", {
        status: HTTP_2.UNPROCESSABLE,
        details: error.flatten().fieldErrors,
      });
    }
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

    const existing = await prisma.instructorRegistration.findUnique({
      where: { id },
    });
    if (!existing || existing.deletedAt) {
      return errorResponse("NOT_FOUND", "Registration not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    if (
      userRole !== "SUPER_ADMIN" &&
      (userRole !== "INSTRUCTOR" || existing.userId !== userId)
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You do not have permission to delete this registration.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    await prisma.instructorRegistration.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return successResponse(null, {
      message: "Registration deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
