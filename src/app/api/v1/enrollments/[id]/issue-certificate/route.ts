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

    async function generateCertificateNo(): Promise<string> {
      const year = new Date().getFullYear();
      const prefix = `CERT-${year}-`;

      const last = await prisma.certificate.findFirst({
        where: { certificateNo: { startsWith: prefix } },
        orderBy: { certificateNo: "desc" },
      });

      if (!last) {
        return `${prefix}0001`;
      }

      const lastSeq = parseInt(last.certificateNo.replace(prefix, ""), 10);
      const nextSeq = String(lastSeq + 1).padStart(4, "0");
      return `${prefix}${nextSeq}`;
    }

  try {
    const requesterRole = request.headers.get("X-User-Role");
    const requesterId = request.headers.get("X-User-Id");

    if (
      !requesterId ||
      (requesterRole !== "SUPER_ADMIN" && requesterRole !== "INSTRUCTOR")
    ) {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id: enrollmentId } = await params;

    let enrollment = await prisma.enrollment.findFirst({
      where: { id: enrollmentId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        internship: {
          select: {
            id: true,
            title: true,
            companyName: true,
            instructorId: true,
            credits: true,
          },
        },
        certificate: true,
      },
    });

    if (!enrollment) {
      // Check if enrollmentId is an internshipInterest ID
      const interest = await prisma.internshipInterest.findUnique({
        where: { id: enrollmentId },
      });
      if (interest) {
        const user = await prisma.user.findFirst({
          where: { email: { equals: interest.email, mode: "insensitive" } },
        });
        if (user) {
          enrollment = await prisma.enrollment.findUnique({
            where: {
              userId_internshipId: {
                userId: user.id,
                internshipId: interest.internshipId,
              },
            },
            include: {
              user: { select: { id: true, name: true, email: true } },
              internship: {
                select: {
                  id: true,
                  title: true,
                  companyName: true,
                  instructorId: true,
                  credits: true,
                },
              },
              certificate: true,
            },
          });
        }
      }
    }

    if (!enrollment) {
      return errorResponse("ENROLLMENT_NOT_FOUND", "Enrollment not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    if (
      requesterRole === "INSTRUCTOR" &&
      enrollment.internship.instructorId !== requesterId
    ) {
      return errorResponse(
        "FORBIDDEN",
        "You are not the assigned instructor for this internship.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    if (enrollment.certificate) {
      return errorResponse(
        "CERTIFICATE_ALREADY_ISSUED",
        "A certificate has already been issued for this enrollment.",
        {
          status: HTTP_2.CONFLICT,
        },
      );
    }

    // Enforce that student has submitted project work and has received an evaluated grade
    const submissions = await prisma.projectSubmission.findMany({
      where: { enrollmentId: enrollment.id },
      orderBy: { createdAt: "desc" },
    });

    if (submissions.length === 0) {
      return errorResponse(
        "SUBMISSION_REQUIRED",
        "Cannot issue certificate: The student has not submitted any project work yet. Project submission and evaluation are required before issuing a certificate.",
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

    const gradedSubmission = submissions.find(
      (s) =>
        s.status === "GRADED" &&
        typeof s.grade === "string" &&
        s.grade.trim() !== "",
    );

    if (!gradedSubmission) {
      return errorResponse(
        "GRADE_REQUIRED",
        "Cannot issue certificate: The student's project submission must be evaluated and graded first.",
        {
          status: HTTP_2.BAD_REQUEST,
        },
      );
    }

    if (!enrollment.completedAt) {
      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: { completedAt: new Date() },
      });
    }

    const body = await request.json().catch(() => ({}));
    const signatureUrl =
      typeof body?.signatureUrl === "string" ? body.signatureUrl : null;
    const bodyGrade =
      typeof body?.grade === "string" && body.grade.trim()
        ? body.grade.trim()
        : null;

    // Use student's evaluated submission grade or explicitly validated grade
    const finalGrade = bodyGrade || gradedSubmission.grade;

    const credits =
      typeof body?.credits === "string" && body.credits.trim()
        ? body.credits.trim()
        : enrollment.internship.credits || null;

    const certificateNo = await generateCertificateNo();

    const certificate = await prisma.certificate.create({
      data: {
        certificateNo,
        studentId: enrollment.userId,
        internshipId: enrollment.internshipId,
        enrollmentId: enrollment.id,
        issuedById: requesterId,
        signatureUrl: signatureUrl || undefined,
        grade: finalGrade || undefined,
        credits: credits || undefined,
      },
      include: {
        student: { select: { id: true, name: true, email: true } },
        internship: { select: { id: true, title: true, companyName: true } },
        issuedBy: { select: { id: true, name: true } },
      },
    });

        const { sendCertificateIssuedEmail } = await import("@/x/b7e0f2d7");
    sendCertificateIssuedEmail(
      certificate.student.email,
      certificate.student.name || "",
      certificate.internship.title,
      certificateNo,
    ).catch((err) =>
      console.error(
        "[EMAIL ERROR] Failed to send certificate issued email:",
        err,
      ),
    );

    return successResponse(certificate, {
      status: HTTP_2.CREATED,
      message: `Certificate ${certificateNo} issued successfully.`,
    });
  } catch (error) {
    return handleError(error);
  }
}
