import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
import { z } from "zod";
import { format } from "date-fns";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    function generateStudentId(fullName: string): string {
      const year = new Date().getFullYear();

      const words = fullName.trim().split(/\s+/).filter(Boolean);
      let initials: string;
      if (words.length >= 2) {
        initials = (
          words[0]!.charAt(0) + words[words.length - 1]!.charAt(0)
        ).toUpperCase();
      } else if (words.length === 1 && words[0]!.length >= 2) {
        initials = words[0]!.substring(0, 2).toUpperCase();
      } else if (words.length === 1) {
        initials = (words[0]!.charAt(0) + "X").toUpperCase();
      } else {
        initials = "XX";
      }

      const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();

      return `S${year}${initials}${randomDigits}`;
    }

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

  let savedPhotoUrl = "";
  let savedSigUrl = "";
  let savedPhotoPublicId = "";
  let savedSigPublicId = "";

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }
    if (userRole !== "STUDENT" && userRole !== "IMMERSION_USER") {
      return errorResponse(
        "FORBIDDEN",
        "Only students and immersion participants can submit a registration.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

        const rawBody = await request.json();
    const body = { ...rawBody };
    if (body.sameAsLocal && body.localAddress) {
      body.permanentAddress = { ...body.localAddress };
    }
    const data = studentRegistrationSchema.parse(body);

        const existing = await prisma.studentRegistration.findUnique({
      where: { userId },
    });
    if (existing) {
      return errorResponse(
        "ALREADY_REGISTERED",
        "You have already submitted a registration. Use GET /api/v1/student/register/me to view it.",
        { status: HTTP_2.CONFLICT },
      );
    }

        let studentId = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      const candidate = generateStudentId(data.fullName);
      const collision = await prisma.studentRegistration.findUnique({
        where: { studentId: candidate },
      });
      if (!collision) {
        studentId = candidate;
        break;
      }
    }
    if (!studentId) {
      return errorResponse(
        "ID_GENERATION_FAILED",
        "Could not generate a unique Student ID. Please try again.",
        {
          status: HTTP_2.INTERNAL_SERVER_ERROR,
        },
      );
    }

        try {
      const [photoResult, sigResult] = await Promise.all([
        uploadBase64(
          data.photoBase64,
          "iiit/students/photos",
          `photo-${studentId}`,
        ),
        uploadBase64(
          data.signatureBase64,
          "iiit/students/signatures",
          `sig-${studentId}`,
        ),
      ]);
      savedPhotoUrl = photoResult.url;
      savedPhotoPublicId = photoResult.publicId;
      savedSigUrl = sigResult.url;
      savedSigPublicId = sigResult.publicId;
    } catch (fileErr) {
      console.error("[Cloudinary Upload Failed]", fileErr);
      await Promise.allSettled([
        deleteAsset(savedPhotoPublicId),
        deleteAsset(savedSigPublicId),
      ]);
      return errorResponse(
        "FILE_UPLOAD_FAILED",
        "Could not upload student photos/signatures. Please try again.",
        {
          status: HTTP_2.INTERNAL_SERVER_ERROR,
        },
      );
    }

        const permAddr = data.sameAsLocal
      ? data.localAddress
      : data.permanentAddress;

        const registration = await prisma.$transaction(async (tx) => {
      const reg = await tx.studentRegistration.create({
        data: {
          studentId,
          userId,

          fullName: data.fullName,
          fatherName: data.fatherName,
          motherName: data.motherName,
          dob: data.dob,
          gender: data.gender as "Male" | "Female" | "Transgender",
          category: data.category,

          localAddressLocal: data.localAddress.local,
          localAddressBlock: data.localAddress.block ?? null,
          localAddressDistrict: data.localAddress.district,
          localAddressState: data.localAddress.state,
          localAddressCountry: data.localAddress.country,
          localAddressPinCode: data.localAddress.pinCode,

          sameAsLocal: data.sameAsLocal,
          permAddressLocal: permAddr.local,
          permAddressBlock: permAddr.block ?? null,
          permAddressDistrict: permAddr.district,
          permAddressState: permAddr.state,
          permAddressCountry: permAddr.country,
          permAddressPinCode: permAddr.pinCode,

          mobileNo: data.mobileNo,
          internshipGoal: mapGoal(data.internshipGoal) as never,
          aadharNo: data.aadharNo ?? null,

                    photoUrl: savedPhotoUrl,
          photoPublicId: savedPhotoPublicId,
          photoName: data.photoName,
          signatureUrl: savedSigUrl,
          signaturePublicId: savedSigPublicId,
          signatureName: data.signatureName,

          agreeTerms: data.agreeTerms,

          academics: {
            create: data.academics.map((ac) => ({
              qualification: ac.qualification,
              stream: ac.stream,
              subject: ac.subject,
              instituteName: ac.instituteName,
              universityName: ac.universityName,
              sessionYear: ac.sessionYear,
              gradeDivision: ac.gradeDivision,
              status: mapAcademicStatus(ac.status) as never,
            })),
          },
          skills: {
            create: data.skills.map((sk) => ({
              skillName: sk.skillName,
              description: sk.description,
              certifyingBody: sk.certifyingBody ?? null,
              certYear: sk.certYear ?? null,
            })),
          },
        },
        include: { academics: true, skills: true },
      });

      await tx.user.update({
        where: { id: userId },
        data: { name: data.fullName },
      });

      return reg;
    });

        (async () => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { email: true, name: true },
        });
        if (user) {
          const { sendStudentProfileRegistrationCompletionEmail } =
            await import("@/x/b7e0f2d7");
          await sendStudentProfileRegistrationCompletionEmail(
            user.email,
            user.name || data.fullName,
            studentId,
          );
        }
      } catch (err) {
        console.error(
          "[EMAIL ERROR] Failed to send student registration completion email:",
          err,
        );
      }
    })();

    return successResponse(registration, {
      message: `Registration successful. Your Student ID is ${studentId}.`,
      status: HTTP_2.CREATED,
    });
  } catch (error) {
        await deleteAsset(savedPhotoPublicId);
    await deleteAsset(savedSigPublicId);

    if (error instanceof ZodError) {
      return errorResponse("VALIDATION_ERROR", "Request validation failed", {
        status: HTTP_2.UNPROCESSABLE,
        details: error.flatten().fieldErrors,
      });
    }
    return handleError(error);
  }
}
