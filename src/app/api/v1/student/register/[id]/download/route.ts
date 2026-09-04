import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
    interface StudentRegistrationForPDF {
      id: string;
      fullName?: string;
      mobileNo?: string;
      user?: { email?: string };
      internshipGoal?: string;
      category?: string;
      gender?: string;
      dob?: string;
      fatherName?: string;
      motherName?: string;
      studentId?: string;
      sameAsLocal?: boolean;
      localAddressLocal?: string;
      localAddressDistrict?: string;
      localAddressState?: string;
      localAddressPinCode?: string;
      permAddressLocal?: string;
      permAddressDistrict?: string;
      permAddressState?: string;
      permAddressPinCode?: string;
      academics?: {
        qualification?: string;
        stream?: string;
        subject?: string;
        instituteName?: string;
        universityName?: string;
        sessionYear?: string;
        gradeDivision?: string;
        status?: string;
      }[];
    }

    async function generateStudentRegistrationPDF(
      regRaw: Record<string, unknown>,
    ): Promise<Buffer> {
      const reg = regRaw as unknown as StudentRegistrationForPDF;
      return new Promise((resolve, reject) => {
        try {
          const doc = new PDFDocument({ margin: 50 });
          const chunks: Buffer[] = [];
          doc.on("data", (chunk) => chunks.push(chunk));
          doc.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
          doc.on("error", reject);

                doc
            .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
            .stroke("#3B82F6");
          doc
            .rect(23, 23, doc.page.width - 46, doc.page.height - 46)
            .stroke("#1D4ED8");

                doc
            .fontSize(22)
            .font("Helvetica-Bold")
            .fillColor("#1E3A8A")
            .text("International Institute of Internship (i3)", {
              align: "center",
            });
          doc.moveDown(0.2);

          doc
            .fontSize(13)
            .font("Helvetica-Bold")
            .fillColor("#374151")
            .text("STUDENT ONBOARDING REGISTRATION RECORD", { align: "center" });
          doc.moveDown(1.5);

                doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#1E3A8A")
            .text(`Registration Details (Student ID: ${reg.studentId || "N/A"})`, {
              underline: true,
            });
          doc.moveDown(0.5);

          doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#374151")
            .text(`Student Name: ${reg.fullName}`)
            .text(`Mobile Number: ${reg.mobileNo}`)
            .text(`Email Address: ${reg.user?.email || "N/A"}`)
            .text(`Internship Goal: ${reg.internshipGoal?.replace("_", " ")}`)
            .text(`Category: ${reg.category || "N/A"}`)
            .text(`Gender: ${reg.gender || "N/A"}`)
            .text(`Date of Birth: ${reg.dob || "N/A"}`);
          doc.moveDown(1.5);

                doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#1E3A8A")
            .text("Guardian Information", { underline: true });
          doc.moveDown(0.5);

          doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#374151")
            .text(`Father's Name: ${reg.fatherName || "N/A"}`)
            .text(`Mother's Name: ${reg.motherName || "N/A"}`);
          doc.moveDown(1.5);

                doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor("#1E3A8A")
            .text("Address Details", { underline: true });
          doc.moveDown(0.5);

          doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#374151")
            .text(
              `Local Address: ${reg.localAddressLocal}, ${reg.localAddressDistrict}, ${reg.localAddressState} - ${reg.localAddressPinCode}`,
            );

          if (reg.sameAsLocal) {
            doc.text("Permanent Address: Same as local address");
          } else {
            doc.text(
              `Permanent Address: ${reg.permAddressLocal}, ${reg.permAddressDistrict}, ${reg.permAddressState} - ${reg.permAddressPinCode}`,
            );
          }
          doc.moveDown(1.5);

                if (reg.academics && reg.academics.length > 0) {
            doc
              .fontSize(11)
              .font("Helvetica-Bold")
              .fillColor("#1E3A8A")
              .text("Academic Qualifications", { underline: true });
            doc.moveDown(0.5);

            (reg.academics as Record<string, unknown>[]).forEach(
              (acad: Record<string, unknown>, idx: number) => {
                doc
                  .fontSize(10)
                  .font("Helvetica-Bold")
                  .fillColor("#374151")
                  .text(`${idx + 1}. ${acad.qualification} (${acad.stream})`)
                  .font("Helvetica")
                  .text(
                    `   Institute: ${acad.instituteName} | University: ${acad.universityName}`,
                  )
                  .text(
                    `   Session Year: ${acad.sessionYear} | Status: ${acad.status} | Division: ${acad.gradeDivision}`,
                  );
                doc.moveDown(0.3);
              },
            );
            doc.moveDown(1.2);
          }

                doc
            .fontSize(8)
            .font("Helvetica")
            .fillColor("#9CA3AF")
            .text(
              "This is an auto-generated official student onboarding registration record.",
              { align: "center" },
            );

          doc.end();
        } catch (error) {
          reject(error);
        }
      });
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

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }
    if (userRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Only Super Admins can access this endpoint.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const { id } = await params;

    const registration = await prisma.studentRegistration.findUnique({
      where: { id },
      include: {
        academics: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!registration || registration.deletedAt) {
      return errorResponse("NOT_FOUND", "Registration not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const fileBuffer = await generateStudentRegistrationPDF(registration);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="student_registration_${registration.studentId || registration.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
