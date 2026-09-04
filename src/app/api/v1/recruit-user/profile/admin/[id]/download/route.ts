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

    async function generateRecruitRegistrationPDF(
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
            .stroke("#D97706");
          doc
            .fontSize(20)
            .font("Helvetica-Bold")
            .fillColor("#78350F")
            .text("International Institute of Internship [i3]", {
              align: "center",
            });
          doc.moveDown(0.2);
          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .fillColor("#374151")
            .text("Job Applicant Profile Registration Form", { align: "center" });
          doc.moveDown(1.5);

                doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .fillColor("#78350F")
            .text("Recruit Personal Details", { underline: true });
          doc.moveDown(0.5);

          const details = [
            ["Full Name", reg.fullName || "N/A"],
            ["Email", reg.email || reg.user?.email || "N/A"],
            ["Mobile No", reg.mobileNo || "N/A"],
            ["Gender", reg.gender || "N/A"],
            ["Date of Birth", reg.dob || "N/A"],
            ["Father's Name", reg.fatherName || "N/A"],
            ["Mother's Name", reg.motherName || "N/A"],
            ["Marital Status", reg.maritalStatus || "N/A"],
            ["Nationality", reg.nationality || "N/A"],
            ["Religion", reg.religion || "N/A"],
            ["Category", reg.category || "N/A"],
            ["Blood Group", reg.bloodGroup || "N/A"],
          ];

          details.forEach(([label, val]) => {
            doc
              .font("Helvetica-Bold")
              .fillColor("#374151")
              .text(`  ${label}: `, { continued: true })
              .font("Helvetica")
              .fillColor("#4B5563")
              .text(val);
            doc.moveDown(0.3);
          });

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

    const registration = await prisma.recruitProfile.findUnique({
      where: { id },
      include: {
        academics: true,
        experiences: true,
        user: { select: { id: true, email: true, name: true } },
      },
    });

    if (!registration) {
      return errorResponse("NOT_FOUND", "Profile not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const fileBuffer = await generateRecruitRegistrationPDF(registration);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="recruit_registration_${registration.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
