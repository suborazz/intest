import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import * as z from "zod";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
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

const ZCreateOnCampusVirtual = z.object({
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  type: z.literal("FREE").default("FREE"),
  category: z.enum(["ON_CAMPUS", "VIRTUAL"]),
  description: z.string().min(1, "Description is required"),
  department: z.string().optional(),
  project: z.string().optional(),
  modules: z.union([z.string(), z.array(z.string())]).optional(), 
  tools: z.union([z.string(), z.array(z.string())]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = ZCreateOnCampusVirtual.parse(body);

    const firstUser = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" },
      select: { id: true },
    });

    const superAdminId = firstUser?.id || "admin-default";

    const newInternship = await prisma.internship.create({
      data: {
        title: validatedData.title,
        duration: validatedData.duration,
        type: "FREE",
        category: validatedData.category as "ON_CAMPUS" | "VIRTUAL" | "RUNNING",
        description: validatedData.description,
        department: validatedData.department || null,
        projectFocus: validatedData.project || null,
        modules: Array.isArray(validatedData.modules)
          ? validatedData.modules
          : typeof validatedData.modules === "string"
            ? validatedData.modules
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
        tools: Array.isArray(validatedData.tools)
          ? validatedData.tools
          : typeof validatedData.tools === "string"
            ? validatedData.tools
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
        companyName: "IIIT Center of Excellence",
        location:
          validatedData.category === "VIRTUAL"
            ? "Virtual / Online"
            : "On Campus",
        mode: validatedData.category === "VIRTUAL" ? "ONLINE" : "OFFLINE",
        isApproved: true,
        isActive: true,
        createdById: superAdminId,
      },
    });

    const formattedCode = formatInternshipCode(
      newInternship.id,
      newInternship.companyName,
    );
    const updatedInternship = await prisma.internship.update({
      where: { id: newInternship.id },
      data: { code: formattedCode },
    });

    return successResponse(updatedInternship, {
      message: "Internship created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryParam = searchParams.get("category");

    const where: Prisma.InternshipWhereInput = {
      category: {
        in: ["ON_CAMPUS", "VIRTUAL"],
      },
      deletedAt: null,
    };

    if (categoryParam === "ON_CAMPUS" || categoryParam === "VIRTUAL") {
      where.category = categoryParam;
    }

    const internships = await prisma.internship.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { interests: true },
        },
        createdBy: {
          select: { id: true, name: true, email: true, role: true },
        },
        instructor: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return successResponse(internships);
  } catch (error) {
    return handleError(error);
  }
}
