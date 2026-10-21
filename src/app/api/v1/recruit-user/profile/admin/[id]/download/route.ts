import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import PDFDocument from "pdfkit";
import qrcode from "qrcode-generator";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

export const dynamic = "force-dynamic";

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

function formatDate(dateInput?: string | Date | null): string {
  if (!dateInput) return "N/A";
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(dateInput);
  }
}

async function generateRecruitRegistrationPDF(
  reg: any,
  request: NextRequest,
): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      // Parallel image fetching
      const [photoBuffer, signatureBuffer] = await Promise.all([
        reg.photoUrl ? fetchImageBuffer(reg.photoUrl) : Promise.resolve(null),
        reg.signatureUrl
          ? fetchImageBuffer(reg.signatureUrl)
          : Promise.resolve(null),
      ]);

      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 25, bottom: 25, left: 25, right: 25 },
        bufferPages: true,
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const usableWidth = pageWidth - 70; // 35 left and right

      // Dual Border (Matching Student Theme)
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

      // Header Renderer
      const drawHeader = (isFirstPage = false) => {
        const logoPath = join(process.cwd(), "public", "logo.png");
        try {
          if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 35, isFirstPage ? 24 : 20, {
              width: isFirstPage ? 45 : 35,
            });
          }
        } catch (_logoErr) {}

        if (isFirstPage) {
          // Dynamic Verification QR Code
          try {
            const host = request.headers.get("host") || "www.iiinternship.in";
            const protocol = host.includes("localhost") ? "http" : "https";
            const verifyUrl = `${protocol}://${host}/verify/id-card/${reg.id}`;

            const qr = qrcode(0, "M");
            qr.addData(verifyUrl);
            qr.make();
            const moduleCount = qr.getModuleCount();
            const qrSize = 40;
            const cellSize = qrSize / moduleCount;
            const qrX = pageWidth - 35 - qrSize;
            const qrY = 22;

            doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4).fill("#FFFFFF");
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
              .text("SCAN TO VERIFY", qrX - 10, qrY + qrSize + 2, {
                width: qrSize + 20,
                align: "center",
              });
          } catch (qrErr) {
            console.error("[PDF Gen] QR Code rendering failed:", qrErr);
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
            .fillColor("#374151")
            .text("JOB APPLICANT / RECRUIT REGISTRATION FORM", 35, 41, {
              align: "center",
              width: usableWidth,
            });
          doc
            .fontSize(7.5)
            .font("Helvetica")
            .fillColor("#4B5563")
            .text(
              "A Unit of DPKHRC Trust  |  Official Verification Record  |  www.iiinternship.in",
              35,
              55,
              { align: "center", width: usableWidth },
            );
          doc
            .moveTo(35, 74)
            .lineTo(pageWidth - 35, 74)
            .lineWidth(0.8)
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
            .fillColor("#374151")
            .text("RECRUIT REGISTRATION FORM (CONTINUED)", 35, 36, {
              align: "center",
              width: usableWidth,
            });
          doc
            .fontSize(7)
            .font("Helvetica")
            .fillColor("#64748B")
            .text(
              `Registration ID: ${reg.id}  |  Applicant: ${reg.fullName || "N/A"}`,
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

      // Initial page 1
      drawPageBorder();
      drawHeader(true);

      // Page break hooks
      doc.on("pageAdded", () => {
        drawPageBorder();
        drawHeader(false);
      });

      let currentY = 82;

      const checkPageBreak = (neededHeight: number) => {
        if (currentY + neededHeight > 750) {
          doc.addPage();
          currentY = 66;
        }
      };

      const drawSectionHeader = (title: string) => {
        checkPageBreak(22);
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
          .lineWidth(0.8)
          .stroke("#a7f3d0");
        currentY += 18;
      };

      // Auto-measuring dynamic field row with zero collision
      const drawFieldRow = (
        items: { label: string; value: unknown }[],
        minRowHeight = 13,
      ) => {
        const colWidth = usableWidth / items.length;
        let maxRowHeight = minRowHeight;

        const measuredItems = items.map((item) => {
          const displayVal = Array.isArray(item.value)
            ? item.value.join(", ")
            : item.value !== undefined && item.value !== null && item.value !== ""
              ? String(item.value)
              : "N/A";
          const labelStr = `${item.label}: `;
          doc.fontSize(7).font("Helvetica");
          const valH = doc.heightOfString(displayVal, {
            width: colWidth - 8,
            lineGap: 1,
          });
          const neededH = Math.max(minRowHeight, valH + 3);
          if (neededH > maxRowHeight) maxRowHeight = neededH;
          return { labelStr, valStr: displayVal };
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
            .fillColor("#4B5563")
            .text(item.valStr, { width: colWidth - 8, lineGap: 1 });
        });

        currentY += maxRowHeight + 2;
      };

      // --- PASSPORT PHOTO & SUMMARY BADGE ---
      const photoWidth = 72;
      const photoHeight = 84;
      const photoX = 35 + usableWidth - photoWidth;
      const photoY = currentY;
      const summaryWidth = usableWidth - photoWidth - 10;

      // Summary Card (Left side of photo)
      doc.rect(35, currentY, summaryWidth, photoHeight).fill("#F8FAFC");
      doc
        .rect(35, currentY, summaryWidth, photoHeight)
        .lineWidth(0.6)
        .stroke("#E2E8F0");

      doc
        .fontSize(8.5)
        .font("Helvetica-Bold")
        .fillColor("#065f46")
        .text("OFFICIAL REGISTRATION SUMMARY", 43, currentY + 7);

      const summaryDetails = [
        ["Registration ID", reg.id || "N/A"],
        ["User Account ID", reg.userId || reg.user?.id || "N/A"],
        ["Candidate Name", reg.fullName || "N/A"],
        ["Registered Date", formatDate(reg.createdAt)],
        ["Primary Contact", `${reg.mobileNo || "N/A"}  |  ${reg.email || reg.user?.email || "N/A"}`],
        ["Verification Status", "Verified Applicant Profile"],
      ];

      let badgeY = currentY + 20;
      summaryDetails.forEach(([k, v]) => {
        doc
          .fontSize(6.8)
          .font("Helvetica-Bold")
          .fillColor("#374151")
          .text(`${k}: `, 43, badgeY, { continued: true })
          .font("Helvetica")
          .fillColor("#4B5563")
          .text(v as string);
        badgeY += 9.5;
      });

      // Passport Photo (Right side)
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
            .stroke("#cbd5e1");
        } catch (_photoErr) {
          doc
            .rect(photoX, photoY, photoWidth, photoHeight)
            .fillAndStroke("#F3F4F6", "#9CA3AF");
          doc
            .fontSize(6.5)
            .font("Helvetica")
            .fillColor("#6B7280")
            .text("PASSPORT PHOTO", photoX + 2, photoY + 36, {
              width: photoWidth - 4,
              align: "center",
            });
        }
      } else {
        doc
          .rect(photoX, photoY, photoWidth, photoHeight)
          .fillAndStroke("#F3F4F6", "#9CA3AF");
        doc
          .fontSize(6.5)
          .font("Helvetica")
          .fillColor("#6B7280")
          .text("PASSPORT PHOTO", photoX + 2, photoY + 36, {
            width: photoWidth - 4,
            align: "center",
          });
      }

      currentY += photoHeight + 10;

      // --- SECTION 1: APPLICANT DEMOGRAPHIC & PERSONAL DETAILS ---
      drawSectionHeader("1. APPLICANT DEMOGRAPHIC & PERSONAL DETAILS");

      drawFieldRow([
        { label: "Full Name", value: reg.fullName },
        { label: "Father's Name", value: reg.fatherName },
      ]);
      drawFieldRow([
        { label: "Mother's Name", value: reg.motherName },
        { label: "Date of Birth", value: reg.dob },
      ]);
      drawFieldRow([
        { label: "Gender", value: reg.gender },
        { label: "Marital Status", value: reg.maritalStatus },
      ]);
      drawFieldRow([
        { label: "Category", value: reg.category },
        { label: "Blood Group", value: reg.bloodGroup },
      ]);
      drawFieldRow([
        { label: "Nationality", value: reg.nationality || "Indian" },
        { label: "Religion", value: reg.religion },
      ]);
      drawFieldRow([
        { label: "Gotra", value: reg.gotra || "N/A" },
        {
          label: "Physically Challenged",
          value: reg.physicallyChallenged ? "Yes" : "No",
        },
      ]);
      drawFieldRow([
        { label: "Languages Known", value: reg.languagesKnown },
        { label: "Aadhar No", value: reg.aadharNo || "N/A" },
      ]);
      drawFieldRow([
        { label: "Hobbies / Interests", value: reg.hobby || "N/A" },
        { label: "Account Email", value: reg.email || reg.user?.email },
      ]);

      currentY += 5;

      // --- SECTION 2: CONTACT & RESIDENTIAL ADDRESSES ---
      drawSectionHeader("2. CONTACT & RESIDENTIAL DETAILS");

      const currAddrStr = [
        reg.currAddressLocal,
        reg.currAddressDistrict,
        reg.currAddressState,
        reg.currAddressCountry,
        reg.currAddressPinCode ? `PIN: ${reg.currAddressPinCode}` : "",
      ]
        .filter(Boolean)
        .join(", ") || "N/A";

      const permAddrStr = [
        reg.permAddressLocal,
        reg.permAddressDistrict,
        reg.permAddressState,
        reg.permAddressCountry,
        reg.permAddressPinCode ? `PIN: ${reg.permAddressPinCode}` : "",
      ]
        .filter(Boolean)
        .join(", ") || "N/A";

      drawFieldRow([
        { label: "Mobile Number", value: reg.mobileNo },
        { label: "Alternate Email", value: reg.email || reg.user?.email },
      ]);
      drawFieldRow([
        { label: "Current Address", value: currAddrStr },
      ]);
      drawFieldRow([
        { label: "Permanent Address", value: permAddrStr },
      ]);

      currentY += 5;

      // --- SECTION 3: ACADEMIC QUALIFICATIONS ---
      drawSectionHeader("3. ACADEMIC QUALIFICATIONS");

      const acadColumns = [
        { title: "Qualification", width: 85 },
        { title: "Board / University", width: 105 },
        { title: "School / Institute", width: 115 },
        { title: "Passing Year", width: 60 },
        { title: "Division", width: 45 },
        { title: "Marks (%)", width: 45 },
        { title: "Subject / Stream", width: 70 },
      ];

      // Academics Table Header
      checkPageBreak(18);
      doc.rect(35, currentY, usableWidth, 13).fillAndStroke("#ecfdf5", "#a7f3d0");
      let colOffset = 35;
      acadColumns.forEach((c) => {
        doc
          .fontSize(6.5)
          .font("Helvetica-Bold")
          .fillColor("#065f46")
          .text(c.title, colOffset + 3, currentY + 3.2, {
            width: c.width - 6,
            align: "left",
          });
        colOffset += c.width;
      });
      currentY += 14;

      if (!reg.academics || reg.academics.length === 0) {
        checkPageBreak(15);
        doc.rect(35, currentY, usableWidth, 13).fill("#F8FAFC");
        doc
          .fontSize(6.5)
          .font("Helvetica-Oblique")
          .fillColor("#64748B")
          .text("No formal academic qualification records submitted.", 42, currentY + 3.5);
        currentY += 15;
      } else {
        reg.academics.forEach((acad: any, idx: number) => {
          const rowBg = idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC";
          const rowData = [
            String(acad.qualification || "N/A"),
            String(acad.boardUniversity || "N/A"),
            String(acad.schoolInstitute || "N/A"),
            acad.startYear && acad.endYear
              ? `${acad.startYear} - ${acad.endYear}`
              : String(acad.endYear || acad.startYear || "N/A"),
            String(acad.passingDivision || "N/A"),
            acad.passingMarks !== undefined && acad.passingMarks !== null
              ? `${acad.passingMarks}%`
              : "N/A",
            String(acad.subject || "N/A"),
          ];

          // Compute max text height for this row
          let rowHeight = 13;
          doc.fontSize(6.5).font("Helvetica");
          rowData.forEach((val, i) => {
            const h = doc.heightOfString(val, {
              width: acadColumns[i].width - 6,
              lineGap: 1,
            });
            if (h + 4 > rowHeight) rowHeight = h + 4;
          });

          checkPageBreak(rowHeight + 2);

          doc.rect(35, currentY, usableWidth, rowHeight).fill(rowBg);
          doc
            .rect(35, currentY, usableWidth, rowHeight)
            .lineWidth(0.4)
            .stroke("#E2E8F0");

          let x = 35;
          rowData.forEach((val, i) => {
            doc
              .fontSize(6.3)
              .font("Helvetica")
              .fillColor("#374151")
              .text(val, x + 3, currentY + 2.5, {
                width: acadColumns[i].width - 6,
                lineGap: 1,
              });
            x += acadColumns[i].width;
          });

          currentY += rowHeight;
        });
      }

      currentY += 7;

      // --- SECTION 4: PROFESSIONAL WORK EXPERIENCE ---
      drawSectionHeader("4. PROFESSIONAL WORK EXPERIENCE");

      const expColumns = [
        { title: "Employer / Organization", width: 120 },
        { title: "Designation", width: 95 },
        { title: "Posting Location", width: 75 },
        { title: "Period / Duration", width: 90 },
        { title: "Exp (Yrs)", width: 45 },
        { title: "Nature of Work / Role", width: 100 },
      ];

      // Experience Table Header
      checkPageBreak(18);
      doc.rect(35, currentY, usableWidth, 13).fillAndStroke("#ecfdf5", "#a7f3d0");
      let expColOffset = 35;
      expColumns.forEach((c) => {
        doc
          .fontSize(6.5)
          .font("Helvetica-Bold")
          .fillColor("#065f46")
          .text(c.title, expColOffset + 3, currentY + 3.2, {
            width: c.width - 6,
            align: "left",
          });
        expColOffset += c.width;
      });
      currentY += 14;

      if (!reg.experiences || reg.experiences.length === 0) {
        checkPageBreak(15);
        doc.rect(35, currentY, usableWidth, 13).fill("#F8FAFC");
        doc
          .fontSize(6.5)
          .font("Helvetica-Oblique")
          .fillColor("#64748B")
          .text("Fresher / No prior professional experience logged.", 42, currentY + 3.5);
        currentY += 15;
      } else {
        reg.experiences.forEach((exp: any, idx: number) => {
          const rowBg = idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC";
          const periodStr = `${formatDate(exp.startDate)} to ${exp.endDate ? formatDate(exp.endDate) : "Present"}`;
          const rowData = [
            String(exp.employerName || "N/A"),
            String(exp.designation || "N/A"),
            String(exp.postingLocation || "N/A"),
            periodStr,
            exp.experienceYears !== undefined && exp.experienceYears !== null
              ? `${exp.experienceYears} Yrs`
              : "N/A",
            String(exp.natureOfWork || "N/A"),
          ];

          let rowHeight = 13;
          doc.fontSize(6.5).font("Helvetica");
          rowData.forEach((val, i) => {
            const h = doc.heightOfString(val, {
              width: expColumns[i].width - 6,
              lineGap: 1,
            });
            if (h + 4 > rowHeight) rowHeight = h + 4;
          });

          checkPageBreak(rowHeight + 2);

          doc.rect(35, currentY, usableWidth, rowHeight).fill(rowBg);
          doc
            .rect(35, currentY, usableWidth, rowHeight)
            .lineWidth(0.4)
            .stroke("#E2E8F0");

          let x = 35;
          rowData.forEach((val, i) => {
            doc
              .fontSize(6.3)
              .font("Helvetica")
              .fillColor("#374151")
              .text(val, x + 3, currentY + 2.5, {
                width: expColumns[i].width - 6,
                lineGap: 1,
              });
            x += expColumns[i].width;
          });

          currentY += rowHeight;
        });
      }

      currentY += 8;

      // --- SECTION 5: STATUTORY DECLARATION & SIGNATURES ---
      drawSectionHeader("5. STATUTORY DECLARATION & AUTHENTICATION");

      const declarationText =
        "I hereby solemnly declare and affirm that all the statements and particulars furnished in this job applicant profile registration are true, complete, and correct to the best of my knowledge and belief. I understand that in the event of any information being found false, fabricated, or incorrect at any stage of recruitment or selection, my registration and candidature shall stand summarily cancelled without any notice.";

      checkPageBreak(110);

      doc
        .fontSize(6.5)
        .font("Helvetica")
        .fillColor("#4B5563")
        .text(declarationText, 35, currentY, {
          width: usableWidth,
          lineGap: 1.5,
          align: "justify",
        });

      currentY += 28;

      // Signatures Area
      const sigBlockY = currentY;
      const sigWidth = 140;
      const candSigX = 40;
      const authSigX = 35 + usableWidth - sigWidth - 5;

      // Candidate Signature (Left)
      let candSigRendered = false;
      if (signatureBuffer) {
        try {
          doc.save();
          doc.rect(candSigX, sigBlockY, sigWidth, 26).clip();
          doc.image(signatureBuffer, candSigX, sigBlockY, {
            fit: [sigWidth, 26],
            align: "center",
            valign: "center",
          });
          candSigRendered = true;
        } catch (_sigErr) {
          console.error("[PDF Gen] Candidate signature rendering failed");
        } finally {
          doc.restore();
        }
      }

      doc
        .moveTo(candSigX, sigBlockY + 28)
        .lineTo(candSigX + sigWidth, sigBlockY + 28)
        .lineWidth(0.8)
        .stroke("#94A3B8");

      doc
        .font("Helvetica-Bold")
        .fontSize(6.8)
        .fillColor("#065f46")
        .text("CANDIDATE SIGNATURE", candSigX, sigBlockY + 32, {
          width: sigWidth,
          align: "center",
        });

      if (!candSigRendered) {
        doc
          .font("Helvetica-Oblique")
          .fontSize(6)
          .fillColor("#64748B")
          .text("Digitally Authenticated", candSigX, sigBlockY + 12, {
            width: sigWidth,
            align: "center",
          });
      }

      doc
        .font("Helvetica")
        .fontSize(6)
        .fillColor("#64748B")
        .text(`Date of Filing: ${formatDate(reg.createdAt)}`, candSigX, sigBlockY + 42, {
          width: sigWidth,
          align: "center",
        });

      // Authorized Officer / Seal Box (Right)
      doc
        .rect(authSigX, sigBlockY - 4, sigWidth, 48)
        .lineWidth(0.6)
        .stroke("#CBD5E1");

      doc
        .font("Helvetica-Bold")
        .fontSize(6)
        .fillColor("#059669")
        .text("INSTITUTIONAL SEAL & AUTHENTICATION", authSigX + 5, sigBlockY + 2, {
          width: sigWidth - 10,
          align: "center",
        });

      doc
        .moveTo(authSigX + 15, sigBlockY + 30)
        .lineTo(authSigX + sigWidth - 15, sigBlockY + 30)
        .lineWidth(0.6)
        .stroke("#94A3B8");

      doc
        .font("Helvetica-Bold")
        .fontSize(6.5)
        .fillColor("#1F2937")
        .text("Registrar / Authorized Officer", authSigX, sigBlockY + 33, {
          width: sigWidth,
          align: "center",
        });

      doc
        .font("Helvetica")
        .fontSize(5.5)
        .fillColor("#64748B")
        .text("International Institute of Internship [i3]", authSigX, sigBlockY + 41, {
          width: sigWidth,
          align: "center",
        });

      // --- MULTI-PAGE NUMBERING & FOOTERS ---
      const range = doc.bufferedPageRange();
      for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        doc.page.margins.bottom = 0;
        doc
          .moveTo(35, pageHeight - 28)
          .lineTo(pageWidth - 35, pageHeight - 28)
          .lineWidth(0.5)
          .stroke("#E2E8F0");

        doc
          .font("Helvetica")
          .fontSize(6)
          .fillColor("#64748B")
          .text(
            `Registration ID: ${reg.id}  |  Official Record of International Institute of Internship  |  Page ${i + 1} of ${range.count}`,
            35,
            pageHeight - 22,
            { width: usableWidth, align: "center", lineBreak: false },
          );
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "SUPER_ADMIN") {
      return errorResponse("FORBIDDEN", "Super Admin only.", {
        status: HTTP.FORBIDDEN,
      });
    }

    const { id } = await params;

    const registration = await prisma.recruitProfile.findUnique({
      where: { id },
      include: {
        academics: {
          orderBy: { startYear: "asc" },
        },
        experiences: {
          orderBy: { startDate: "desc" },
        },
        user: { select: { id: true, email: true, name: true, createdAt: true } },
      },
    });

    if (!registration) {
      return errorResponse("NOT_FOUND", "Profile not found.", {
        status: HTTP.NOT_FOUND,
      });
    }

    const fileBuffer = await generateRecruitRegistrationPDF(registration, request);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="recruit_registration_${registration.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
