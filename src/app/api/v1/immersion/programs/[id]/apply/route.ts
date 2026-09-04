import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
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

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (userRole !== "IMMERSION_USER" && userRole !== "STUDENT") {
      return errorResponse(
        "FORBIDDEN",
        "Only immersion participants and students can apply to immersion programs.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const { id: immersionId } = await params;

    const program = await prisma.immersion.findUnique({
      where: { id: immersionId },
    });

    if (!program) {
      return errorResponse("NOT_FOUND", "Immersion program not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const existing = await prisma.immersionApplication.findFirst({
      where: { userId, immersionId },
    });

    if (existing) {
            return successResponse(existing, {
        message: "You have already applied to this program.",
      });
    }

    const generalApp = await prisma.immersionApplication.findFirst({
      where: { userId, immersionId: null },
      include: { academicDetails: true },
    });

    const isPaid = program.fees && program.fees > 0;
    const application = await prisma.immersionApplication.create({
      data: {
        userId,
        immersionId,
        status: isPaid ? "DRAFT" : "SUBMITTED",
        submittedAt: isPaid ? null : new Date(),
        preferredDuration: generalApp?.preferredDuration,
        customDuration: generalApp?.customDuration,
        preferredLocation: generalApp?.preferredLocation,
        preferredStartDate: generalApp?.preferredStartDate,
        expectedLearning: generalApp?.expectedLearning,
        careerGoal: generalApp?.careerGoal,
        specialTalentSkill: generalApp?.specialTalentSkill,
        languagesKnown: generalApp?.languagesKnown,
        presenceType: generalApp?.presenceType,
        fieldVisitsComfort: generalApp?.fieldVisitsComfort,
        workType: generalApp?.workType,
        emergencyContactName: generalApp?.emergencyContactName,
        emergencyRelationship: generalApp?.emergencyRelationship,
        emergencyMobile: generalApp?.emergencyMobile,
        declarationAccepted: generalApp?.declarationAccepted ?? false,
        rulesAccepted: generalApp?.rulesAccepted ?? false,
        academicDetails: generalApp?.academicDetails?.length
          ? {
              create: generalApp.academicDetails.map((ac) => ({
                qualification: ac.qualification,
                stream: ac.stream,
                subject: ac.subject,
                instituteName: ac.instituteName,
                universityName: ac.universityName,
                sessionYear: ac.sessionYear,
                gradeDivision: ac.gradeDivision,
                studentStatus: ac.studentStatus,
              })),
            }
          : undefined,
      },
      include: { academicDetails: true },
    });

    const appCode = generateApplicationCode(
      application.id,
      application.createdAt,
    );
    const finalApplication = await prisma.immersionApplication.update({
      where: { id: application.id },
      data: { code: appCode },
      include: { academicDetails: true },
    });

    return successResponse(finalApplication, {
      status: HTTP_2.CREATED,
      message: "Applied to immersion program successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
