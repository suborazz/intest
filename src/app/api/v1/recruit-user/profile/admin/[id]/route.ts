import {
  BloodGroup,
  RecruitQualification,
  Religion,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { z } from "zod";
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

const recruitAddressSchema = z.object({
  local: z.string().min(3, "Address line must be at least 3 characters"),
  block: z.string().optional().or(z.literal("")),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  pinCode: z.string().regex(/^\d{6}$/, "Pin code must be exactly 6 digits"),
});

const emailSchema = z
  .string({ error: "Email is required" })
  .email("Invalid email address")
  .toLowerCase()
  .trim();

const recruitAcademicDetailSchema = z.object({
  qualification: z.enum([
    "8th Pass",
    "Matriculation",
    "Intermediate",
    "Diploma",
    "Graduation",
    "Post Graduation",
    "M. Phil.",
    "PhD.",
    "Other",
  ]),
  schoolInstitute: z.string().min(2, "School/Institute is required"),
  boardUniversity: z.string().min(2, "Board/University is required"),
  startYear: z.string().min(4, "Start year is required"),
  endYear: z.string().min(4, "End year is required"),
  passingDivision: z.string().min(1, "Passing Division is required"),
  passingMarks: z.coerce
    .number()
    .min(0)
    .max(100, "Marks must be between 0 and 100"),
  subject: z.string().min(1, "Subject is required"),
  certificateBase64: z.string().min(1, "Certificate file is required"),
  certificateName: z.string().min(1, "Certificate name is required"),
});

const recruitWorkExperienceSchema = z.object({
  employerName: z.string().min(2, "Employer Name is required"),
  designation: z.string().min(2, "Designation is required"),
  postingLocation: z.string().min(2, "Posting Location is required"),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be YYYY-MM-DD"),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be YYYY-MM-DD")
    .optional()
    .nullable()
    .or(z.literal("")),
  natureOfWork: z.string().min(2, "Nature of work is required"),
  experienceYears: z.coerce.number().nonnegative(),
  certBase64: z.string().min(1, "Experience certificate is required"),
  certName: z.string().min(1, "Certificate name is required"),
});

const recruitRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required").trim(),
  gender: z.enum(["Male", "Female", "Transgender"]),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be YYYY-MM-DD"),
  fatherName: z.string().min(2, "Father name is required").trim(),
  motherName: z.string().min(2, "Mother name is required").trim(),
  localAddress: recruitAddressSchema,
  sameAsLocal: z.boolean(),
  permanentAddress: recruitAddressSchema,
  mobileNo: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  email: emailSchema,
  maritalStatus: z.enum([
    "Married",
    "Unmarried",
    "Divorced",
    "Widow",
    "Widower",
  ]),
  nationality: z.string().min(2, "Nationality is required").default("Indian"),
  gotra: z.string().optional().nullable().or(z.literal("")),
  religion: z.enum([
    "Sanatan/Hindu",
    "Sikh",
    "Jain",
    "Parsi",
    "Buddhist",
    "Islam",
    "Christian",
    "Shinto",
    "Monotheism",
    "Protestantism",
    "Deism",
    "Yahudi",
    "Other",
  ]),
  category: z.enum(["Humanity", "General", "EWS", "OBC", "SC", "ST"]),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  hobby: z.string().optional().nullable().or(z.literal("")),
  languagesKnown: z.string().min(1, "Languages known is required"),
  physicallyChallenged: z.enum(["Yes", "No"]),
  aadharNo: z
    .string()
    .regex(/^\d{12}$/, "Aadhar No. must be 12 digits")
    .optional()
    .nullable()
    .or(z.literal("")),
  academics: z
    .array(recruitAcademicDetailSchema)
    .min(1, "At least one academic detail is required"),
  experiences: z.array(recruitWorkExperienceSchema).optional().default([]),
  photoBase64: z.string().min(1, "Photo is required"),
  photoName: z.string().min(1, "Photo name is required"),
  signatureBase64: z.string().min(1, "Signature is required"),
  signatureName: z.string().min(1, "Signature name is required"),
  resumeBase64: z.string().min(1, "Resume is required"),
  resumeName: z.string().min(1, "Resume name is required"),
  agreeTerms: z.literal(true, { error: "You must agree to terms" }),
});

