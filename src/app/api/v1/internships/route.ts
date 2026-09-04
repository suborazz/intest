import { Prisma } from "@prisma/client";
import type {
  InternshipCategory,
  InternshipMode,
  InternshipType,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
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

const internshipModeSchema = z.enum(["ONLINE", "OFFLINE", "HYBRID"]);

const internshipTypeSchema = z.enum(["PAID", "STIPEND", "FREE"]);

const internshipCategorySchema = z.enum([
  "RUNNING",
  "ON_CAMPUS",
  "VIRTUAL",
]);

const createInternshipSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  companyName: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  mode: internshipModeSchema.default("OFFLINE"),
  type: internshipTypeSchema,
  category: internshipCategorySchema.default("RUNNING"),
  department: z.string().optional().nullable(),
  modules: z.array(z.string()).optional(),
  projectFocus: z.string().optional().nullable(),
  tools: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  credits: z.string().optional().nullable(),
  qualification: z.string().optional().nullable(),
  timePeriod: z.string().optional().nullable(),
  facilities: z.string().optional().nullable(),
  careerOpportunity: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  organizer: z.string().optional().nullable(),
  lastDate: z.coerce.date().optional().nullable(),
  price: z.number().nonnegative().optional().nullable(),
  stipendAmount: z.number().nonnegative().optional().nullable(),
  duration: z.string().min(1, "Duration is required"),
  startDate: z.coerce.date().optional(),
  onboardingDetails: z.string().optional(),
  instructorId: z.string().cuid("Invalid Instructor ID").optional().nullable(),
});

const listInternshipsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  type: internshipTypeSchema.optional(),
  mode: internshipModeSchema.optional(),
  category: internshipCategorySchema.optional(),
  search: z.string().optional(),
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

function formatInternshipCode(
  code?: string | null,
  companyName?: string | null,
): string {
  if (!code) return "IN2026XX10001";

  const trimmed = code.trim();
  if (/^IN\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const sourceText = companyName && companyName.trim() ? companyName : trimmed;
  const words = sourceText
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  let initials = "HT";
  if (words.length === 1 && words[0]!.length >= 2) {
    initials = words[0]!.slice(0, 2).toUpperCase();
  } else if (words.length >= 2) {
    initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
  }

  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (hash * 31 + trimmed.charCodeAt(i)) % 2147483647;
  }
  const numericSuffix = (Math.abs(hash) % 90000) + 10000;

  return `IN2026${initials}${numericSuffix}`;
}

