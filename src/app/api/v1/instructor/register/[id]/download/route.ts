import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
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

    async function generateInstructorRegistrationPDF(
      reg: any,
    ): Promise<Buffer> {
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
            .stroke("#10B981");
          doc
            .fontSize(20)
            .font("Helvetica-Bold")
            .fillColor("#065F46")
            .text("International Institute of Internship (i3)", {
              align: "center",
            });
          doc.moveDown(0.2);
          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fillColor("#374151")
            .text("INSTRUCTOR REGISTRATION RECORD", { align: "center" });
          doc.moveDown(1.5);

          const addSection = (title: string) => {
            if (doc.y > doc.page.height - 120) doc.addPage();
            doc
              .fontSize(10)
              .font("Helvetica-Bold")
              .fillColor("#065F46")
              .text(title, { underline: true });
            doc.moveDown(0.4);
          };

          const addField = (label: string, value: unknown) => {
            if (doc.y > doc.page.height - 75) doc.addPage();
            const displayValue = Array.isArray(value)
              ? value.join(", ")
              : value || "N/A";
            doc
              .fontSize(10)
              .font("Helvetica-Bold")
              .fillColor("#374151")
              .text(`  ${label}: `, { continued: true })
              .font("Helvetica")
              .fillColor("#4B5563")
              .text(String(displayValue));
            doc.moveDown(0.25);
          };

          addSection("Registration Details");
          addField("Instructor ID", reg.instructorId);
          addField("Registration Status", reg.isApproved ? "Approved" : "Pending Approval");
          addField("Registered On", reg.createdAt?.toISOString?.().split("T")[0]);
          addField("Approved On", reg.approvedAt?.toISOString?.().split("T")[0]);

          addSection("Personal and Contact Details");
          addField("Full Name", reg.fullName);
          addField("Email Address", reg.user?.email);
          addField("Father/Spouse Name", reg.fatherSpouseName);
          addField("Gender", reg.gender);
          addField("Date of Birth", reg.dob);
          addField("Mobile", reg.mobileNo);
          addField("Alternate Mobile", reg.alternateMobileNo);

          addSection("Current Address");
          addField("Local Address", reg.currentAddressLocal);
          addField("District", reg.currentAddressDistrict);
          addField("State", reg.currentAddressState);
          addField("Country", reg.currentAddressCountry);
          addField("PIN Code", reg.currentAddressPinCode);

          addSection("Permanent Address");
          addField("Same as Current Address", reg.sameAsCurrentAddress ? "Yes" : "No");
          addField("Local Address", reg.permAddressLocal);
          addField("District", reg.permAddressDistrict);
          addField("State", reg.permAddressState);
          addField("Country", reg.permAddressCountry);
          addField("PIN Code", reg.permAddressPinCode);

          addSection("Professional and Mentorship Details");
          addField("Current Organization", reg.currentOrganization);
          addField("Current Designation", reg.currentDesignation);
          addField("Total Work Experience", reg.totalWorkExperience);
          addField("Teaching Experience", reg.teachingExperience);
          addField("Internship Experience", reg.internshipExperience);
          addField("Mentorship Areas", reg.mentorshipAreas);
          addField("Preferred Intern Level", reg.preferredInternLevel);
          addField("Mentorship Mode", reg.mentorshipMode);
          addField("Maximum Interns", reg.maxInterns);
          addField("Availability", reg.availability);
          addField("Self Introduction", reg.selfIntroduction);

          addSection("Qualifications");
          if (reg.qualifications?.length) {
            reg.qualifications.forEach((qualification: any, index: number) => {
              addField(
                `Qualification ${index + 1}`,
                `${qualification.highestQualification}, ${qualification.specialization}, ${qualification.universityName}, ${qualification.yearOfCompletion}, ${qualification.percentage}`,
              );
            });
          } else {
            addField("Qualification", "N/A");
          }

          addSection("Uploaded Documents and Declaration");
          addField("Photo", reg.photoName);
          addField("Identity Proof", reg.identityProofName);
          addField("Education Certificate", reg.educationCertName);
          addField("Experience Certificate", reg.experienceCertName);
          addField("Terms Accepted", reg.agreeTerms ? "Yes" : "No");

          doc.moveDown(1.2);
          doc.end();
        } catch (error) {
          reject(error);
        }
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

    if (!userId || userRole !== "SUPER_ADMIN") {
      return errorResponse("FORBIDDEN", "Super Admin only.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id } = await params;

    const registration = await prisma.instructorRegistration.findUnique({
      where: { id },
      include: {
        qualifications: true,
        user: { select: { id: true, email: true, name: true } },
      },
    });

    if (!registration || registration.deletedAt) {
      return errorResponse("NOT_FOUND", "Registration not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const fileBuffer = await generateInstructorRegistrationPDF(registration);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="instructor_registration_${registration.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