const updateRecruitRegistrationSchema = recruitRegistrationSchema
  .omit({
    agreeTerms: true,
    photoBase64: true,
    signatureBase64: true,
    resumeBase64: true,
    photoName: true,
    signatureName: true,
    resumeName: true,
  })
  .partial()
  .extend({
            academics: z
      .array(
        recruitAcademicDetailSchema.extend({
          certificateBase64: z.string().optional().or(z.literal("")),
          certificateUrl: z.string().optional(),
        }),
      )
      .optional(),
    experiences: z
      .array(
        recruitWorkExperienceSchema.extend({
          certBase64: z.string().optional().or(z.literal("")),
          certUrl: z.string().optional(),
        }),
      )
      .optional(),
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

function mapQualification(q: string): RecruitQualification {
  const map: Record<string, string> = {
    "8th Pass": "Pass_8th",
    Matriculation: "Matriculation",
    Intermediate: "Intermediate",
    Diploma: "Diploma",
    Graduation: "Graduation",
    "Post Graduation": "Post_Graduation",
    "M. Phil.": "M_Phil",
    "PhD.": "PhD",
    Other: "Other",
  };
  return (map[q] ?? q) as RecruitQualification;
}

function mapReligion(r: string): Religion {
  const map: Record<string, string> = {
    "Sanatan/Hindu": "Sanatan_Hindu",
    Sikh: "Sikh",
    Jain: "Jain",
    Parsi: "Parsi",
    Buddhist: "Buddhist",
    Islam: "Islam",
    Christian: "Christian",
    Shinto: "Shinto",
    Monotheism: "Monotheism",
    Protestantism: "Protestantism",
    Deism: "Deism",
    Yahudi: "Yahudi",
    Other: "Other",
  };
  return (map[r] ?? r) as Religion;
}

function mapBloodGroup(b: string): BloodGroup {
  const map: Record<string, string> = {
    "A+": "A_POS",
    "A-": "A_NEG",
    "B+": "B_POS",
    "B-": "B_NEG",
    "AB+": "AB_POS",
    "AB-": "AB_NEG",
    "O+": "O_POS",
    "O-": "O_NEG",
  };
  return (map[b] ?? b) as BloodGroup;
}

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "SUPER_ADMIN") {
      return errorResponse("FORBIDDEN", "Super Admin only.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id } = await params;
    const profile = await prisma.recruitProfile.findUnique({
      where: { id },
      include: {
        academics: true,
        experiences: true,
      },
    });

    if (!profile) {
      return errorResponse("NOT_FOUND", "Profile not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    return successResponse(profile);
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

    if (!userId || userRole !== "SUPER_ADMIN") {
      return errorResponse("FORBIDDEN", "Super Admin only.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id } = await params;
    const existing = await prisma.recruitProfile.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("NOT_FOUND", "Profile not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const body = await request.json();
    const data = updateRecruitRegistrationSchema.parse(body);

    const updateData: Record<string, any> = {
      fullName: data.fullName,
      gender: data.gender,
      dob: data.dob,
      fatherName: data.fatherName,
      motherName: data.motherName,
      permAddressLocal: data.permanentAddress?.local,
      permAddressDistrict: data.permanentAddress?.district,
      permAddressState: data.permanentAddress?.state,
      permAddressCountry: data.permanentAddress?.country,
      permAddressPinCode: data.permanentAddress?.pinCode,
      currAddressLocal: data.localAddress?.local,
      currAddressDistrict: data.localAddress?.district,
      currAddressState: data.localAddress?.state,
      currAddressCountry: data.localAddress?.country,
      currAddressPinCode: data.localAddress?.pinCode,
      mobileNo: data.mobileNo,
      email: data.email,
      maritalStatus: data.maritalStatus,
      nationality: data.nationality,
      gotra: data.gotra,
      religion: data.religion ? mapReligion(data.religion) : undefined,
      category: data.category ? (data.category as any) : undefined,
      bloodGroup: data.bloodGroup ? mapBloodGroup(data.bloodGroup) : undefined,
      hobby: data.hobby,
      languagesKnown: data.languagesKnown,
      physicallyChallenged:
        data.physicallyChallenged !== undefined
          ? data.physicallyChallenged === "Yes"
          : undefined,
      aadharNo: data.aadharNo,
    };

        Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    const updated = await prisma.$transaction(async (tx) => {
      if (data.academics) {
        await tx.recruitAcademicDetail.deleteMany({ where: { profileId: id } });
        if (data.academics.length > 0) {
          await tx.recruitAcademicDetail.createMany({
            data: data.academics.map((ac) => ({
              profileId: id,
              qualification: mapQualification(ac.qualification),
              schoolInstitute: ac.schoolInstitute,
              boardUniversity: ac.boardUniversity,
              startYear: ac.startYear,
              endYear: ac.endYear,
              passingDivision: ac.passingDivision,
              passingMarks: ac.passingMarks,
              subject: ac.subject,
              certificateUrl: ac.certificateBase64
                ? ""
                : (ac as any).certificateUrl || "",
              certificatePublicId: "",
              certificateName: ac.certificateName,
            })),
          });
        }
      }

      if (data.experiences) {
        await tx.recruitWorkExperience.deleteMany({ where: { profileId: id } });
        if (data.experiences.length > 0) {
          await tx.recruitWorkExperience.createMany({
            data: data.experiences.map((exp) => ({
              profileId: id,
              employerName: exp.employerName,
              designation: exp.designation,
              postingLocation: exp.postingLocation,
              startDate: exp.startDate,
              endDate: exp.endDate || null,
              natureOfWork: exp.natureOfWork,
              experienceYears: exp.experienceYears,
              certUrl: exp.certBase64 ? "" : (exp as any).certUrl || "",
              certPublicId: "",
              certName: exp.certName,
            })),
          });
        }
      }

      return tx.recruitProfile.update({
        where: { id },
        data: updateData,
        include: { academics: true, experiences: true },
      });
    });

    return successResponse(updated, {
      message: "Recruit profile updated successfully.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse("VALIDATION_ERROR", "Validation failed", {
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
    if (userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Only Super Admins can access this endpoint.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const { id } = await params;

    const existing = await prisma.recruitProfile.findUnique({
      where: { id },
    });
    if (!existing) {
      return errorResponse("NOT_FOUND", "Recruit registration not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    await prisma.recruitProfile.delete({
      where: { id },
    });

    return successResponse(null, {
      message: "Recruit registration deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
