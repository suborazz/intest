import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
import { z } from "zod";
import { format } from "date-fns";
import { prisma } from "@/x/e3746f45";

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

const addressSchema = z.object({
  local: z.string().min(1, "Address line is required"),
  block: z.string().optional().nullable().or(z.literal("")).default(""),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required").default("India"),
  pinCode: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z.string().regex(/^\d{6}$/, "Pin code must be exactly 6 digits"),
  ),
});

const academicDetailSchema = z.object({
  qualification: z.string().min(1, "Qualification is required"),
  stream: z.string().min(1, "Stream is required"),
  subject: z.string().min(1, "Subject is required"),
  instituteName: z
    .string()
    .min(1, "Institute name must be at least 1 character"),
  universityName: z
    .string()
    .min(1, "University name must be at least 1 character"),
  sessionYear: z.string().min(1, "Session year is required"),
  gradeDivision: z.string().min(1, "Grade/Division is required"),
  status: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const s = val.trim();
        if (
          s === "Pass_Out" ||
          s === "PASS_OUT" ||
          s === "Pass Out" ||
          s === "PassOut"
        ) {
          return "Pass Out";
        }
        if (
          s === "Persuing" ||
          s === "Pursuing" ||
          s === "PURSUING" ||
          s === "persuing" ||
          s === "pursuing"
        ) {
          return "Persuing";
        }
      }
      return val;
    },
    z.enum(["Pass Out", "Persuing"]),
  ),
});

const studentSkillSchema = z.object({
  skillName: z.string().min(1, "Skill name/area is required"),
  description: z.string().optional().default(""),
  certifyingBody: z.string().optional().nullable().or(z.literal("")),
  certYear: z.string().optional().nullable().or(z.literal("")),
});

const MAX_BASE64_CHARS = 1_500_000;

const studentRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").trim(),
  fatherName: z
    .string()
    .min(2, "Father name must be at least 2 characters")
    .trim(),
  motherName: z
    .string()
    .min(2, "Mother name must be at least 2 characters")
    .trim(),
  dob: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.includes("T")) return val.split("T")[0];
        return val.trim();
      }
      return val;
    },
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  ),
  gender: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z.enum(["Male", "Female", "Transgender"]),
  ),
  category: z.string().min(1, "Category is required"),
  localAddress: addressSchema,
  sameAsLocal: z.preprocess((val) => Boolean(val), z.boolean()),
  permanentAddress: addressSchema.optional().or(z.any()),
  mobileNo: z.preprocess(
    (val) => {
      if (typeof val !== "string") return val;
      let cleaned = val.replace(/[\s-]/g, "");
      if (cleaned.startsWith("+91")) cleaned = cleaned.slice(3);
      else if (cleaned.startsWith("91") && cleaned.length === 12) cleaned = cleaned.slice(2);
      else if (cleaned.startsWith("0") && cleaned.length === 11) cleaned = cleaned.slice(1);
      return cleaned;
    },
    z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  ),
  academics: z
    .array(academicDetailSchema)
    .min(1, "At least one academic qualification is required"),
  skills: z.array(studentSkillSchema).optional().default([]),
  internshipGoal: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val.replace(/_/g, " ").trim();
      }
      return val;
    },
    z.enum([
      "Job",
      "Freelancing",
      "Higher Studies",
      "Startup",
      "Skill Enhancement",
      "Other",
    ]),
  ),
  aadharNo: z.preprocess(
    (val) => {
      if (!val) return "";
      if (typeof val === "string") {
        return val.replace(/[\s-]/g, "").trim();
      }
      return val;
    },
    z
      .string()
      .regex(/^\d{12}$/, "Aadhar number must be exactly 12 digits")
      .optional()
      .nullable()
      .or(z.literal("")),
  ),
  photoBase64: z
    .string()
    .min(1, "Photo is required")
    .max(MAX_BASE64_CHARS, "Photo must be under 1 MB"),
  photoName: z.string().min(1, "Photo filename is required"),
  signatureBase64: z
    .string()
    .min(1, "Signature is required")
    .max(MAX_BASE64_CHARS, "Signature must be under 1 MB"),
  signatureName: z.string().min(1, "Signature filename is required"),
  agreeTerms: z.preprocess(
    (val) => val === true || val === "true",
    z.literal(true, {
      error: "You must agree to terms and conditions",
    }),
  ),
});

const updateStudentRegistrationSchema = studentRegistrationSchema
  .omit({
    agreeTerms: true,
  })
  .partial();

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

function mapGoal(goal: string): string {
  const map: Record<string, string> = {
    Job: "Job",
    Freelancing: "Freelancing",
    "Higher Studies": "Higher_Studies",
    Startup: "Startup",
    "Skill Enhancement": "Skill_Enhancement",
    Other: "Other",
  };
  return map[goal] ?? goal;
}

