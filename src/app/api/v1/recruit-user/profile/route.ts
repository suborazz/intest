import {
  BloodGroup,
  Prisma,
  RecruitQualification,
  Religion,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
import { z } from "zod";
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

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

        let targetUserId = requesterId;
    if (requesterRole === "SUPER_ADMIN") {
      const { searchParams } = request.nextUrl;
      const paramUserId = searchParams.get("userId");
      if (paramUserId) {
        targetUserId = paramUserId;
      }
    } else if (requesterRole !== "RECRUIT_USER") {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const profile = await prisma.recruitProfile.findUnique({
      where: { userId: targetUserId },
      include: {
        academics: true,
        experiences: true,
      },
    });

    if (!profile) {
      return errorResponse(
        "PROFILE_NOT_FOUND",
        "Recruit profile details not found.",
        { status: HTTP_2.NOT_FOUND },
      );
    }

    return successResponse(profile);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const uploadedAssetIds: string[] = [];

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "RECRUIT_USER") {
      return errorResponse(
        "UNAUTHORIZED",
        "Recruit User credentials required.",
        {
          status: HTTP_2.UNAUTHORIZED,
        },
      );
    }

    const existing = await prisma.recruitProfile.findUnique({
      where: { userId },
    });
    if (existing) {
      return errorResponse(
        "ALREADY_REGISTERED",
        "You have already submitted a profile.",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

    const body = await request.json();
    const data = recruitRegistrationSchema.parse(body);

        let photoUrl = "";
    let photoPublicId = "";
    let sigUrl = "";
    let sigPublicId = "";
    let resumeUrl = "";
    let resumePublicId = "";

    try {
      const photoRes = await uploadBase64(
        data.photoBase64,
        "recruit/photos",
        `photo-${userId}`,
      );
      photoUrl = photoRes.url;
      photoPublicId = photoRes.publicId;
      uploadedAssetIds.push(photoPublicId);

      const sigRes = await uploadBase64(
        data.signatureBase64,
        "recruit/signatures",
        `sig-${userId}`,
      );
      sigUrl = sigRes.url;
      sigPublicId = sigRes.publicId;
      uploadedAssetIds.push(sigPublicId);

      const resumeRes = await uploadBase64(
        data.resumeBase64,
        "recruit/resumes",
        `resume-${userId}`,
      );
      resumeUrl = resumeRes.url;
      resumePublicId = resumeRes.publicId;
      uploadedAssetIds.push(resumePublicId);
    } catch (err) {
      console.error("File uploads failed:", err);
      for (const id of uploadedAssetIds) {
        await deleteAsset(id).catch(console.error);
      }
      return errorResponse(
        "UPLOAD_FAILED",
        "Failed to upload attachments. Please try again.",
        {
          status: HTTP_2.INTERNAL_SERVER_ERROR,
        },
      );
    }

        const academicsData: Prisma.RecruitAcademicDetailCreateWithoutProfileInput[] =
      [];
    for (let i = 0; i < data.academics.length; i++) {
      const ac = data.academics[i];
      try {
        const certRes = await uploadBase64(
          ac.certificateBase64,
          "recruit/academics",
          `acad-${userId}-${i}`,
        );
        uploadedAssetIds.push(certRes.publicId);
        academicsData.push({
          qualification: mapQualification(ac.qualification),
          schoolInstitute: ac.schoolInstitute,
          boardUniversity: ac.boardUniversity,
          startYear: ac.startYear,
          endYear: ac.endYear,
          passingDivision: ac.passingDivision,
          passingMarks: ac.passingMarks,
          subject: ac.subject,
          certificateUrl: certRes.url,
          certificatePublicId: certRes.publicId,
          certificateName: ac.certificateName,
        });
      } catch (err) {
        console.error("Academic cert upload failed:", err);
        for (const id of uploadedAssetIds) {
          await deleteAsset(id).catch(console.error);
        }
        return errorResponse(
          "UPLOAD_FAILED",
          "Failed to upload academic certificates.",
          {
            status: HTTP_2.INTERNAL_SERVER_ERROR,
          },
        );
      }
    }

        const experiencesData: Prisma.RecruitWorkExperienceCreateWithoutProfileInput[] =
      [];
    for (let i = 0; i < data.experiences.length; i++) {
      const exp = data.experiences[i];
      try {
        const certRes = await uploadBase64(
          exp.certBase64,
          "recruit/experience",
          `exp-${userId}-${i}`,
        );
        uploadedAssetIds.push(certRes.publicId);
        experiencesData.push({
          employerName: exp.employerName,
          designation: exp.designation,
          postingLocation: exp.postingLocation,
          startDate: exp.startDate,
          endDate: exp.endDate || null,
          natureOfWork: exp.natureOfWork,
          experienceYears: exp.experienceYears,
          certUrl: certRes.url,
          certPublicId: certRes.publicId,
          certName: exp.certName,
        });
      } catch (err) {
        console.error("Experience cert upload failed:", err);
        for (const id of uploadedAssetIds) {
          await deleteAsset(id).catch(console.error);
        }
        return errorResponse(
          "UPLOAD_FAILED",
          "Failed to upload work experience certificates.",
          {
            status: HTTP_2.INTERNAL_SERVER_ERROR,
          },
        );
      }
    }

        const profile = await prisma.$transaction(
      async (tx) => {
        return tx.recruitProfile.create({
          data: {
            userId,
            fullName: data.fullName,
            gender: data.gender,
            dob: data.dob,
            fatherName: data.fatherName,
            motherName: data.motherName,
            permAddressLocal: data.permanentAddress.local,
            permAddressDistrict: data.permanentAddress.district,
            permAddressState: data.permanentAddress.state,
            permAddressCountry: data.permanentAddress.country,
            permAddressPinCode: data.permanentAddress.pinCode,
            currAddressLocal: data.localAddress.local,
            currAddressDistrict: data.localAddress.district,
            currAddressState: data.localAddress.state,
            currAddressCountry: data.localAddress.country,
            currAddressPinCode: data.localAddress.pinCode,
            mobileNo: data.mobileNo,
            email: data.email,
            maritalStatus: data.maritalStatus,
            nationality: data.nationality,
            gotra: data.gotra || null,
            religion: mapReligion(data.religion),
            category: data.category,
            bloodGroup: mapBloodGroup(data.bloodGroup),
            hobby: data.hobby || null,
            languagesKnown: data.languagesKnown,
            physicallyChallenged: data.physicallyChallenged === "Yes",
            aadharNo: data.aadharNo || null,

            photoUrl,
            photoPublicId,
            photoName: data.photoName,
            signatureUrl: sigUrl,
            signaturePublicId: sigPublicId,
            signatureName: data.signatureName,
            resumeUrl,
            resumePublicId,
            resumeName: data.resumeName,

            academics: {
              create: academicsData,
            },
            experiences: {
              create: experiencesData,
            },
          },
          include: {
            academics: true,
            experiences: true,
          },
        });
      },
      {
        timeout: 30000,
      },
    );

    return successResponse(profile, {
      message: "Recruiter profile registration successful.",
      status: HTTP_2.CREATED,
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

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  const uploadedAssetIds: string[] = [];

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "RECRUIT_USER") {
      return errorResponse(
        "UNAUTHORIZED",
        "Recruit User credentials required.",
        { status: HTTP_2.UNAUTHORIZED },
      );
    }

    const existing = await prisma.recruitProfile.findUnique({
      where: { userId },
    });
    if (!existing) {
      return errorResponse(
        "NOT_FOUND",
        "No profile to update. Submit your registration first.",
        { status: HTTP_2.NOT_FOUND },
      );
    }

    const body = await request.json();
    const data = updateRecruitRegistrationSchema.parse(body);

    const updateData: Prisma.RecruitProfileUpdateInput = {
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
      gotra: data.gotra || undefined,
                  religion: data.religion ? mapReligion(data.religion) : undefined,
      category: data.category,
      bloodGroup: data.bloodGroup ? mapBloodGroup(data.bloodGroup) : undefined,
      hobby: data.hobby || undefined,
      languagesKnown: data.languagesKnown,
      physicallyChallenged:
        data.physicallyChallenged !== undefined
          ? data.physicallyChallenged === "Yes"
          : undefined,
      aadharNo: data.aadharNo || undefined,
    };

    for (const key of Object.keys(updateData)) {
      if (updateData[key as keyof typeof updateData] === undefined) {
        delete updateData[key as keyof typeof updateData];
      }
    }

            let academicsData:
      Prisma.RecruitAcademicDetailCreateWithoutProfileInput[] | null = null;
    if (data.academics) {
      academicsData = [];
      for (let i = 0; i < data.academics.length; i++) {
        const ac = data.academics[i];
        let certificateUrl =
          (ac as { certificateUrl?: string }).certificateUrl ?? "";
        let certificatePublicId = "";
        if (ac.certificateBase64) {
          try {
            const certRes = await uploadBase64(
              ac.certificateBase64,
              "recruit/academics",
              `acad-${userId}-${i}`,
            );
            uploadedAssetIds.push(certRes.publicId);
            certificateUrl = certRes.url;
            certificatePublicId = certRes.publicId;
          } catch (err) {
            console.error("Academic cert upload failed:", err);
            for (const id of uploadedAssetIds) {
              await deleteAsset(id).catch(console.error);
            }
            return errorResponse(
              "UPLOAD_FAILED",
              "Failed to upload academic certificates.",
              { status: HTTP_2.INTERNAL_SERVER_ERROR },
            );
          }
        }
        academicsData.push({
          qualification: mapQualification(ac.qualification),
          schoolInstitute: ac.schoolInstitute,
          boardUniversity: ac.boardUniversity,
          startYear: ac.startYear,
          endYear: ac.endYear,
          passingDivision: ac.passingDivision,
          passingMarks: ac.passingMarks,
          subject: ac.subject,
          certificateUrl,
          certificatePublicId,
          certificateName: ac.certificateName,
        });
      }
    }

    let experiencesData:
      Prisma.RecruitWorkExperienceCreateWithoutProfileInput[] | null = null;
    if (data.experiences) {
      experiencesData = [];
      for (let i = 0; i < data.experiences.length; i++) {
        const exp = data.experiences[i];
        let certUrl = (exp as { certUrl?: string }).certUrl ?? "";
        let certPublicId = "";
        if (exp.certBase64) {
          try {
            const certRes = await uploadBase64(
              exp.certBase64,
              "recruit/experience",
              `exp-${userId}-${i}`,
            );
            uploadedAssetIds.push(certRes.publicId);
            certUrl = certRes.url;
            certPublicId = certRes.publicId;
          } catch (err) {
            console.error("Experience cert upload failed:", err);
            for (const id of uploadedAssetIds) {
              await deleteAsset(id).catch(console.error);
            }
            return errorResponse(
              "UPLOAD_FAILED",
              "Failed to upload work experience certificates.",
              { status: HTTP_2.INTERNAL_SERVER_ERROR },
            );
          }
        }
        experiencesData.push({
          employerName: exp.employerName,
          designation: exp.designation,
          postingLocation: exp.postingLocation,
          startDate: exp.startDate,
          endDate: exp.endDate || null,
          natureOfWork: exp.natureOfWork,
          experienceYears: exp.experienceYears,
          certUrl,
          certPublicId,
          certName: exp.certName,
        });
      }
    }

    const updated = await prisma.$transaction(
      async (tx) => {
        if (academicsData) {
          await tx.recruitAcademicDetail.deleteMany({
            where: { profileId: existing.id },
          });
          if (academicsData.length > 0) {
            await tx.recruitAcademicDetail.createMany({
              data: academicsData.map((ac) => ({
                ...ac,
                profileId: existing.id,
              })),
            });
          }
        }

        if (experiencesData) {
          await tx.recruitWorkExperience.deleteMany({
            where: { profileId: existing.id },
          });
          if (experiencesData.length > 0) {
            await tx.recruitWorkExperience.createMany({
              data: experiencesData.map((exp) => ({
                ...exp,
                profileId: existing.id,
              })),
            });
          }
        }

        return tx.recruitProfile.update({
          where: { id: existing.id },
          data: updateData,
          include: { academics: true, experiences: true },
        });
      },
      {
        timeout: 30000,
      },
    );

    return successResponse(updated, {
      message: "Profile updated successfully.",
    });
  } catch (error) {
    for (const id of uploadedAssetIds) {
      await deleteAsset(id).catch(console.error);
    }
    if (error instanceof ZodError) {
      return errorResponse("VALIDATION_ERROR", "Request validation failed", {
        status: HTTP_2.UNPROCESSABLE,
        details: error.flatten().fieldErrors,
      });
    }
    return handleError(error);
  }
}
