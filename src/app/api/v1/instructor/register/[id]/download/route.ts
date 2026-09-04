import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import axios from "axios";
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
      return new Promise(async (resolve, reject) => {
        try {
          // Fetch photo buffer if available
          let photoBuffer: Buffer | null = null;
          if (reg.photoUrl) {
            try {
              const res = await axios.get(reg.photoUrl, {
                responseType: "arraybuffer",
                timeout: 4000,
              });
              photoBuffer = Buffer.from(res.data);
            } catch (e: any) {
              console.warn("Could not fetch instructor photo:", e?.message);
            }
          }

          const doc = new PDFDocument({ size: "A4", margin: 35, bufferPages: true });
          const chunks: Buffer[] = [];
          doc.on("data", (chunk) => chunks.push(chunk));
          doc.on("end", () => resolve(Buffer.concat(chunks)));
          doc.on("error", reject);

          const pageWidth = doc.page.width;
          const pageHeight = doc.page.height;
          const margin = 35;
          const contentWidth = pageWidth - 2 * margin;

          const drawPageBorder = () => {
            doc.rect(16, 16, pageWidth - 32, pageHeight - 32).lineWidth(1.2).stroke("#059669");
            doc.rect(19, 19, pageWidth - 38, pageHeight - 38).lineWidth(0.8).stroke("#065F46");
          };

          const drawHeader = (isFirstPage = false) => {
            try {
              const logoPath = path.join(process.cwd(), "public", "logo.png");
              if (fs.existsSync(logoPath)) {
                doc.image(logoPath, 35, 24, { width: 42 });
              }
            } catch {
              // Ignore logo load error if any
            }

            if (isFirstPage) {
              doc.fontSize(15).font("Helvetica-Bold").fillColor("#065f46").text("International Institute of Internship (i3)", 35, 24, {
                align: "center",
                width: contentWidth,
              });
              doc.fontSize(9.5).font("Helvetica-Bold").fillColor("#1f2937").text("INSTRUCTOR REGISTRATION APPLICATION FORM", 35, 42, {
                align: "center",
                width: contentWidth,
              });
              doc.fontSize(7.5).font("Helvetica").fillColor("#6b7280").text("Official Onboarding Record & Verification Dossier | www.iiinternship.in", 35, 55, {
                align: "center",
                width: contentWidth,
              });
              doc.moveTo(35, 68).lineTo(pageWidth - 35, 68).lineWidth(0.8).stroke("#cbd5e1");
            } else {
              doc.fontSize(11).font("Helvetica-Bold").fillColor("#065f46").text("International Institute of Internship (i3)", 35, 24, {
                align: "center",
                width: contentWidth,
              });
              doc.fontSize(8).font("Helvetica-Bold").fillColor("#1f2937").text("INSTRUCTOR REGISTRATION RECORD (CONTINUED)", 35, 38, {
                align: "center",
                width: contentWidth,
              });
              doc.fontSize(7).font("Helvetica").fillColor("#6b7280").text(`Instructor ID: ${reg.instructorId || "N/A"} | Name: ${reg.fullName || ""}`, 35, 49, {
                align: "center",
                width: contentWidth,
              });
              doc.moveTo(35, 60).lineTo(pageWidth - 35, 60).lineWidth(0.8).stroke("#cbd5e1");
            }
          };

          // PAGE 1 SETUP
          drawPageBorder();
          drawHeader(true);

          let currentY = 74;

          const drawSectionHeader = (title: string) => {
            doc.rect(35, currentY, contentWidth, 15).fill("#ecfdf5");
            doc.rect(35, currentY, 3.5, 15).fill("#059669");
            doc.fontSize(8).font("Helvetica-Bold").fillColor("#065f46").text(title, 44, currentY + 3.5);
            currentY += 19;
          };

          const drawFieldRow = (items: { label: string; value: unknown }[], rowHeight = 13) => {
            const colWidth = contentWidth / items.length;
            items.forEach((item, idx) => {
              const colX = 35 + idx * colWidth;
              const displayVal = Array.isArray(item.value) ? item.value.join(", ") : (item.value ?? "N/A");
              doc.fontSize(7.5).font("Helvetica-Bold").fillColor("#374151").text(`${item.label}: `, colX, currentY, { continued: true })
                .font("Helvetica").fillColor("#4b5563").text(String(displayVal));
            });
            currentY += rowHeight;
          };

          // --- APPLICATION META & PHOTO BOX (PAGE 1) ---
          const photoWidth = 72;
          const photoHeight = 84;
          const metaBoxWidth = contentWidth - photoWidth - 10;

          // Meta Box
          doc.rect(35, currentY, metaBoxWidth, photoHeight).fillAndStroke("#f0fdf4", "#a7f3d0");
          doc.fontSize(8.5).font("Helvetica-Bold").fillColor("#065f46").text("REGISTRATION DOSSIER SUMMARY", 43, currentY + 6);

          doc.fontSize(8).font("Helvetica-Bold").fillColor("#374151").text("Instructor ID: ", 43, currentY + 20, { continued: true })
            .font("Helvetica").fillColor("#111827").text(reg.instructorId || "N/A");
          doc.fontSize(8).font("Helvetica-Bold").fillColor("#374151").text("Registered Email: ", 43, currentY + 34, { continued: true })
            .font("Helvetica").fillColor("#111827").text(reg.user?.email || reg.email || "N/A");
          doc.fontSize(8).font("Helvetica-Bold").fillColor("#374151").text("Application Status: ", 43, currentY + 48, { continued: true })
            .font("Helvetica-Bold").fillColor(reg.isApproved ? "#059669" : "#d97706").text(reg.isApproved ? "APPROVED" : "PENDING APPROVAL");
          doc.fontSize(8).font("Helvetica-Bold").fillColor("#374151").text("Submission Date: ", 43, currentY + 62, { continued: true })
            .font("Helvetica").fillColor("#111827").text(reg.createdAt ? new Date(reg.createdAt).toLocaleDateString("en-IN") : "N/A");

          // Photo Box
          const photoX = 35 + metaBoxWidth + 10;
          if (photoBuffer) {
            try {
              doc.rect(photoX - 1, currentY - 1, photoWidth + 2, photoHeight + 2).lineWidth(1).stroke("#059669");
              doc.image(photoBuffer, photoX, currentY, { width: photoWidth, height: photoHeight, fit: [photoWidth, photoHeight] });
            } catch {
              doc.rect(photoX, currentY, photoWidth, photoHeight).fillAndStroke("#f3f4f6", "#9ca3af");
              doc.fontSize(7).font("Helvetica").fillColor("#6b7280").text("PASSPORT PHOTO", photoX + 4, currentY + 36, { width: photoWidth - 8, align: "center" });
            }
          } else {
            doc.rect(photoX, currentY, photoWidth, photoHeight).fillAndStroke("#f3f4f6", "#9ca3af");
            doc.fontSize(7).font("Helvetica").fillColor("#6b7280").text("PASSPORT PHOTO", photoX + 4, currentY + 36, { width: photoWidth - 8, align: "center" });
          }

          currentY += photoHeight + 10;

          // 1. PERSONAL DETAILS
          drawSectionHeader("1. PERSONAL DETAILS");
          drawFieldRow([
            { label: "Full Name", value: reg.fullName },
            { label: "Father / Spouse", value: reg.fatherSpouseName },
          ]);
          drawFieldRow([
            { label: "Gender", value: reg.gender },
            { label: "Date of Birth", value: reg.dob },
          ]);
          currentY += 2;

          // 2. CONTACT DETAILS
          drawSectionHeader("2. CONTACT DETAILS");
          drawFieldRow([
            { label: "Mobile Number", value: reg.mobileNo },
            { label: "Alternate Mobile", value: reg.alternateMobileNo || "N/A" },
          ]);
          drawFieldRow([
            { label: "Email Address", value: reg.user?.email || reg.email || "N/A" },
            { label: "Availability", value: reg.availability },
          ]);
          currentY += 2;

          // 3. ADDRESS DETAILS
          drawSectionHeader("3. RESIDENTIAL ADDRESSES");
          const currAddr = `${reg.currentAddressLocal || ""}, ${reg.currentAddressDistrict || ""}, ${reg.currentAddressState || ""}, ${reg.currentAddressCountry || ""} - ${reg.currentAddressPinCode || ""}`;
          doc.fontSize(7.5).font("Helvetica-Bold").fillColor("#374151").text("Current Address: ", 35, currentY, { continued: true })
            .font("Helvetica").fillColor("#4b5563").text(currAddr);
          currentY += 12;

          const permAddr = reg.sameAsCurrentAddress
            ? "Same as Current Address"
            : `${reg.permAddressLocal || ""}, ${reg.permAddressDistrict || ""}, ${reg.permAddressState || ""}, ${reg.permAddressCountry || ""} - ${reg.permAddressPinCode || ""}`;
          doc.fontSize(7.5).font("Helvetica-Bold").fillColor("#374151").text("Permanent Address: ", 35, currentY, { continued: true })
            .font("Helvetica").fillColor("#4b5563").text(permAddr);
          currentY += 15;

          // 4. ACADEMIC QUALIFICATIONS TABLE (PAGE 1)
          drawSectionHeader("4. EDUCATIONAL & ACADEMIC QUALIFICATIONS");

          const tableX = 35;
          const colDefs = [
            { label: "S.No", width: 28, align: "center" as const },
            { label: "Qualification", width: 85, align: "left" as const },
            { label: "Specialization", width: 110, align: "left" as const },
            { label: "University / Institute / Board", width: 185, align: "left" as const },
            { label: "Year", width: 48, align: "center" as const },
            { label: "% / CGPA", width: 69, align: "center" as const },
          ];

          // Table Header
          doc.rect(tableX, currentY, contentWidth, 14).fill("#e2e8f0");
          let hX = tableX;
          colDefs.forEach((col) => {
            doc.fontSize(7).font("Helvetica-Bold").fillColor("#1e293b").text(col.label, hX + 2, currentY + 3.5, {
              width: col.width - 4,
              align: col.align,
            });
            hX += col.width;
          });
          currentY += 14;

          if (reg.qualifications && reg.qualifications.length > 0) {
            reg.qualifications.forEach((q: any, idx: number) => {
              const isEven = idx % 2 === 0;
              doc.rect(tableX, currentY, contentWidth, 13.5).fill(isEven ? "#ffffff" : "#f8fafc");
              doc.rect(tableX, currentY, contentWidth, 13.5).lineWidth(0.3).stroke("#cbd5e1");

              let rX = tableX;
              const vals = [
                String(idx + 1),
                q.highestQualification || "-",
                q.specialization || "-",
                q.universityName || "-",
                q.yearOfCompletion || "-",
                q.percentage ? `${q.percentage}%` : "-",
              ];
              colDefs.forEach((col, cIdx) => {
                doc.fontSize(6.8).font("Helvetica").fillColor("#334155").text(vals[cIdx], rX + 2, currentY + 3.5, {
                  width: col.width - 4,
                  align: col.align,
                });
                rX += col.width;
              });
              currentY += 13.5;
            });
          } else {
            doc.rect(tableX, currentY, contentWidth, 14).fill("#ffffff");
            doc.fontSize(7.5).font("Helvetica").fillColor("#94a3b8").text("No qualifications recorded", tableX, currentY + 3.5, { align: "center", width: contentWidth });
            currentY += 14;
          }

          // ==========================================
          // PAGE 2: PROFESSIONAL, MENTORSHIP, DOCS, DECLARATION
          // ==========================================
          doc.addPage();
          drawPageBorder();
          drawHeader(false);
          currentY = 68;

          // 5. PROFESSIONAL BACKGROUND
          drawSectionHeader("5. PROFESSIONAL & TEACHING BACKGROUND");
          drawFieldRow([
            { label: "Current Organization", value: reg.currentOrganization },
            { label: "Current Designation", value: reg.currentDesignation },
          ]);
          drawFieldRow([
            { label: "Total Work Experience", value: `${reg.totalWorkExperience || "0"} Years` },
            { label: "Teaching Experience", value: `${reg.teachingExperience || "0"} Years` },
          ]);
          drawFieldRow([
            { label: "Internship / Industry Experience", value: reg.internshipExperience || "N/A" },
          ]);
          currentY += 4;

          // 6. MENTORSHIP DOMAIN & PREFERENCES
          drawSectionHeader("6. MENTORSHIP DOMAIN & PREFERENCES");
          drawFieldRow([
            { label: "Mentorship Areas", value: reg.mentorshipAreas || "N/A" },
          ]);
          drawFieldRow([
            { label: "Preferred Intern Level", value: Array.isArray(reg.preferredInternLevel) ? reg.preferredInternLevel.join(", ") : reg.preferredInternLevel },
            { label: "Mentorship Mode", value: Array.isArray(reg.mentorshipMode) ? reg.mentorshipMode.join(", ") : reg.mentorshipMode },
          ]);
          drawFieldRow([
            { label: "Max Interns Comfort Capacity", value: reg.maxInterns || "N/A" },
            { label: "Mentorship Availability", value: reg.availability || "N/A" },
          ]);
          currentY += 4;

          // 7. SELF INTRODUCTION
          if (reg.selfIntroduction) {
            drawSectionHeader("7. STATEMENT OF PURPOSE & SELF INTRODUCTION");
            doc.font("Helvetica").fontSize(7.5);
            const introHeight = doc.heightOfString(reg.selfIntroduction, { width: contentWidth - 16, lineGap: 1.5 });
            const boxHeight = Math.max(introHeight + 12, 38);

            doc.rect(35, currentY, contentWidth, boxHeight).fillAndStroke("#f8fafc", "#e2e8f0");
            doc.fontSize(7.5).font("Helvetica").fillColor("#334155").text(reg.selfIntroduction, 43, currentY + 6, {
              width: contentWidth - 16,
              align: "justify",
              lineGap: 1.5,
            });
            currentY += boxHeight + 8;
          }

          // 8. ATTACHED DOCUMENTS CHECKLIST
          drawSectionHeader("8. ATTACHED DOCUMENTS & VERIFICATION CHECKLIST");
          drawFieldRow([
            { label: "Photograph", value: reg.photoName ? `Attached (${reg.photoName})` : "Attached" },
            { label: "Identity Proof", value: reg.identityProofName ? `Attached (${reg.identityProofName})` : "Attached" },
          ]);
          drawFieldRow([
            { label: "Education Certificate", value: reg.educationCertName ? `Attached (${reg.educationCertName})` : "Attached" },
            { label: "Experience Certificate", value: reg.experienceCertName ? `Attached (${reg.experienceCertName})` : "N/A" },
          ]);
          currentY += 6;

          // 9. DECLARATION & OFFICIAL VERIFICATION
          drawSectionHeader("9. DECLARATION & OFFICIAL VERIFICATION");
          doc.fontSize(7.5).font("Helvetica").fillColor("#4b5563").text(
            "I hereby declare that all information furnished in this Instructor Registration Application Form is true, complete, and accurate. I agree to abide by the rules, regulations, code of conduct, and internship mentorship guidelines of the International Institute of Internship (i3).",
            35,
            currentY,
            { width: contentWidth, align: "justify", lineGap: 1 }
          );
          currentY += 24;

          const signBoxWidth = 185;
          const signBoxHeight = 46;

          // Applicant Signature Box
          doc.rect(35, currentY, signBoxWidth, signBoxHeight).lineWidth(0.6).stroke("#94a3b8");
          doc.fontSize(8).font("Helvetica-Bold").fillColor("#111827").text(reg.fullName || "Applicant", 42, currentY + 12);
          doc.fontSize(7).font("Helvetica").fillColor("#6b7280").text("Applicant's Signature & Date", 42, currentY + 30);

          // Official Verification Box
          const sealX = pageWidth - margin - signBoxWidth;
          doc.rect(sealX, currentY, signBoxWidth, signBoxHeight).lineWidth(0.6).stroke("#059669");
          doc.fontSize(8).font("Helvetica-Bold").fillColor("#065f46").text("Authorized Signatory & Seal", sealX + 10, currentY + 12);
          doc.fontSize(7).font("Helvetica").fillColor("#6b7280").text("International Institute of Internship (i3)", sealX + 10, currentY + 30);

          // --- PAGE NUMBERS ---
          const range = doc.bufferedPageRange();
          for (let i = range.start; i < range.start + range.count; i++) {
            doc.switchToPage(i);
            doc.fontSize(7).font("Helvetica").fillColor("#9ca3af").text(
              `Page ${i + 1} of ${range.count} | Instructor Application Form: ${reg.instructorId || ""}`,
              35,
              pageHeight - 27,
              { align: "center", width: contentWidth }
            );
          }

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

    const registration = await prisma.instructorRegistration.findFirst({
      where: {
        OR: [{ id }, { instructorId: id }],
      },
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
        "Content-Disposition": `attachment; filename="instructor_application_${registration.instructorId || registration.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
