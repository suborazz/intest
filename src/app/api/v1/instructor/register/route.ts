import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
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

    const instructorAddressSchema = z.object({
      local: z.string().min(1, "Address line is required"),
      district: z.string().min(1, "District is required"),
      state: z.string().min(1, "State is required"),
      country: z.string().min(1, "Country is required").default("India"),
      pinCode: z.preprocess(
        (val) => (typeof val === "string" ? val.trim() : val),
        z.string().regex(/^\d{6}$/, "Pin code must be exactly 6 digits"),
      ),
    });

    const qualificationDetailSchema = z.object({
      highestQualification: z.string().min(1, "Highest qualification is required"),
      specialization: z.string().min(1, "Specialization is required"),
      universityName: z.string().min(1, "University name is required"),
      yearOfCompletion: z.string().min(1, "Year of completion is required"),
      percentage: z.string().min(1, "Percentage/CGPA is required"),
    });

    const instructorRegistrationSchema = z.object({
      fullName: z.string().min(2, "Full name must be at least 2 characters").trim(),
      fatherSpouseName: z
        .string()
        .min(2, "Father/Spouse name must be at least 2 characters")
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
      alternateMobileNo: z.preprocess(
        (val) => {
          if (!val) return "";
          if (typeof val !== "string") return val;
          let cleaned = val.replace(/[\s-]/g, "");
          if (cleaned.startsWith("+91")) cleaned = cleaned.slice(3);
          else if (cleaned.startsWith("91") && cleaned.length === 12) cleaned = cleaned.slice(2);
          else if (cleaned.startsWith("0") && cleaned.length === 11) cleaned = cleaned.slice(1);
          return cleaned;
        },
        z
          .string()
          .regex(/^\d{10}$/, "Alternate mobile number must be exactly 10 digits")
          .optional()
          .nullable()
          .or(z.literal("")),
      ),
      currentAddress: instructorAddressSchema,
      sameAsCurrentAddress: z.preprocess((val) => Boolean(val), z.boolean()),
      permanentAddress: z
        .object({
          local: z.string().optional().default(""),
          district: z.string().optional().default(""),
          state: z.string().optional().default(""),
          country: z.string().optional().default("India"),
          pinCode: z.string().optional().default(""),
        })
        .optional()
        .default({
          local: "",
          district: "",
          state: "",
          country: "India",
          pinCode: "",
        }),
      qualifications: z
        .array(qualificationDetailSchema)
        .min(1, "At least one qualification is required"),
      currentOrganization: z.string().optional().nullable().or(z.literal("")).default(""),
      currentDesignation: z.string().optional().nullable().or(z.literal("")).default(""),
      totalWorkExperience: z.string().optional().nullable().or(z.literal("")).default(""),
      teachingExperience: z.string().optional().nullable().or(z.literal("")).default(""),
      internshipExperience: z.string().optional().nullable().or(z.literal("")).default(""),
      mentorshipAreas: z
        .string()
        .min(
          2,
          "Mentorship areas description must be at least 2 characters",
        ),
      preferredInternLevel: z
        .union([
          z.array(z.string()),
          z.string().transform((s) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [])),
        ])
        .default([]),
      maxInterns: z.union([z.string(), z.number().transform(String)]).optional().default("5"),
      mentorshipMode: z
        .union([
          z.array(z.string()),
          z.string().transform((s) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [])),
        ])
        .default([]),
      availability: z.string().optional().nullable().or(z.literal("")).default(""),
      selfIntroduction: z
        .string()
        .min(5, "Self introduction must be at least 5 characters"),
      photoBase64: z.string().min(1, "Photo is required"),
      photoName: z.string().min(1, "Photo filename is required"),
      identityProofBase64: z.string().optional().nullable().or(z.literal("")).default(""),
      identityProofName: z.string().optional().nullable().or(z.literal("")).default(""),
      educationCertBase64: z.string().optional().nullable().or(z.literal("")).default(""),
      educationCertName: z.string().optional().nullable().or(z.literal("")).default(""),
      experienceCertBase64: z.string().optional().nullable().or(z.literal("")).default(""),
      experienceCertName: z.string().optional().nullable().or(z.literal("")).default(""),
      agreeTerms: z.preprocess((val) => val === true || val === "true", z.literal(true, { error: "You must agree to terms" })),
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

    function generateInstructorId(fullName: string): string {
      const year = new Date().getFullYear();

      const words = fullName.trim().split(/\s+/).filter(Boolean);
      let initials: string;
      if (words.length === 0) {
        initials = "XX";
      } else if (words.length === 1) {
        const word = words[0]!;
        initials =
          word.length >= 2
            ? word.slice(0, 2).toUpperCase()
            : (word[0]! + "X").toUpperCase();
      } else {
        initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
      }

      const random = Math.floor(Math.random() * 90_000) + 10_000;
      return `I${year}${initials}${random}`;
    }

  let savedPhotoUrl = "";
  let savedIdUrl = "";
  let savedEduUrl = "";
  let savedExpUrl = "";
  let savedPhotoPublicId = "";
  let savedIdPublicId = "";
  let savedEduPublicId = "";
  let savedExpPublicId = "";

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }
    if (userRole !== "INSTRUCTOR") {
      return errorResponse(
        "FORBIDDEN",
        "Only instructors can submit registration details.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const rawBody = await request.json();
    const body = { ...rawBody };
    if (body.sameAsCurrentAddress && body.currentAddress) {
      body.permanentAddress = { ...body.currentAddress };
    }
    if (!body.availability) {
      const parts = [body.availabilityDays, body.availabilityTimeSlots].filter(Boolean);
      if (parts.length > 0) {
        body.availability = parts.join(", ");
      }
    }
    const data = instructorRegistrationSchema.parse(body);

        const existing = await prisma.instructorRegistration.findUnique({
      where: { userId },
    });
    if (existing) {
      return errorResponse(
        "ALREADY_REGISTERED",
        "You have already submitted an instructor registration.",
        { status: HTTP_2.CONFLICT },
      );
    }

        let instructorId = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      const candidate = generateInstructorId(data.fullName);
      const collision = await prisma.instructorRegistration.findUnique({
        where: { instructorId: candidate },
      });
      if (!collision) {
        instructorId = candidate;
        break;
      }
    }
    if (!instructorId) {
      return errorResponse(
        "ID_GENERATION_FAILED",
        "Could not generate a unique Instructor ID. Please try again.",
        {
          status: HTTP_2.INTERNAL_SERVER_ERROR,
        },
      );
    }

        try {
      const uploadPromises: Promise<void>[] = [];

      // 1. Photo (required)
      uploadPromises.push(
        uploadBase64(
          data.photoBase64,
          "iiit/instructors/photos",
          `inst-photo-${instructorId}`,
        ).then((photoResult) => {
          savedPhotoUrl = photoResult.url;
          savedPhotoPublicId = photoResult.publicId;
        }),
      );

      // 2. Identity Proof (optional)
      if (data.identityProofBase64 && data.identityProofName) {
        uploadPromises.push(
          uploadBase64(
            data.identityProofBase64,
            "iiit/instructors/id-proofs",
            `inst-id-${instructorId}`,
          ).then((idResult) => {
            savedIdUrl = idResult.url;
            savedIdPublicId = idResult.publicId;
          }),
        );
      }

      // 3. Education Certificate (optional)
      if (data.educationCertBase64 && data.educationCertName) {
        uploadPromises.push(
          uploadBase64(
            data.educationCertBase64,
            "iiit/instructors/edu-certs",
            `inst-edu-${instructorId}`,
          ).then((eduResult) => {
            savedEduUrl = eduResult.url;
            savedEduPublicId = eduResult.publicId;
          }),
        );
      }

      // 4. Experience Certificate (optional)
      if (data.experienceCertBase64 && data.experienceCertName) {
        uploadPromises.push(
          uploadBase64(
            data.experienceCertBase64,
            "iiit/instructors/exp-certs",
            `inst-exp-${instructorId}`,
          ).then((expResult) => {
            savedExpUrl = expResult.url;
            savedExpPublicId = expResult.publicId;
          }),
        );
      }

      await Promise.all(uploadPromises);
    } catch (fileErr) {
      console.error("[Cloudinary Upload Failed]", fileErr);
      await Promise.allSettled([
        deleteAsset(savedPhotoPublicId),
        deleteAsset(savedIdPublicId),
        deleteAsset(savedEduPublicId),
        deleteAsset(savedExpPublicId),
      ]);
      return errorResponse(
        "FILE_UPLOAD_FAILED",
        "Could not upload instructor documents. Please try again.",
        {
          status: HTTP_2.INTERNAL_SERVER_ERROR,
        },
      );
    }

    const permAddr =
      data.sameAsCurrentAddress || !data.permanentAddress?.local
        ? data.currentAddress
        : {
            local: data.permanentAddress.local || data.currentAddress.local,
            district: data.permanentAddress.district || data.currentAddress.district,
            state: data.permanentAddress.state || data.currentAddress.state,
            country: data.permanentAddress.country || data.currentAddress.country || "India",
            pinCode: data.permanentAddress.pinCode || data.currentAddress.pinCode,
          };

    const registration = await prisma.$transaction(async (tx) => {
      const reg = await tx.instructorRegistration.create({
        data: {
          instructorId,
          userId,
          isApproved: true,
          approvedAt: new Date(),

          fullName: data.fullName,
          fatherSpouseName: data.fatherSpouseName,
          dob: data.dob,
          gender: data.gender as "Male" | "Female" | "Transgender",

          mobileNo: data.mobileNo,
          alternateMobileNo: data.alternateMobileNo || null,

          currentAddressLocal: data.currentAddress.local,
          currentAddressDistrict: data.currentAddress.district,
          currentAddressState: data.currentAddress.state,
          currentAddressCountry: data.currentAddress.country,
          currentAddressPinCode: data.currentAddress.pinCode,

          sameAsCurrentAddress: data.sameAsCurrentAddress,
          permAddressLocal: permAddr.local,
          permAddressDistrict: permAddr.district,
          permAddressState: permAddr.state,
          permAddressCountry: permAddr.country,
          permAddressPinCode: permAddr.pinCode,

          currentOrganization: data.currentOrganization || "",
          currentDesignation: data.currentDesignation || "",
          totalWorkExperience: data.totalWorkExperience || "",
          teachingExperience: data.teachingExperience || "",
          internshipExperience: data.internshipExperience || "",
          mentorshipAreas: data.mentorshipAreas,
          preferredInternLevel: data.preferredInternLevel,
          maxInterns: data.maxInterns,
          mentorshipMode: data.mentorshipMode,
          availability: data.availability || "",
          selfIntroduction: data.selfIntroduction,

          photoUrl: savedPhotoUrl,
          photoPublicId: savedPhotoPublicId,
          photoName: data.photoName,
          identityProofUrl: savedIdUrl,
          identityProofPublicId: savedIdPublicId,
          identityProofName: data.identityProofName || "",
          educationCertUrl: savedEduUrl,
          educationCertPublicId: savedEduPublicId,
          educationCertName: data.educationCertName || "",
          experienceCertUrl: savedExpUrl || null,
          experienceCertPublicId: savedExpPublicId || null,
          experienceCertName: data.experienceCertName || null,

          agreeTerms: data.agreeTerms,

          qualifications: {
            create: data.qualifications.map((q) => ({
              highestQualification: q.highestQualification,
              specialization: q.specialization,
              universityName: q.universityName,
              yearOfCompletion: q.yearOfCompletion,
              percentage: q.percentage,
            })),
          },
        },
        include: { qualifications: true },
      });

      await tx.user.update({
        where: { id: userId },
        data: { name: data.fullName, isActive: true },
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
          const { sendInstructorProfileRegistrationCompletionEmail } =
            await import("@/x/b7e0f2d7");
          await sendInstructorProfileRegistrationCompletionEmail(
            user.email,
            user.name || data.fullName,
            instructorId,
          );
        }
      } catch (err) {
        console.error(
          "[EMAIL ERROR] Failed to send instructor registration completion email:",
          err,
        );
      }
    })();

    return successResponse(registration, {
      message: `Registration submitted successfully. Your Instructor ID is ${instructorId}.`,
      status: HTTP_2.CREATED,
    });
  } catch (error) {
        await deleteAsset(savedPhotoPublicId);
    await deleteAsset(savedIdPublicId);
    await deleteAsset(savedEduPublicId);
    await deleteAsset(savedExpPublicId);

    if (error instanceof ZodError) {
      const firstIssue = error.issues[0];
      const message = firstIssue?.message || "Request validation failed";
      return errorResponse("VALIDATION_ERROR", message, {
        status: HTTP_2.UNPROCESSABLE,
        details: error.flatten().fieldErrors,
      });
    }
    return handleError(error);
  }
}
