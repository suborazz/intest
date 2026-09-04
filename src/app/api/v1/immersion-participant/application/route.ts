import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    const immersionAcademicDetailSchema = z.object({
      qualification: z.enum([
        "MATRICULATION",
        "INTERMEDIATE",
        "UNDER_GRADUATE",
        "GRADUATE_PASS_OUT",
        "UNDER_POST_GRADUATE",
        "POST_GRADUATE_PASS_OUT",
        "UNDER_MPHIL",
        "MPHIL_PASS_OUT",
        "UNDER_PHD",
        "PHD_PASS_OUT",
      ]),
      stream: z.string().min(1, "Stream is required").trim(),
      subject: z.string().min(1, "Subject is required").trim(),
      instituteName: z.string().min(2, "Institute name is required").trim(),
      universityName: z.string().min(2, "University name is required").trim(),
      sessionYear: z.string().min(4, "Session/Year is required").trim(),
      gradeDivision: z.string().min(1, "Grade/Division is required").trim(),
      });

    const immersionApplicationSchema = z.object({
        academicDetails: z
        .array(immersionAcademicDetailSchema)
        .min(1, "At least one academic detail is required"),

        preferredDuration: z.enum([
        "DAYS_7",
        "DAYS_15",
        "DAYS_30",
        "DAYS_45",
        "DAYS_60",
        "DAYS_90",
        "CUSTOM",
      ]),
      customDuration: z.string().optional(),
      preferredLocation: z.string().optional(),
      preferredStartDate: z.coerce.date().optional(),

        expectedLearning: z
        .string()
        .min(10, "Please describe what you expect to learn")
        .trim(),
      careerGoal: z.string().optional(),
      specialTalentSkill: z.string().optional(),
      languagesKnown: z.string().min(1, "Languages known is required").trim(),

        presenceType: z.enum(["FULL_TIME", "PART_TIME", "HYBRID"]),
      fieldVisitsComfort: z.boolean(),
      workType: z.enum([
        "GOVT_JOB",
        "NGO_JOB",
        "SOCIAL_WORK",
        "STUDENT",
        "RESEARCHER",
        "OTHER",
      ]),

        emergencyContactName: z.string().optional().default(""),
      emergencyRelationship: z.string().optional().default(""),
      emergencyMobile: z.string().optional().default(""),

        declarationAccepted: z.literal(true, {
        error: "Declaration must be accepted",
      }),
      rulesAccepted: z.literal(true, { error: "Rules must be accepted" }),

        immersionId: z.string().optional(),
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

    function generateApplicationCode(
      id: string,
      createdAt?: string | Date | null,
    ): string {
        const date = createdAt ? new Date(createdAt) : new Date();
      const year = String(date.getFullYear()).slice(-2);

        let hash = 0;
      for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) >>> 0; 
      }

        const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const c1 = ALPHA[hash % 26]!;
      const h2 = Math.floor(hash / 26);
      const c2 = ALPHA[h2 % 26]!;
      const h3 = Math.floor(h2 / 26);
      const c3 = ALPHA[h3 % 26]!;

        const h4 = Math.floor(h3 / 26);
      const numeric = String(10000 + (h4 % 90000)).padStart(5, "0");

      return `${year}${c1}${c2}${c3}${numeric}`;
    }

    function deriveStudentStatus(qualification: string): "PURSUING" | "PASS_OUT" {
      const passOutQuals = [
        "GRADUATE_PASS_OUT",
        "POST_GRADUATE_PASS_OUT",
        "MPHIL_PASS_OUT",
        "PHD_PASS_OUT",
      ];
      return passOutQuals.includes(qualification) ? "PASS_OUT" : "PURSUING";
    }

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || (userRole !== "IMMERSION_USER" && userRole !== "STUDENT")) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Immersion Participants only.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const body: unknown = await request.json();
    const parsed = immersionApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid application data.", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const {
      academicDetails,
      preferredDuration,
      customDuration,
      preferredLocation,
      preferredStartDate,
      expectedLearning,
      careerGoal,
      specialTalentSkill,
      languagesKnown,
      presenceType,
      fieldVisitsComfort,
      workType,
      emergencyContactName,
      emergencyRelationship,
      emergencyMobile,
      declarationAccepted,
      rulesAccepted,
      immersionId,
    } = parsed.data;

        if (immersionId) {
      const program = await prisma.immersion.findUnique({
        where: { id: immersionId },
      });
      if (!program) {
        return errorResponse(
          "NOT_FOUND",
          "Specified Immersion Program not found.",
          { status: HTTP_2.NOT_FOUND },
        );
      }
    }

        const existing = await prisma.immersionApplication.findFirst({
      where: { userId, immersionId: immersionId ?? null },
    });

    const mappedAcademics = academicDetails.map((d) => ({
      qualification: d.qualification,
      stream: d.stream,
      subject: d.subject,
      instituteName: d.instituteName,
      universityName: d.universityName,
      sessionYear: d.sessionYear,
      gradeDivision: d.gradeDivision,
      studentStatus: deriveStudentStatus(d.qualification),
    }));

    const dataPayload = {
      immersionId: immersionId ?? null,
      status: "SUBMITTED" as const, 
      preferredDuration,
      customDuration: customDuration ?? null,
      preferredLocation: preferredLocation ?? null,
      preferredStartDate: preferredStartDate ?? null,
      expectedLearning,
      careerGoal: careerGoal ?? null,
      specialTalentSkill: specialTalentSkill ?? null,
      languagesKnown,
      presenceType,
      fieldVisitsComfort,
      workType,
      emergencyContactName: emergencyContactName ?? "",
      emergencyRelationship: emergencyRelationship ?? "",
      emergencyMobile: emergencyMobile ?? "",
      declarationAccepted,
      rulesAccepted,
      submittedAt: new Date(),
    };

    let application;
    if (existing) {
      application = await prisma.immersionApplication.update({
        where: { id: existing.id },
        data: {
          ...dataPayload,
          academicDetails: {
            deleteMany: {},
            create: mappedAcademics,
          },
        },
        include: { academicDetails: true },
      });
    } else {
      application = await prisma.immersionApplication.create({
        data: {
          userId,
          ...dataPayload,
          academicDetails: {
            create: mappedAcademics,
          },
        },
        include: { academicDetails: true },
      });
    }

    if (!existing || !existing.code) {
      const appCode = generateApplicationCode(
        application.id,
        application.createdAt,
      );
      application = await prisma.immersionApplication.update({
        where: { id: application.id },
        data: { code: appCode },
        include: { academicDetails: true },
      });
    }

    return successResponse(application, {
      message: "Application submitted successfully.",
      status: HTTP_2.CREATED,
    });
  } catch (error) {
    return handleError(error);
  }
}
