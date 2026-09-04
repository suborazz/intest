import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { z } from "zod";
import { format } from "date-fns";
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

const updateInstructorRegistrationSchema = instructorRegistrationSchema
  .omit({
    agreeTerms: true,
    photoBase64: true,
    photoName: true,
    identityProofBase64: true,
    identityProofName: true,
    educationCertBase64: true,
    educationCertName: true,
    experienceCertBase64: true,
    experienceCertName: true,
  })
  .partial();

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

    const registration = await prisma.instructorRegistration.findUnique({
      where: { id },
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

    return successResponse(registration);
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
        "You do not have permission to modify this registration.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const body = await request.json();
    const data = updateInstructorRegistrationSchema.parse(body);

    const updateData: Record<string, unknown> = {};

    if (data.fullName) updateData["fullName"] = data.fullName;
    if (data.fatherSpouseName)
      updateData["fatherSpouseName"] = data.fatherSpouseName;
    if (data.dob) updateData["dob"] = data.dob;
    if (data.gender) updateData["gender"] = data.gender;
    if (data.mobileNo) updateData["mobileNo"] = data.mobileNo;
    if (data.alternateMobileNo !== undefined)
      updateData["alternateMobileNo"] = data.alternateMobileNo || null;
    if (data.currentOrganization)
      updateData["currentOrganization"] = data.currentOrganization;
    if (data.currentDesignation)
      updateData["currentDesignation"] = data.currentDesignation;
    if (data.totalWorkExperience)
      updateData["totalWorkExperience"] = data.totalWorkExperience;
    if (data.teachingExperience)
      updateData["teachingExperience"] = data.teachingExperience;
    if (data.internshipExperience)
      updateData["internshipExperience"] = data.internshipExperience;
    if (data.mentorshipAreas)
      updateData["mentorshipAreas"] = data.mentorshipAreas;
    if (data.preferredInternLevel)
      updateData["preferredInternLevel"] = data.preferredInternLevel;
    if (data.maxInterns) updateData["maxInterns"] = data.maxInterns;
    if (data.mentorshipMode) updateData["mentorshipMode"] = data.mentorshipMode;
    if (data.availability) updateData["availability"] = data.availability;
    if (data.selfIntroduction)
      updateData["selfIntroduction"] = data.selfIntroduction;

    if (data.currentAddress) {
      updateData["currentAddressLocal"] = data.currentAddress.local;
      updateData["currentAddressDistrict"] = data.currentAddress.district;
      updateData["currentAddressState"] = data.currentAddress.state;
      updateData["currentAddressCountry"] = data.currentAddress.country;
      updateData["currentAddressPinCode"] = data.currentAddress.pinCode;
    }
    if (data.permanentAddress) {
      updateData["permAddressLocal"] = data.permanentAddress.local;
      updateData["permAddressDistrict"] = data.permanentAddress.district;
      updateData["permAddressState"] = data.permanentAddress.state;
      updateData["permAddressCountry"] = data.permanentAddress.country;
      updateData["permAddressPinCode"] = data.permanentAddress.pinCode;
    }
    if (data.sameAsCurrentAddress !== undefined)
      updateData["sameAsCurrentAddress"] = data.sameAsCurrentAddress;

    const updatedRegistration = await prisma.$transaction(async (tx) => {
      if (data.qualifications && data.qualifications.length > 0) {
        await tx.instructorQualification.deleteMany({
          where: { registrationId: id },
        });
        await tx.instructorQualification.createMany({
          data: data.qualifications.map((q) => ({
            registrationId: id,
            highestQualification: q.highestQualification,
            specialization: q.specialization,
            universityName: q.universityName,
            yearOfCompletion: q.yearOfCompletion,
            percentage: q.percentage,
          })),
        });
      }

      const reg = await tx.instructorRegistration.update({
        where: { id },
        data: updateData,
        include: { qualifications: true },
      });

      if (data.fullName) {
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
