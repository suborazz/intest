import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
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

export const dynamic = "force-dynamic";

function deriveStudentStatus(qualification: string): "PURSUING" | "PASS_OUT" {
  const passOutQuals = [
    "GRADUATE_PASS_OUT",
    "POST_GRADUATE_PASS_OUT",
    "MPHIL_PASS_OUT",
    "PHD_PASS_OUT",
  ];
  return passOutQuals.includes(qualification) ? "PASS_OUT" : "PURSUING";
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || (userRole !== "IMMERSION_USER" && userRole !== "STUDENT")) {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const applications = await prisma.immersionApplication.findMany({
      where: { userId },
      include: {
        academicDetails: { orderBy: { createdAt: "asc" } },
        immersion: {
          select: {
            id: true,
            title: true,
            location: true,
            startDate: true,
            endDate: true,
          },
        },
        assignedMentor: { select: { id: true, name: true, email: true } },
      },
    });

    return successResponse(applications);
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

    const body: unknown = await request.json();
    const parsed = immersionApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid application details.", {
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

    const existing = await prisma.immersionApplication.findFirst({
      where: { userId, immersionId: immersionId ?? undefined },
      orderBy: { createdAt: "desc" },
    });

    if (!existing) {
      return errorResponse(
        "NOT_FOUND",
        "Initial application not found. Please complete the onboarding first.",
        {
          status: HTTP_2.NOT_FOUND,
        },
      );
    }

        if (existing.status === "DRAFT") {
      return errorResponse(
        "PAYMENT_REQUIRED",
        "Please complete the application payment before updating details.",
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

        const updated = await prisma.immersionApplication.update({
      where: { id: existing.id },
      data: {
        immersionId: immersionId ?? existing.immersionId,
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
        academicDetails: {
          deleteMany: {},
          create: academicDetails.map((d) => ({
            qualification: d.qualification,
            stream: d.stream,
            subject: d.subject,
            instituteName: d.instituteName,
            universityName: d.universityName,
            sessionYear: d.sessionYear,
            gradeDivision: d.gradeDivision,
            studentStatus: deriveStudentStatus(d.qualification),
          })),
        },
      },
      include: { academicDetails: true },
    });

    return successResponse(updated, {
      message: "Application details updated successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