function mapAcademicStatus(status: string): string {
  return status === "Pass Out" ? "Pass_Out" : "Persuing";
}

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

    const registration = await prisma.studentRegistration.findUnique({
      where: { id },
      include: {
        academics: true,
        skills: true,
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
      ((userRole !== "STUDENT" && userRole !== "IMMERSION_USER") ||
        registration.userId !== userId)
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

    const existing = await prisma.studentRegistration.findUnique({
      where: { id },
    });
    if (!existing || existing.deletedAt) {
      return errorResponse("NOT_FOUND", "Registration not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        if (
      userRole !== "SUPER_ADMIN" &&
      ((userRole !== "STUDENT" && userRole !== "IMMERSION_USER") ||
        existing.userId !== userId)
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You do not have permission to modify this registration.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const rawBody = await request.json();
    const body = { ...rawBody };
    if (body.sameAsLocal && body.localAddress) {
      body.permanentAddress = { ...body.localAddress };
    }
    const data = updateStudentRegistrationSchema.parse(body);

        const updateData: Record<string, unknown> = {};

    if (data.fullName) updateData["fullName"] = data.fullName;
    if (data.fatherName) updateData["fatherName"] = data.fatherName;
    if (data.motherName) updateData["motherName"] = data.motherName;
    if (data.dob) updateData["dob"] = data.dob;
    if (data.gender) updateData["gender"] = data.gender;
    if (data.category) updateData["category"] = data.category;
    if (data.mobileNo) updateData["mobileNo"] = data.mobileNo;
    if (data.aadharNo !== undefined) updateData["aadharNo"] = data.aadharNo;
    if (data.internshipGoal)
      updateData["internshipGoal"] = mapGoal(data.internshipGoal) as never;

    if (data.localAddress) {
      updateData["localAddressLocal"] = data.localAddress.local;
      updateData["localAddressBlock"] = data.localAddress.block ?? null;
      updateData["localAddressDistrict"] = data.localAddress.district;
      updateData["localAddressState"] = data.localAddress.state;
      updateData["localAddressCountry"] = data.localAddress.country;
      updateData["localAddressPinCode"] = data.localAddress.pinCode;
    }
    if (data.permanentAddress) {
      updateData["permAddressLocal"] = data.permanentAddress.local;
      updateData["permAddressBlock"] = data.permanentAddress.block ?? null;
      updateData["permAddressDistrict"] = data.permanentAddress.district;
      updateData["permAddressState"] = data.permanentAddress.state;
      updateData["permAddressCountry"] = data.permanentAddress.country;
      updateData["permAddressPinCode"] = data.permanentAddress.pinCode;
    }
    if (data.sameAsLocal !== undefined)
      updateData["sameAsLocal"] = data.sameAsLocal;

        if (data.photoBase64 && data.photoBase64.startsWith("data:image/")) {
      try {
        const photoResult = await uploadBase64(
          data.photoBase64,
          "iiit/students/photos",
          `photo-${existing.studentId}`,
        );
        updateData["photoUrl"] = photoResult.url;
        updateData["photoPublicId"] = photoResult.publicId;
        if (existing.photoPublicId) {
          await deleteAsset(existing.photoPublicId);
        }
      } catch (err) {
        console.error("[Cloudinary Photo Update Failed]", err);
        updateData["photoUrl"] = data.photoBase64;
      }
    }
    if (data.photoName) {
      updateData["photoName"] = data.photoName;
    }

        if (
      data.signatureBase64 &&
      data.signatureBase64.startsWith("data:image/")
    ) {
      try {
        const sigResult = await uploadBase64(
          data.signatureBase64,
          "iiit/students/signatures",
          `sig-${existing.studentId}`,
        );
        updateData["signatureUrl"] = sigResult.url;
        updateData["signaturePublicId"] = sigResult.publicId;
        if (existing.signaturePublicId) {
          await deleteAsset(existing.signaturePublicId);
        }
      } catch (err) {
        console.error("[Cloudinary Signature Update Failed]", err);
        updateData["signatureUrl"] = data.signatureBase64;
      }
    }
    if (data.signatureName) {
      updateData["signatureName"] = data.signatureName;
    }

        const updatedRegistration = await prisma.$transaction(async (tx) => {
      if (data.academics && data.academics.length > 0) {
        await tx.studentAcademic.deleteMany({ where: { registrationId: id } });
        await tx.studentAcademic.createMany({
          data: data.academics.map((ac) => ({
            registrationId: id,
            qualification: ac.qualification,
            stream: ac.stream,
            subject: ac.subject,
            instituteName: ac.instituteName,
            universityName: ac.universityName,
            sessionYear: ac.sessionYear,
            gradeDivision: ac.gradeDivision,
            status: mapAcademicStatus(ac.status) as never,
          })),
        });
      }

      if (data.skills) {
        await tx.studentSkill.deleteMany({ where: { registrationId: id } });
        if (data.skills.length > 0) {
          await tx.studentSkill.createMany({
            data: data.skills.map((sk) => ({
              registrationId: id,
              skillName: sk.skillName,
              description: sk.description,
              certifyingBody: sk.certifyingBody ?? null,
              certYear: sk.certYear ?? null,
            })),
          });
        }
      }

      const reg = await tx.studentRegistration.update({
        where: { id },
        data: updateData,
        include: { academics: true, skills: true },
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

    const existing = await prisma.studentRegistration.findUnique({
      where: { id },
    });
    if (!existing || existing.deletedAt) {
      return errorResponse("NOT_FOUND", "Registration not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        if (
      userRole !== "SUPER_ADMIN" &&
      ((userRole !== "STUDENT" && userRole !== "IMMERSION_USER") ||
        existing.userId !== userId)
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You do not have permission to delete this registration.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    await prisma.studentRegistration.update({
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
