import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

function buildPaginationMeta(
  total: number,
  page: number,
  limit: number,
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
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

function parsePaginationParams(searchParams: URLSearchParams): {
  page: number;
  limit: number;
  skip: number;
} {
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)),
  );
  return { page, limit, skip: (page - 1) * limit };
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "RECRUIT_USER") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Recruit User privileges required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const { searchParams } = request.nextUrl;
    const { page, limit, skip } = parsePaginationParams(searchParams);

    const [applications, total] = await Promise.all([
      prisma.jobApplication.findMany({
        where: { userId, deletedAt: null },
        include: {
          jobOpportunity: {
            select: {
              id: true,
              companyName: true,
              postOpportunity: true,
              jobNature: true,
              logoUrl: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.jobApplication.count({
        where: { userId, deletedAt: null },
      }),
    ]);

    const meta = buildPaginationMeta(total, page, limit);

    return successResponse(applications, { meta });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    const body = await request.json();
    const { jobOpportunityId } = body;

    if (!jobOpportunityId) {
      return errorResponse("BAD_REQUEST", "jobOpportunityId is required.", {
        status: HTTP_2.BAD_REQUEST,
      });
    }

        const existingApp = await prisma.jobApplication.findFirst({
      where: { jobOpportunityId, userId, deletedAt: null },
    });

    if (existingApp) {
      return errorResponse(
        "ALREADY_APPLIED",
        "You have already applied for this opening.",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

        const profile = await prisma.recruitProfile.findUnique({
      where: { userId },
      include: { academics: true },
    });

    if (!profile) {
      return errorResponse(
        "PROFILE_REQUIRED",
        "Please complete your registration profile before applying.",
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

        const birthDate = new Date(profile.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const highestQual =
      profile.academics.map((a) => a.qualification).join(", ") || "N/A";

        const jobApp = await prisma.jobApplication.create({
      data: {
        jobOpportunityId,
        userId,
        name: profile.fullName,
        age,
        address: `${profile.currAddressLocal}, ${profile.currAddressDistrict}, ${profile.currAddressState}`,
        mobile: profile.mobileNo,
        email: profile.email,
        qualification: highestQual,
        skills: profile.languagesKnown,
        resumeUrl: profile.resumeUrl,
        resumePublicId: profile.resumePublicId,
        status: "PENDING",
      },
    });

    return successResponse(jobApp, {
      message: "Applied successfully!",
      status: HTTP_2.CREATED,
    });
  } catch (error) {
    return handleError(error);
  }
}