function generateInternshipId(companyName: string): string {
  const year = new Date().getFullYear();

  const words = companyName.trim().split(/\s+/).filter(Boolean);
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
  return `IN${year}${initials}${random}`;
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = request.nextUrl;

    const parsed = listInternshipsQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      mode: searchParams.get("mode") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      search: searchParams.get("search") ?? undefined,
    });

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid query parameters", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { page, limit, type, mode, category, search } = parsed.data;
    const skip = (page - 1) * limit;

    const requesterRole = request.headers.get("X-User-Role");

    const where: Prisma.InternshipWhereInput = {
      deletedAt: null,
      createdBy: { deletedAt: null },
    };

    if (requesterRole !== "SUPER_ADMIN") {
      where.isActive = true;
      where.isApproved = true;
    }
    if (type) where.type = type as InternshipType;
    if (mode) where.mode = mode as InternshipMode;
    if (category) where.category = category as InternshipCategory;
    if (search) {
      const cleanedSearch = search
        .replace(/^internship id\s*:\s*/i, "")
        .replace(/^immersion program id\s*:\s*/i, "")
        .replace(/^program id\s*:\s*/i, "")
        .replace(/^application id\s*:\s*/i, "")
        .trim();
      where.OR = [
        { id: { contains: cleanedSearch, mode: "insensitive" } },
        { code: { contains: cleanedSearch, mode: "insensitive" } },
        { title: { contains: cleanedSearch, mode: "insensitive" } },
        { companyName: { contains: cleanedSearch, mode: "insensitive" } },
        { location: { contains: cleanedSearch, mode: "insensitive" } },
      ];
    }

    const [internships, total] = await Promise.all([
      prisma.internship.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          companyName: true,
          location: true,
          type: true,
          mode: true,
          category: true,
          department: true,
          modules: true,
          projectFocus: true,
          tools: true,
          skills: true,
          credits: true,
          qualification: true,
          timePeriod: true,
          facilities: true,
          careerOpportunity: true,
          contact: true,
          organizer: true,
          lastDate: true,
          price: true,
          stipendAmount: true,
          duration: true,
          isActive: true,
          isApproved: true,
          approvedAt: true,
          startDate: true,
          createdAt: true,
          updatedAt: true,
          instructor: {
            select: { id: true, name: true },
          },
          createdBy: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.internship.count({ where }),
    ]);

    const meta = buildPaginationMeta(total, page, limit);

    return successResponse(internships, { meta });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (
      !requesterId ||
      (requesterRole !== "SUPER_ADMIN" && requesterRole !== "INSTRUCTOR")
    ) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Only Super Admin or Instructors can post internships.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const body: unknown = await request.json();
    const parsed = createInternshipSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;

        if (
      data.type === "PAID" &&
      (data.price === undefined || data.price === null || data.price <= 0)
    ) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Price is required and must be greater than 0 for PAID internships.",
        {
          status: HTTP_2.UNPROCESSABLE,
          details: { price: ["Price must be greater than 0 for PAID type."] },
        },
      );
    }

    if (
      data.type === "STIPEND" &&
      (data.stipendAmount === undefined ||
        data.stipendAmount === null ||
        data.stipendAmount <= 0)
    ) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Stipend amount is required and must be greater than 0 for STIPEND internships.",
        {
          status: HTTP_2.UNPROCESSABLE,
          details: {
            stipendAmount: [
              "Stipend amount must be greater than 0 for STIPEND type.",
            ],
          },
        },
      );
    }

        if (data.instructorId) {
      const instructor = await prisma.user.findFirst({
        where: {
          id: data.instructorId,
          role: "INSTRUCTOR",
          deletedAt: null,
          instructorProfile: { isApproved: true },
        },
      });

      if (!instructor) {
        return errorResponse(
          "VALIDATION_ERROR",
          "The specified instructor does not exist, is not a instructor (INSTRUCTOR), or is not yet verified/approved by Super Admin.",
          {
            status: HTTP_2.UNPROCESSABLE,
            details: {
              instructorId: [
                "Invalid instructor selected. Must be a verified/approved INSTRUCTOR.",
              ],
            },
          },
        );
      }
    }

        const finalPrice = data.type === "PAID" ? (data.price ?? null) : null;
    const finalStipend =
      data.type === "STIPEND" ? (data.stipendAmount ?? null) : null;

    const isInstructor = requesterRole === "INSTRUCTOR";
    const assignedInstructorId = isInstructor
      ? requesterId
      : (data.instructorId ?? null);
    const approvedStatus = !isInstructor; 
    const activeStatus = !isInstructor; 

        const finalCategory = isInstructor
      ? "RUNNING"
      : (data.category ?? "RUNNING");

    const internship = await prisma.internship.create({
      data: {
        title: data.title,
        description: data.description,
        companyName: data.companyName,
        location: data.location,
        mode: (data.mode ?? "OFFLINE") as InternshipMode,
        type: data.type as InternshipType,
        category: finalCategory as InternshipCategory,
        department: data.department ?? null,
        modules: data.modules ?? [],
        projectFocus: data.projectFocus ?? null,
        tools: data.tools ?? [],
        skills: data.skills ?? [],
        credits: data.credits ?? null,
        qualification: data.qualification ?? null,
        timePeriod: data.timePeriod ?? null,
        facilities: data.facilities ?? null,
        careerOpportunity: data.careerOpportunity ?? null,
        contact: data.contact ?? null,
        organizer: data.organizer ?? null,
        lastDate: data.lastDate ?? null,
        price: finalPrice,
        stipendAmount: finalStipend,
        duration: data.duration,
        startDate: data.startDate ?? null,
        onboardingDetails: data.onboardingDetails ?? null,
        createdById: requesterId,
        instructorId: assignedInstructorId,
        isApproved: approvedStatus,
        isActive: activeStatus,
      },
    });

    const formattedCode = formatInternshipCode(
      internship.id,
      internship.companyName,
    );
    const updatedInternship = await prisma.internship.update({
      where: { id: internship.id },
      data: { code: formattedCode },
    });

        if (isInstructor) {
      (async () => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: requesterId },
            select: { email: true, name: true },
          });
          if (user) {
            const { sendInternshipPostingSubmittedForReviewEmail } =
              await import("@/x/b7e0f2d7");
            await sendInternshipPostingSubmittedForReviewEmail(
              user.email,
              user.name || "Instructor",
              data.title,
            );
          }
        } catch (err) {
          console.error(
            "[EMAIL ERROR] Failed to send internship review submission email:",
            err,
          );
        }
      })();
    }

    const successMessage = isInstructor
      ? "Internship submitted successfully. Awaiting Super Admin approval."
      : "Internship posted successfully.";

    return successResponse(updatedInternship, {
      status: HTTP_2.CREATED,
      message: successMessage,
    });
  } catch (error) {
    return handleError(error);
  }
}
