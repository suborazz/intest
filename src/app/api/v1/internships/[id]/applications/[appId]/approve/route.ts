import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
import { issueIdCard } from "@/x/c6f69c52";

export const dynamic = "force-dynamic";

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
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

function validationErrorResponse(error: ZodError): NextResponse<ApiErrorResponse> {
  return errorResponse("VALIDATION_ERROR", "Request validation failed", {
    status: HTTP.UNPROCESSABLE,
    details: error.flatten().fieldErrors,
  });
}

function handleError(error: unknown): NextResponse<ApiErrorResponse> {
  console.error("[API Error in approve application]", error);

  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  if (error instanceof Error) {
    let message = error.message;

    // Prisma-specific human friendly error mapping
    const prismaError = error as { code?: string; meta?: any };
    if (prismaError.code === "P2002") {
      message = "A unique constraint conflict occurred while assigning enrollment.";
    } else if (prismaError.code === "P2003") {
      message = "A referenced record (user or internship) was not found.";
    } else if (prismaError.code === "P2025") {
      message = "Application record was not found or already modified.";
    }

    return errorResponse("INTERNAL_SERVER_ERROR", message, {
      status: HTTP.INTERNAL_SERVER_ERROR,
    });
  }

  return errorResponse("UNKNOWN_ERROR", "An unexpected error occurred", {
    status: HTTP.INTERNAL_SERVER_ERROR,
  });
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

const approveApplicationSchema = z.object({
  reviewNote: z.string().max(500).optional(),
});

interface RouteContext {
  params: Promise<{ id: string; appId: string }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP.UNAUTHORIZED,
      });
    }

    const { id: internshipId, appId } = await params;

    // 1. Fetch the application with internship and student details
    const application = await prisma.internshipApplication.findFirst({
      where: { id: appId, internshipId },
      include: {
        internship: true,
        student: { select: { id: true, name: true, email: true } },
      },
    });

    if (!application) {
      return errorResponse("APPLICATION_NOT_FOUND", "Application not found.", {
        status: HTTP.NOT_FOUND,
      });
    }

    // 2. Role-based access control
    const normalizedRole = requesterRole?.toUpperCase();
    const hasAccess =
      normalizedRole === "SUPER_ADMIN" ||
      (normalizedRole === "INSTRUCTOR" &&
        (application.internship.instructorId === requesterId ||
          application.internship.createdById === requesterId));

    if (!hasAccess) {
      return errorResponse(
        "FORBIDDEN",
        "Only the assigned instructor or admin can approve applications.",
        {
          status: HTTP.FORBIDDEN,
        },
      );
    }

    // 3. Idempotent check: if already approved, return success without failing
    if (application.status === "APPROVED") {
      return successResponse(application, {
        message: "Application is already approved.",
      });
    }

    // 4. Verify student existence
    if (!application.studentId) {
      return errorResponse("INVALID_STUDENT", "Application is missing student ID.", {
        status: HTTP.BAD_REQUEST,
      });
    }

    const studentUser = await prisma.user.findUnique({
      where: { id: application.studentId },
      select: { id: true, email: true, name: true },
    });

    if (!studentUser) {
      return errorResponse(
        "STUDENT_NOT_FOUND",
        "The student account associated with this application does not exist.",
        { status: HTTP.NOT_FOUND },
      );
    }

    // 5. Parse review note safely
    const body: unknown = await request.json().catch(() => ({}));
    const parsed = approveApplicationSchema.safeParse(body);
    const reviewNote = parsed.success ? (parsed.data.reviewNote ?? null) : null;

    // 6. Verify reviewer user ID exists to prevent foreign key violation (P2003)
    let validReviewerId: string | null = null;
    if (requesterId) {
      const reviewer = await prisma.user.findUnique({
        where: { id: requesterId },
        select: { id: true },
      });
      if (reviewer) {
        validReviewerId = reviewer.id;
      } else {
        console.warn(
          `[Approve Application] Requester ID ${requesterId} not found in User table. Setting reviewedById to null.`,
        );
      }
    }

    // 7. Atomic transaction for Enrollment creation/linkage and Application update
    const { updatedApp, enrollment } = await prisma.$transaction(
      async (tx) => {
        // A. Upsert enrollment for (userId, internshipId)
        const enr = await tx.enrollment.upsert({
          where: {
            userId_internshipId: {
              userId: application.studentId,
              internshipId: application.internshipId,
            },
          },
          update: {},
          create: {
            userId: application.studentId,
            internshipId: application.internshipId,
          },
        });

        // B. Handle unique constraint on enrollmentId:
        // If another application already points to this enrollmentId, unlink it
        const conflictingApp = await tx.internshipApplication.findUnique({
          where: { enrollmentId: enr.id },
          select: { id: true },
        });

        if (conflictingApp && conflictingApp.id !== appId) {
          await tx.internshipApplication.update({
            where: { id: conflictingApp.id },
            data: { enrollmentId: null },
          });
        }

        // C. Update application status to APPROVED
        const app = await tx.internshipApplication.update({
          where: { id: appId },
          data: {
            status: "APPROVED",
            reviewedAt: new Date(),
            reviewedById: validReviewerId,
            reviewNote,
            enrollmentId: enr.id,
          },
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                registrationNo: true,
                studentRegistration: {
                  select: {
                    studentId: true,
                    fullName: true,
                    academics: {
                      select: {
                        qualification: true,
                        stream: true,
                        subject: true,
                        instituteName: true,
                        universityName: true,
                        sessionYear: true,
                      },
                    },
                  },
                },
              },
            },
            internship: {
              select: {
                id: true,
                code: true,
                title: true,
                companyName: true,
                type: true,
                mode: true,
                duration: true,
                startDate: true,
                stipendAmount: true,
                organizer: true,
                instructor: { select: { name: true } },
              },
            },
            reviewedBy: { select: { id: true, name: true } },
          },
        });

        return { updatedApp: app, enrollment: enr };
      },
      {
        timeout: 15000,
        maxWait: 5000,
      },
    );

    // 8. Safely issue ID card (non-fatal if card creation encounters a glitch)
    try {
      await issueIdCard(application.studentId, enrollment.id);
    } catch (cardError) {
      console.warn(
        `[Approve Application] ID card generation warning for student ${application.studentId}:`,
        cardError,
      );
    }

    // 9. Generate official Offer Letter PDF and send email notification asynchronously
    if (updatedApp.student?.email) {
      (async () => {
        try {
          const { sendInternshipApplicationStatusUpdateEmail } = await import(
            "@/x/b7e0f2d7"
          );
          const {
            generateInternshipOfferLetterPDF,
            pickHighestAcademicRecord,
            formatQualificationStream,
          } = await import("@/lib/offerLetterGenerator");

          const student = updatedApp.student;
          const reg = student.studentRegistration;
          const highestAcademic = pickHighestAcademicRecord(reg?.academics);
          const internship = updatedApp.internship;

          const studentName = (
            reg?.fullName ||
            student.name ||
            "Student"
          ).trim();

          const registrationNo =
            reg?.studentId || student.registrationNo || "NA";

          const collegeName =
            highestAcademic?.instituteName || "Recognised College / Institution";
          const universityName =
            highestAcademic?.universityName || "Recognised University";
          const qualificationStream =
            formatQualificationStream(highestAcademic);
          const sessionYear =
            highestAcademic?.sessionYear || "Current Academic Session";

          let stipendText: string | null = null;
          if (
            (internship?.type === "STIPEND" ||
              (internship?.stipendAmount && internship.stipendAmount > 0)) &&
            internship?.stipendAmount
          ) {
            stipendText = `Rs. ${internship.stipendAmount.toLocaleString("en-IN")} / Month`;
          }

          const safeStudentFilename = studentName
            .replace(/[^a-zA-Z0-9_\-]/g, "_")
            .replace(/_+/g, "_")
            .trim();

          let pdfAttachment: { buffer: Buffer; filename: string } | undefined;

          try {
            const offerPdfBuffer = await generateInternshipOfferLetterPDF({
              letterRefNo:
                updatedApp.code || `APP-${updatedApp.id.slice(-6).toUpperCase()}`,
              applicationId:
                updatedApp.code || `APP-${updatedApp.id.slice(-6).toUpperCase()}`,
              offerDate: new Date(),
              studentName,
              registrationNo,
              collegeName,
              universityName,
              qualificationStream,
              sessionYear,
              internshipId: internship?.code || "i3-INT-2026",
              internshipTitle: internship?.title || "Internship Program",
              duration: internship?.duration || "120 Hours",
              mode: internship?.mode || "Online",
              startDate: internship?.startDate || null,
              endDate: null,
              coordinator:
                internship?.instructor?.name ||
                internship?.organizer ||
                "Dr. Avishek Kumar",
              stipend: stipendText,
              verificationUrl: `https://www.iiinternship.in/student/dashboard`,
            });

            if (offerPdfBuffer && Buffer.isBuffer(offerPdfBuffer)) {
              pdfAttachment = {
                buffer: offerPdfBuffer,
                filename: `${safeStudentFilename}_Internship_Offer_Letter.pdf`,
              };
            }
          } catch (pdfErr) {
            console.error("[Offer Letter Generation Failed]", pdfErr);
          }

          await sendInternshipApplicationStatusUpdateEmail(
            student.email,
            studentName,
            internship?.title || "Internship Program",
            "APPROVED",
            pdfAttachment,
          );
        } catch (err) {
          console.error(
            "[EMAIL ERROR] Failed to send internship application approval email:",
            err,
          );
        }
      })();
    }

    return successResponse(updatedApp, {
      message: "Application approved. Enrollment & ID Card processed successfully.",
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  return PATCH(request, context);
}
