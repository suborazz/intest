import { ApplicationStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; appId: string }>;
}

export async function PATCH(
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
      console.error("[API Error in status route]", error);

      if (error instanceof ZodError) {
        return validationErrorResponse(error);
      }

      if (error instanceof Error) {
        let message = error.message;

        const prismaError = error as { code?: string; meta?: any };
        if (prismaError.code === "P2002") {
          message = "A unique constraint conflict occurred.";
        } else if (prismaError.code === "P2003") {
          message = "A referenced record was not found.";
        } else if (prismaError.code === "P2025") {
          message = "Application record was not found.";
        }

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

    const updateInternshipStatusSchema = z.object({
      status: z.nativeEnum(ApplicationStatus, {
        error: "Status is required",
      }),
      reviewNote: z.string().optional(),
    });

  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: internshipId, appId } = await params;

    const internship = await prisma.internship.findFirst({
      where: { id: internshipId, deletedAt: null },
    });

    if (!internship) {
      return errorResponse("INTERNSHIP_NOT_FOUND", "Internship not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        const isOwner =
      requesterRole === "SUPER_ADMIN" ||
      (requesterRole === "INSTRUCTOR" &&
        (internship.instructorId === requesterId ||
          internship.createdById === requesterId));
    if (!isOwner) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Only the assigned instructor or admin can update application status.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const application = await prisma.internshipApplication.findFirst({
      where: { id: appId, internshipId },
    });

    if (!application) {
      return errorResponse("APPLICATION_NOT_FOUND", "Application not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const body = await request.json().catch(() => ({}));
    const parsed = updateInternshipStatusSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid status payload", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const newStatus = parsed.data.status;
    const reviewNote = parsed.data.reviewNote ?? null;

    let validReviewerId: string | null = null;
    if (requesterId) {
      const reviewer = await prisma.user.findUnique({
        where: { id: requesterId },
        select: { id: true },
      });
      if (reviewer) {
        validReviewerId = reviewer.id;
      }
    }

    const updatedApp = await prisma.$transaction(async (tx) => {
      let enrollmentId = application.enrollmentId;

      if (newStatus === "APPROVED") {
        const enrollment = await tx.enrollment.upsert({
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
        enrollmentId = enrollment.id;

        const conflictingApp = await tx.internshipApplication.findUnique({
          where: { enrollmentId: enrollment.id },
          select: { id: true },
        });

        if (conflictingApp && conflictingApp.id !== appId) {
          await tx.internshipApplication.update({
            where: { id: conflictingApp.id },
            data: { enrollmentId: null },
          });
        }
      }

      if (newStatus !== "APPROVED" && application.enrollmentId) {
        await tx.enrollment
          .delete({
            where: { id: application.enrollmentId },
          })
          .catch(() => {});
        enrollmentId = null;
      }

      return await tx.internshipApplication.update({
        where: { id: appId },
        data: {
          status: newStatus,
          reviewedAt: new Date(),
          reviewedById: validReviewerId,
          reviewNote,
          enrollmentId,
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
    });

    if (newStatus === "APPROVED" && updatedApp.enrollmentId) {
      try {
        const { issueIdCard } = await import("@/x/c6f69c52");
        await issueIdCard(application.studentId, updatedApp.enrollmentId);
      } catch (cardErr) {
        console.warn("[Status Route] ID Card issuance warning:", cardErr);
      }

      // Generate official Offer Letter PDF and send email notification asynchronously
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
              "[EMAIL ERROR] Failed to send internship application approval email from status route:",
              err,
            );
          }
        })();
      }
    }

    return successResponse(updatedApp, {
      message: `Internship application status updated to ${newStatus} successfully.`,
    });
  } catch (error) {
    return handleError(error);
  }
}
