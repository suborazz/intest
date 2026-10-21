import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import fs from "fs";
import { join } from "path";
import qrcode from "qrcode-generator";
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

  function getPdfCompatibleImageUrl(url: string): string {
    if (!url) return url;

    if (url.includes("res.cloudinary.com")) {
      let cleanUrl = url;
      cleanUrl = cleanUrl.replace(/\/f_auto,?/, "/f_jpg");
      cleanUrl = cleanUrl.replace(/f_auto/, "f_jpg");

      try {
        const parsed = new URL(cleanUrl);
        const pathname = parsed.pathname;
        const lastDot = pathname.lastIndexOf(".");
        if (lastDot !== -1) {
          const ext = pathname.slice(lastDot + 1).toLowerCase();
          if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
            const newPathname = pathname.substring(0, lastDot) + ".jpg";
            parsed.pathname = newPathname;
            cleanUrl = parsed.toString();
          }
        } else {
          parsed.pathname = pathname + ".jpg";
          cleanUrl = parsed.toString();
        }
      } catch (e) {
        console.error("Failed to parse/normalize Cloudinary URL:", e);
      }
      return cleanUrl;
    }

    return url;
  }

  async function fetchImageBuffer(url: string): Promise<Buffer | null> {
    try {
      if (!url) return null;

      if (url.startsWith("data:image/")) {
        const matches = url.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          return Buffer.from(matches[2], "base64");
        }
        return null;
      }

      let pathname = "";
      if (url.startsWith("/")) {
        pathname = url;
      } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
        pathname = "/" + url;
      } else {
        try {
          const parsed = new URL(url);
          pathname = parsed.pathname;
        } catch (_e) {}
      }

      if (pathname) {
        const localPath = join(process.cwd(), "public", pathname);
        if (fs.existsSync(localPath)) {
          return fs.readFileSync(localPath);
        }
      }

      const optimizedUrl = getPdfCompatibleImageUrl(url);

      if (
        !optimizedUrl.startsWith("http://") &&
        !optimizedUrl.startsWith("https://")
      ) {
        return null;
      }

      const response = await fetch(optimizedUrl);
      if (!response.ok) {
        return null;
      }
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.error("[PDF Gen] Failed to fetch image:", error);
      return null;
    }
  }

  async function generateInstructorRegistrationPDF(
    reg: any,
  ): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      try {
        const photoBuffer = reg.photoUrl
          ? await fetchImageBuffer(reg.photoUrl)
          : null;

        const doc = new PDFDocument({
          size: "A4",
          margins: { top: 25, bottom: 20, left: 25, right: 25 },
          bufferPages: true,
        });

        const chunks: Buffer[] = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", reject);

        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const usableWidth = pageWidth - 70;

        const drawPageBorder = () => {
          doc
            .rect(15, 15, pageWidth - 30, pageHeight - 30)
            .lineWidth(1)
            .stroke("#059669");
          doc
            .rect(18, 18, pageWidth - 36, pageHeight - 36)
            .lineWidth(1.5)
            .stroke("#065F46");
        };

        const drawHeader = (isFirstPage = false) => {
          try {
            const logoPath = join(process.cwd(), "public", "logo.png");
            if (fs.existsSync(logoPath)) {
              doc.image(logoPath, 35, isFirstPage ? 24 : 20, {
                width: isFirstPage ? 45 : 35,
              });
            }
          } catch {}

          if (isFirstPage) {
            // Smartphone Vector QR Code
            try {
              const instructorCode = reg.instructorId || "I2026XX10001";
              const host = request.headers.get("host") || "www.iiinternship.in";
              const protocol = host.includes("localhost") ? "http" : "https";
              const verifyUrl = `${protocol}://${host}/verify/id-card/${instructorCode}`;

              const qr = qrcode(0, "M");
              qr.addData(verifyUrl);
              qr.make();
              const moduleCount = qr.getModuleCount();
              const qrSize = 39;
              const cellSize = qrSize / moduleCount;
              const qrX = pageWidth - 35 - qrSize;
              const qrY = 22;

              doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4).fill("#ffffff");
              doc.fillColor("#000000");
              for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                  if (qr.isDark(row, col)) {
                    doc
                      .rect(
                        qrX + col * cellSize,
                        qrY + row * cellSize,
                        cellSize,
                        cellSize,
                      )
                      .fill();
                  }
                }
              }

              doc
                .fontSize(5)
                .font("Helvetica-Bold")
                .fillColor("#059669")
                .text("SCAN TO VERIFY", qrX - 10, qrY + qrSize + 3, {
                  width: qrSize + 20,
                  align: "center",
                });
            } catch (qrErr) {
              console.error("QR Code rendering failed:", qrErr);
            }

            doc
              .fontSize(14)
              .font("Helvetica-Bold")
              .fillColor("#065f46")
              .text("International Institute of Internship [i3]", 35, 24, {
                align: "center",
                width: usableWidth,
              });
            doc
              .fontSize(9)
              .font("Helvetica-Bold")
              .fillColor("#1f2937")
              .text("INSTRUCTOR ONBOARDING REGISTRATION FORM", 35, 41, {
                align: "center",
                width: usableWidth,
              });
            doc
              .fontSize(7.5)
              .font("Helvetica")
              .fillColor("#4b5563")
              .text(
                "A Unit of DPKHRC Trust  |  Official Verification Record  |  www.iiinternship.in",
                35,
                55,
                { align: "center", width: usableWidth },
              );
            doc
              .moveTo(35, 76)
              .lineTo(pageWidth - 35, 76)
              .lineWidth(0.6)
              .stroke("#cbd5e1");
          } else {
            doc
              .fontSize(11)
              .font("Helvetica-Bold")
              .fillColor("#065f46")
              .text("International Institute of Internship [i3]", 35, 22, {
                align: "center",
                width: usableWidth,
              });
            doc
              .fontSize(8)
              .font("Helvetica-Bold")
              .fillColor("#1f2937")
              .text("INSTRUCTOR REGISTRATION FORM (CONTINUED)", 35, 36, {
                align: "center",
                width: usableWidth,
              });
            doc
              .fontSize(7)
              .font("Helvetica")
              .fillColor("#64748b")
              .text(
                `Instructor ID: ${reg.instructorId || "N/A"}  |  Name: ${reg.fullName || ""}`,
                35,
                48,
                { align: "center", width: usableWidth },
              );
            doc
              .moveTo(35, 59)
              .lineTo(pageWidth - 35, 59)
              .lineWidth(0.6)
              .stroke("#cbd5e1");
          }
        };

        // Page 1 initial render
        drawPageBorder();
        drawHeader(true);

        // When subsequent pages are added dynamically
        doc.on("pageAdded", () => {
          drawPageBorder();
          drawHeader(false);
        });

        let currentY = 84;

        const checkPageBreak = (neededHeight: number) => {
          if (currentY + neededHeight > 755) {
            doc.addPage();
            currentY = 66;
          }
        };

        const drawSectionHeader = (title: string) => {
          checkPageBreak(20);
          doc.rect(35, currentY, usableWidth, 14).fill("#ecfdf5");
          doc.rect(35, currentY, 3.5, 14).fill("#059669");
          doc
            .fontSize(7.5)
            .font("Helvetica-Bold")
            .fillColor("#065f46")
            .text(title, 44, currentY + 3.2, { lineBreak: false });
          doc
            .moveTo(35, currentY + 14)
            .lineTo(35 + usableWidth, currentY + 14)
            .lineWidth(0.6)
            .stroke("#a7f3d0");
          currentY += 18;
        };

        // Dynamic auto-measuring field row (Zero text collisions)
        const drawFieldRow = (
          items: { label: string; value: unknown }[],
          minRowHeight = 13,
        ) => {
          const colWidth = usableWidth / items.length;
          let maxRowHeight = minRowHeight;

          const measuredItems = items.map((item) => {
            const displayVal = Array.isArray(item.value)
              ? item.value.join(", ")
              : (item.value ?? "N/A");
            const labelStr = `${item.label}: `;
            const valStr = String(displayVal);
            doc.fontSize(7).font("Helvetica");
            const valH = doc.heightOfString(valStr, {
              width: colWidth - 8,
              lineGap: 1,
            });
            const neededH = Math.max(minRowHeight, valH + 3);
            if (neededH > maxRowHeight) maxRowHeight = neededH;
            return { labelStr, valStr };
          });

          checkPageBreak(maxRowHeight + 2);

          measuredItems.forEach((item, idx) => {
            const colX = 35 + idx * colWidth;
            doc
              .fontSize(7.2)
              .font("Helvetica-Bold")
              .fillColor("#374151")
              .text(item.labelStr, colX, currentY + 2, {
                continued: true,
                width: colWidth - 8,
              })
              .font("Helvetica")
              .fillColor("#4b5563")
              .text(item.valStr, { width: colWidth - 8, lineGap: 1 });
          });

          currentY += maxRowHeight + 2;
        };

        // --- REGISTRATION SUMMARY & PASSPORT PHOTO (PAGE 1) ---
        const photoWidth = 72;
        const photoHeight = 84;
        const photoX = 35 + usableWidth - photoWidth;
        const photoY = currentY;
        const summaryWidth = usableWidth - photoWidth - 10;

        // Photo Box
        if (photoBuffer) {
          try {
            doc.save();
            doc.rect(photoX, photoY, photoWidth, photoHeight).clip();
            doc.image(photoBuffer, photoX, photoY, {
              width: photoWidth,
              height: photoHeight,
              fit: [photoWidth, photoHeight],
              align: "center",
              valign: "center",
            });
            doc.restore();
            doc
              .rect(photoX, photoY, photoWidth, photoHeight)
              .lineWidth(0.8)
              .stroke("#059669");
          } catch {
            doc
              .rect(photoX, photoY, photoWidth, photoHeight)
              .fillAndStroke("#f3f4f6", "#9ca3af");
            doc
              .fontSize(6.5)
              .font("Helvetica")
              .fillColor("#6b7280")
              .text("PASSPORT PHOTO", photoX + 2, photoY + 36, {
                width: photoWidth - 4,
                align: "center",
              });
          }
        } else {
          doc
            .rect(photoX, photoY, photoWidth, photoHeight)
            .fillAndStroke("#f3f4f6", "#cbd5e1");
          doc
            .fontSize(6.5)
            .font("Helvetica-Bold")
            .fillColor("#94a3b8")
            .text("INSTRUCTOR PHOTO", photoX + 2, photoY + 36, {
              width: photoWidth - 4,
              align: "center",
            });
        }

        // Summary Table on Left
        doc
          .rect(35, currentY, summaryWidth, photoHeight)
          .fillAndStroke("#f0fdf4", "#a7f3d0");
        doc
          .fontSize(8)
          .font("Helvetica-Bold")
          .fillColor("#065f46")
          .text("REGISTRATION SUMMARY", 43, currentY + 6);

        const summaryItems = [
          {
            label: "Instructor ID",
            value: reg.instructorId || "PENDING",
            yOff: 20,
          },
          {
            label: "Registered Email",
            value: reg.user?.email || reg.email || "N/A",
            yOff: 34,
          },
          {
            label: "Application Status",
            value: reg.isApproved ? "APPROVED" : "PENDING APPROVAL",
            isBadge: true,
            yOff: 48,
          },
          {
            label: "Submission Date",
            value: reg.createdAt
              ? new Date(reg.createdAt).toLocaleDateString("en-IN")
              : "N/A",
            yOff: 62,
          },
        ];

        summaryItems.forEach((si) => {
          doc
            .fontSize(7.5)
            .font("Helvetica-Bold")
            .fillColor("#374151")
            .text(`${si.label}: `, 43, currentY + si.yOff, { continued: true });
          if (si.isBadge) {
            doc
              .font("Helvetica-Bold")
              .fillColor(reg.isApproved ? "#059669" : "#d97706")
              .text(String(si.value));
          } else {
            doc
              .font("Helvetica")
              .fillColor("#111827")
              .text(String(si.value));
          }
        });

        currentY += photoHeight + 8;

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

        // 2. CONTACT DETAILS
        drawSectionHeader("2. CONTACT DETAILS");
        drawFieldRow([
          { label: "Mobile Number", value: reg.mobileNo },
          { label: "Alternate Mobile", value: reg.alternateMobileNo || "N/A" },
        ]);
        drawFieldRow([
          {
            label: "Email Address",
            value: reg.user?.email || reg.email || "N/A",
          },
          { label: "Availability", value: reg.availability },
        ]);

        // 3. RESIDENTIAL ADDRESSES
        drawSectionHeader("3. RESIDENTIAL ADDRESSES");
        const currAddr = `${reg.currentAddressLocal || ""}, ${reg.currentAddressDistrict || ""}, ${reg.currentAddressState || ""}, ${reg.currentAddressCountry || ""} - ${reg.currentAddressPinCode || ""}`;
        drawFieldRow([{ label: "Current Address", value: currAddr }]);

        const permAddr = reg.sameAsCurrentAddress
          ? "Same as Current Address"
          : `${reg.permAddressLocal || ""}, ${reg.permAddressDistrict || ""}, ${reg.permAddressState || ""}, ${reg.permAddressCountry || ""} - ${reg.permAddressPinCode || ""}`;
        drawFieldRow([{ label: "Permanent Address", value: permAddr }]);

        // 4. EDUCATIONAL & ACADEMIC QUALIFICATIONS
        drawSectionHeader("4. EDUCATIONAL & ACADEMIC QUALIFICATIONS");

        const colDefs = [
          { label: "S.No", width: 26, align: "center" as const },
          { label: "Qualification", width: 88, align: "left" as const },
          { label: "Specialization", width: 112, align: "left" as const },
          {
            label: "University / Institute / Board",
            width: 180,
            align: "left" as const,
          },
          { label: "Year", width: 48, align: "center" as const },
          { label: "% / CGPA", width: 71, align: "center" as const },
        ];

        // Table Header
        checkPageBreak(25);
        doc.rect(35, currentY, usableWidth, 13).fill("#e2e8f0");
        let hX = 35;
        colDefs.forEach((col) => {
          doc
            .fontSize(6.8)
            .font("Helvetica-Bold")
            .fillColor("#1e293b")
            .text(col.label, hX + 2, currentY + 3.2, {
              width: col.width - 4,
              align: col.align,
            });
          hX += col.width;
        });
        currentY += 13;

        if (reg.qualifications && reg.qualifications.length > 0) {
          reg.qualifications.forEach((q: any, idx: number) => {
            const vals = [
              String(idx + 1),
              q.highestQualification || "-",
              q.specialization || "-",
              q.universityName || "-",
              q.yearOfCompletion || "-",
              q.percentage ? `${q.percentage}%` : "-",
            ];

            // Calculate row height based on text
            let maxRowH = 13.5;
            doc.fontSize(6.5).font("Helvetica");
            colDefs.forEach((col, cIdx) => {
              const textH = doc.heightOfString(vals[cIdx], {
                width: col.width - 4,
              });
              if (textH + 4 > maxRowH) maxRowH = textH + 4;
            });

            checkPageBreak(maxRowH);

            const isEven = idx % 2 === 0;
            doc
              .rect(35, currentY, usableWidth, maxRowH)
              .fill(isEven ? "#ffffff" : "#f8fafc");
            doc
              .rect(35, currentY, usableWidth, maxRowH)
              .lineWidth(0.3)
              .stroke("#cbd5e1");

            let rX = 35;
            colDefs.forEach((col, cIdx) => {
              doc
                .fontSize(6.5)
                .font("Helvetica")
                .fillColor("#334155")
                .text(vals[cIdx], rX + 2, currentY + 3, {
                  width: col.width - 4,
                  align: col.align,
                });
              rX += col.width;
            });
            currentY += maxRowH;
          });
        } else {
          doc.rect(35, currentY, usableWidth, 14).fill("#ffffff");
          doc
            .fontSize(7)
            .font("Helvetica")
            .fillColor("#94a3b8")
            .text("No educational qualifications recorded", 35, currentY + 3.5, {
              align: "center",
              width: usableWidth,
            });
          currentY += 14;
        }

        currentY += 4;

        // 5. PROFESSIONAL BACKGROUND
        drawSectionHeader("5. PROFESSIONAL & TEACHING BACKGROUND");
        drawFieldRow([
          {
            label: "Current Organization",
            value: reg.currentOrganization || "N/A",
          },
          {
            label: "Current Designation",
            value: reg.currentDesignation || "N/A",
          },
        ]);
        drawFieldRow([
          {
            label: "Total Work Experience",
            value: `${reg.totalWorkExperience || "0"} Years`,
          },
          {
            label: "Teaching Experience",
            value: `${reg.teachingExperience || "0"} Years`,
          },
        ]);
        drawFieldRow([
          {
            label: "Internship / Industry Experience",
            value: reg.internshipExperience || "N/A",
          },
        ]);

        // 6. MENTORSHIP DOMAIN & PREFERENCES
        drawSectionHeader("6. MENTORSHIP DOMAIN & PREFERENCES");
        drawFieldRow([
          { label: "Mentorship Areas", value: reg.mentorshipAreas || "N/A" },
        ]);
        drawFieldRow([
          {
            label: "Preferred Intern Level",
            value: Array.isArray(reg.preferredInternLevel)
              ? reg.preferredInternLevel.join(", ")
              : reg.preferredInternLevel,
          },
          {
            label: "Mentorship Mode",
            value: Array.isArray(reg.mentorshipMode)
              ? reg.mentorshipMode.join(", ")
              : reg.mentorshipMode,
          },
        ]);
        drawFieldRow([
          {
            label: "Max Interns Comfort Capacity",
            value: reg.maxInterns || "N/A",
          },
          { label: "Mentorship Availability", value: reg.availability || "N/A" },
        ]);

        // 7. SELF INTRODUCTION
        if (reg.selfIntroduction) {
          drawSectionHeader("7. STATEMENT OF PURPOSE & SELF INTRODUCTION");
          doc.font("Helvetica").fontSize(7.2);
          const introHeight = doc.heightOfString(reg.selfIntroduction, {
            width: usableWidth - 16,
            lineGap: 1.5,
          });
          const boxHeight = Math.max(introHeight + 12, 34);

          checkPageBreak(boxHeight + 4);

          doc
            .rect(35, currentY, usableWidth, boxHeight)
            .fillAndStroke("#f8fafc", "#e2e8f0");
          doc
            .fontSize(7.2)
            .font("Helvetica")
            .fillColor("#334155")
            .text(reg.selfIntroduction, 43, currentY + 6, {
              width: usableWidth - 16,
              align: "justify",
              lineGap: 1.5,
            });
          currentY += boxHeight + 6;
        }

        // 8. BANK ACCOUNT DETAILS
        drawSectionHeader("8. BANK ACCOUNT DETAILS");
        drawFieldRow([
          {
            label: "Account Holder Name",
            value: reg.accountHolderName || "N/A",
          },
          { label: "Account No.", value: reg.accountNo || "N/A" },
        ]);
        drawFieldRow([
          { label: "IFSC Code", value: reg.ifscCode || "N/A" },
          { label: "Bank Name", value: reg.bankName || "N/A" },
        ]);
        drawFieldRow([
          {
            label: "Bank Branch Address",
            value: reg.bankBranchAddress || "N/A",
          },
        ]);

        // 9. ATTACHED DOCUMENTS CHECKLIST (Auto-height, Zero Overlapping)
        drawSectionHeader("9. ATTACHED DOCUMENTS & VERIFICATION CHECKLIST");
        drawFieldRow([
          {
            label: "Photograph",
            value: reg.photoName ? `Attached (${reg.photoName})` : "Attached",
          },
          {
            label: "Identity Proof",
            value: reg.identityProofName
              ? `Attached (${reg.identityProofName})`
              : "Attached",
          },
        ]);
        drawFieldRow([
          {
            label: "Education Certificate",
            value: reg.educationCertName
              ? `Attached (${reg.educationCertName})`
              : "Attached",
          },
          {
            label: "Experience Certificate",
            value: reg.experienceCertName
              ? `Attached (${reg.experienceCertName})`
              : "N/A",
          },
        ]);

        // 10. DECLARATION & OFFICIAL VERIFICATION
        checkPageBreak(85);
        drawSectionHeader("10. DECLARATION & OFFICIAL VERIFICATION");
        doc
          .fontSize(7.2)
          .font("Helvetica")
          .fillColor("#4b5563")
          .text(
            "I hereby declare that all information furnished in this Instructor Registration Application Form is true, complete, and accurate. I agree to abide by the rules, regulations, code of conduct, and internship mentorship guidelines of the International Institute of Internship [i3].",
            35,
            currentY,
            { width: usableWidth, align: "justify", lineGap: 1 },
          );
        currentY += 22;

        const signBoxWidth = 185;
        const signBoxHeight = 44;

        checkPageBreak(signBoxHeight + 6);

        // Applicant Signature Box (Left)
        doc
          .rect(35, currentY, signBoxWidth, signBoxHeight)
          .lineWidth(0.6)
          .stroke("#94a3b8");
        doc
          .fontSize(7.8)
          .font("Helvetica-Bold")
          .fillColor("#111827")
          .text(reg.fullName || "Applicant", 42, currentY + 10);
        doc
          .fontSize(6.8)
          .font("Helvetica-Oblique")
          .fillColor("#64748b")
          .text("Digitally Submitted", 42, currentY + 22);
        doc
          .fontSize(6.5)
          .font("Helvetica")
          .fillColor("#94a3b8")
          .text("Applicant's Signature & Date", 42, currentY + 32);

        // Official Verification Box (Right)
        const sealX = pageWidth - 35 - signBoxWidth;
        doc
          .rect(sealX, currentY, signBoxWidth, signBoxHeight)
          .lineWidth(0.8)
          .stroke("#059669");
        doc
          .fontSize(7.8)
          .font("Helvetica-Bold")
          .fillColor("#065f46")
          .text("Authorized Signatory & Seal", sealX + 10, currentY + 10);
        doc
          .fontSize(6.8)
          .font("Helvetica")
          .fillColor("#4b5563")
          .text("International Institute of Internship [i3]", sealX + 10, currentY + 23);
        doc
          .fontSize(6)
          .font("Helvetica-Bold")
          .fillColor("#059669")
          .text("VERIFIED & AUTHENTICATED", sealX + 10, currentY + 33);

        // --- RUNNING FOOTER ON ALL BUFFERED PAGES ---
        const range = doc.bufferedPageRange();
        for (let i = range.start; i < range.start + range.count; i++) {
          doc.switchToPage(i);
          doc.page.margins.bottom = 0;
          doc
            .fontSize(7)
            .font("Helvetica")
            .fillColor("#9ca3af")
            .text(
              `Page ${i + 1} of ${range.count} | Instructor Application Form: ${reg.instructorId || ""}`,
              35,
              pageHeight - 25,
              { align: "center", width: usableWidth, lineBreak: false },
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

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id } = await params;

    const registration = await prisma.instructorRegistration.findFirst({
      where: {
        OR: [{ id }, { instructorId: id }, { userId: id }],
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

    const isSuperAdmin = userRole === "SUPER_ADMIN";
    const isOwner = registration.userId === userId;

    if (!isSuperAdmin && !isOwner) {
      return errorResponse("FORBIDDEN", "Access denied.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const fileBuffer = await generateInstructorRegistrationPDF(registration);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Instructor_Registration_${registration.instructorId || registration.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
