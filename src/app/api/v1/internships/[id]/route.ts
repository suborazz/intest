import { Prisma } from "@prisma/client";
import type { InternshipMode, InternshipType } from "@prisma/client";
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

const updateInternshipSchema = createInternshipSchema.partial();

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

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const { id: targetId } = await params;
    const requesterId = _request.headers.get("X-User-Id");
    const requesterRole = _request.headers.get("X-User-Role");

        const where: Prisma.InternshipWhereInput = {
      id: targetId,
      deletedAt: null,
    };

    if (requesterRole !== "SUPER_ADMIN") {
      where.isActive = true;
    }

    const internship = await prisma.internship.findFirst({
      where,
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!internship) {
      return errorResponse("INTERNSHIP_NOT_FOUND", "Internship not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    let isEnrolled = false;
    if (requesterId) {
      const enrollment = await prisma.enrollment.findFirst({
        where: { userId: requesterId, internshipId: internship.id },
      });
      if (enrollment) {
        isEnrolled = true;
      }
    }

    const showSensitive = requesterRole === "SUPER_ADMIN" || isEnrolled;

    const responseData = {
      ...internship,
      onboardingDetails: showSensitive ? internship.onboardingDetails : null,
    };

    return successResponse(responseData);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (
      !requesterId ||
      (requesterRole !== "SUPER_ADMIN" && requesterRole !== "INSTRUCTOR")
    ) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator or Instructor privileges required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const { id: targetId } = await params;

        const existing = await prisma.internship.findFirst({
      where: { id: targetId, deletedAt: null },
    });

    if (!existing) {
      return errorResponse("INTERNSHIP_NOT_FOUND", "Internship not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        const isInstructor = requesterRole === "INSTRUCTOR";
    if (isInstructor && existing.createdById !== requesterId) {
      return errorResponse(
        "FORBIDDEN",
        "You do not have permission to edit this internship.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const body: unknown = await request.json();
    const parsed = updateInternshipSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid request data", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;

        const finalType = data.type ?? existing.type;
    const finalPrice = data.price !== undefined ? data.price : existing.price;
    const finalStipend =
      data.stipendAmount !== undefined
        ? data.stipendAmount
        : existing.stipendAmount;

    if (finalType === "PAID" && (finalPrice === null || finalPrice <= 0)) {
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
      finalType === "STIPEND" &&
      (finalStipend === null || finalStipend <= 0)
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

        if (data.instructorId !== undefined && data.instructorId !== null) {
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

        const updateData: Prisma.InternshipUpdateInput = {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
      ...(data.companyName !== undefined
        ? { companyName: data.companyName }
        : {}),
      ...(data.location !== undefined ? { location: data.location } : {}),
      ...(data.mode !== undefined ? { mode: data.mode as InternshipMode } : {}),
      ...(data.type !== undefined ? { type: data.type as InternshipType } : {}),
      ...(data.duration !== undefined ? { duration: data.duration } : {}),
      ...(data.startDate !== undefined ? { startDate: data.startDate } : {}),
      ...(data.onboardingDetails !== undefined
        ? { onboardingDetails: data.onboardingDetails }
        : {}),
      ...(data.instructorId !== undefined
        ? data.instructorId
          ? { instructor: { connect: { id: data.instructorId } } }
          : { instructor: { disconnect: true } }
        : {}),
    };

    if (isInstructor) {
      updateData.isApproved = false;
      updateData.isActive = false;
      updateData.instructor = { connect: { id: requesterId } }; 
    } else if (
      requesterRole === "SUPER_ADMIN" &&
      data.instructorId !== undefined &&
      data.instructorId !== existing.instructorId
    ) {
      updateData.isApproved = true;
      updateData.approvedAt = null;
      updateData.isActive = true;
    }

        if (finalType === "PAID") {
      updateData.price = finalPrice;
      updateData.stipendAmount = null;
    } else if (finalType === "STIPEND") {
      updateData.stipendAmount = finalStipend;
      updateData.price = null;
    } else {
      updateData.price = null;
      updateData.stipendAmount = null;
    }

    const updated = await prisma.internship.update({
      where: { id: targetId },
      data: updateData,
    });

    const successMsg = isInstructor
      ? "Internship updated successfully. Awaiting Super Admin re-approval."
      : "Internship updated successfully.";

    return successResponse(updated, { message: successMsg });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (
      !requesterId ||
      (requesterRole !== "SUPER_ADMIN" && requesterRole !== "INSTRUCTOR")
    ) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator or Instructor privileges required.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const { id: targetId } = await params;

        const existing = await prisma.internship.findFirst({
      where: { id: targetId, deletedAt: null },
    });

    if (!existing) {
      return errorResponse("INTERNSHIP_NOT_FOUND", "Internship not found", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        if (
      requesterRole === "INSTRUCTOR" &&
      existing.createdById !== requesterId
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You do not have permission to delete this internship.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

        await prisma.internship.update({
      where: { id: targetId },
      data: { deletedAt: new Date() },
    });

    return successResponse(null, {
      message: "Internship deleted successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}
