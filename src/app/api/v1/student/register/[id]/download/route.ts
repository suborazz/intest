import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import PDFDocument from "pdfkit";
import qrcode from "qrcode-generator";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
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

  interface StudentRegistrationForPDF {
    id: string;
    studentId?: string;
    fullName?: string;
    fatherName?: string;
    motherName?: string;
    dob?: string;
    gender?: string;
    category?: string;
    mobileNo?: string;
    internshipGoal?: string;
    aadharNo?: string;
    photoUrl?: string;
    signatureUrl?: string;
    sameAsLocal?: boolean;
    localAddressLocal?: string;
    localAddressDistrict?: string;
    localAddressState?: string;
    localAddressPinCode?: string;
    permAddressLocal?: string;
    permAddressDistrict?: string;
    permAddressState?: string;
    permAddressPinCode?: string;
    createdAt?: string | Date;
    user?: {
      id?: string;
      email?: string;
      name?: string;
    };
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
    skills?: {
      skillName?: string;
      description?: string;
      certifyingBody?: string;
    }[];
  }

  async function generateStudentRegistrationPDF(
    regRaw: Record<string, unknown>,
  ): Promise<Buffer> {
    const reg = regRaw as unknown as StudentRegistrationForPDF;

    return new Promise(async (resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: "A4",
          margins: { top: 15, bottom: 15, left: 24, right: 24 },
          bufferPages: true,
        });
        const chunks: Buffer[] = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", reject);

        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const contentX = 24;
        const usableWidth = pageWidth - 48;

        // Double Border
        doc
          .rect(12, 12, pageWidth - 24, pageHeight - 24)
          .lineWidth(1)
          .stroke("#059669");
        doc
          .rect(15, 15, pageWidth - 30, pageHeight - 30)
          .lineWidth(1.5)
          .stroke("#065F46");

        // Header Section
        const logoPath = join(process.cwd(), "public", "logo.png");
        const headerY = 19;
        const hasLogo = fs.existsSync(logoPath);

        if (hasLogo) {
          try {
            doc.image(logoPath, contentX + 4, headerY, { width: 36 });
          } catch {}
        }

        const studentCode = reg.studentId || "S2026XX10001";

        // Top right Vector QR Code for Instant Verification
        try {
          const host = request.headers.get("host") || "www.iiinternship.in";
          const protocol = host.includes("localhost") ? "http" : "https";
          const verifyUrl = `${protocol}://${host}/verify/id-card/${studentCode}`;

          const qr = qrcode(0, "M");
          qr.addData(verifyUrl);
          qr.make();
          const moduleCount = qr.getModuleCount();
          const qrSize = 35;
          const cellSize = qrSize / moduleCount;
          const qrX = pageWidth - contentX - qrSize - 4;
          const qrY = headerY;

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
            .fontSize(4.5)
            .font("Helvetica-Bold")
            .fillColor("#059669")
            .text("SCAN TO VERIFY", qrX - 8, qrY + qrSize + 2, {
              width: qrSize + 16,
              align: "center",
            });
        } catch (qrErr) {
          console.error("QR Code rendering failed:", qrErr);
        }

        // Center Header Typography
        doc
          .fontSize(13)
          .font("Helvetica-Bold")
          .fillColor("#065f46")
          .text("International Institute of Internship [i3]", contentX, headerY, {
            align: "center",
            width: usableWidth,
          });

        doc
          .fontSize(8)
          .font("Helvetica-Bold")
          .fillColor("#1f2937")
          .text(
            "STUDENT ONBOARDING REGISTRATION RECORD",
            contentX,
            headerY + 14,
            { align: "center", width: usableWidth },
          );

        doc
          .fontSize(6.5)
          .font("Helvetica")
          .fillColor("#4b5563")
          .text(
            "A Unit of DPKHRC Trust  |  Official Verification Record  |  www.iiinternship.in",
            contentX,
            headerY + 25,
            { align: "center", width: usableWidth },
          );

        doc
          .moveTo(contentX, 58)
          .lineTo(pageWidth - contentX, 58)
          .lineWidth(0.5)
          .stroke("#cbd5e1");

        let currentY = 63;

        const drawSectionHeader = (
          title: string,
          y: number,
          width: number = usableWidth,
        ) => {
          doc.fillColor("#ecfdf5").rect(contentX, y, width, 12).fill();
          doc
            .font("Helvetica-Bold")
            .fontSize(7)
            .fillColor("#065f46")
            .text(title, contentX + 6, y + 2.5);
          doc
            .moveTo(contentX, y + 12)
            .lineTo(contentX + width, y + 12)
            .lineWidth(0.6)
            .stroke("#a7f3d0");
        };

        const drawGridTable = (
          y: number,
          rows: { label: string; value: string }[][],
          totalWidth: number = usableWidth,
        ) => {
          let curRowY = y;
          rows.forEach((row) => {
            const colWidth = totalWidth / row.length;
            let maxRowHeight = 0;
            let maxLabelAreaHeight = 0;

            const cellData = row.map((cell) => {
              const labelStr = cell.label.toUpperCase();
              const valueStr = cell.value || "N/A";

              const labelHeight = doc.heightOfString(labelStr, {
                width: colWidth - 8,
              });
              const valueHeight = doc.heightOfString(valueStr, {
                width: colWidth - 8,
              });

              const labelAreaHeight = Math.max(labelHeight + 2, 9);
              const valueAreaHeight = Math.max(valueHeight + 3, 11);
              const cellHeight = labelAreaHeight + valueAreaHeight;

              if (cellHeight > maxRowHeight) maxRowHeight = cellHeight;
              if (labelAreaHeight > maxLabelAreaHeight)
                maxLabelAreaHeight = labelAreaHeight;

              return { labelStr, valueStr, labelAreaHeight, valueAreaHeight };
            });

            maxRowHeight = Math.max(maxRowHeight, 20);
            maxLabelAreaHeight = Math.max(maxLabelAreaHeight, 9);

            let currentX = contentX;
            cellData.forEach((cell) => {
              doc.save();
              doc
                .rect(currentX, curRowY, colWidth, maxLabelAreaHeight)
                .fillColor("#f8fafc")
                .fill();
              doc.restore();

              doc
                .rect(currentX, curRowY, colWidth, maxRowHeight)
                .lineWidth(0.5)
                .stroke("#cbd5e1");

              doc
                .font("Helvetica-Bold")
                .fontSize(5.5)
                .fillColor("#64748b")
                .text(cell.labelStr, currentX + 4, curRowY + 2, {
                  width: colWidth - 8,
                });

              doc
                .moveTo(currentX, curRowY + maxLabelAreaHeight)
                .lineTo(currentX + colWidth, curRowY + maxLabelAreaHeight)
                .lineWidth(0.5)
                .stroke("#e2e8f0");

              doc
                .font("Helvetica")
                .fontSize(6.8)
                .fillColor("#0f172a")
                .text(
                  cell.valueStr,
                  currentX + 4,
                  curRowY + maxLabelAreaHeight + 2,
                  { width: colWidth - 8 },
                );

              currentX += colWidth;
            });

            curRowY += maxRowHeight;
          });

          return curRowY - y;
        };

        // 1. Photo and Summary (Side-by-Side)
        const photoW = 62;
        const photoH = 76;
        const photoX = pageWidth - contentX - photoW;
        const photoY = currentY;
        const summaryWidth = photoX - contentX - 6;

        let photoRendered = false;
        const photoUrl = reg.photoUrl;

        if (photoUrl) {
          const photoBuf = await fetchImageBuffer(photoUrl);
          if (photoBuf) {
            try {
              doc.save();
              doc.rect(photoX, photoY, photoW, photoH).clip();
              doc.image(photoBuf, photoX, photoY, {
                fit: [photoW, photoH],
                align: "center",
                valign: "center",
              });
              photoRendered = true;
            } catch (err) {
              console.error("Failed to render student photo in PDF:", err);
            } finally {
              doc.restore();
            }
          }
        }

        doc
          .rect(photoX, photoY, photoW, photoH)
          .lineWidth(0.5)
          .stroke("#cbd5e1");
        if (!photoRendered) {
          doc
            .fillColor("#f8fafc")
            .rect(photoX + 1, photoY + 1, photoW - 2, photoH - 2)
            .fill();
          doc
            .font("Helvetica-Bold")
            .fontSize(6)
            .fillColor("#64748b")
            .text("PHOTO", photoX, photoY + 30, {
              align: "center",
              width: photoW,
            })
            .font("Helvetica")
            .fontSize(4.5)
            .text("NOT PROVIDED", photoX, photoY + 40, {
              align: "center",
              width: photoW,
            });
        }

        drawSectionHeader("REGISTRATION SUMMARY", currentY, summaryWidth);
        currentY += 12;

        const regDateStr = reg.createdAt
          ? new Date(reg.createdAt).toLocaleDateString("en-IN")
          : "N/A";
        const goalStr = reg.internshipGoal
          ? reg.internshipGoal.replace(/_/g, " ").toUpperCase()
          : "N/A";

        const summaryTableHeight = drawGridTable(
          currentY,
          [
            [
              { label: "Student ID / Reg No", value: studentCode },
              { label: "Registration Date", value: regDateStr },
            ],
            [
              { label: "Internship Goal", value: goalStr },
              {
                label: "Category & Gender",
                value: `${reg.category || "N/A"} / ${reg.gender || "N/A"}`,
              },
            ],
            [
              { label: "Date of Birth", value: reg.dob || "N/A" },
              { label: "Account Status", value: "ACTIVE & VERIFIED" },
            ],
          ],
          summaryWidth,
        );

        currentY = Math.max(photoY + photoH, currentY + summaryTableHeight) + 4;

        // 2. Student & Guardian Profile
        drawSectionHeader("STUDENT & GUARDIAN PROFILE", currentY, usableWidth);
        currentY += 12;

        currentY += drawGridTable(currentY, [
          [
            { label: "Full Name", value: reg.fullName || "N/A" },
            { label: "Mobile Number", value: reg.mobileNo || "N/A" },
          ],
          [
            { label: "Email Address", value: reg.user?.email || "N/A" },
            { label: "Aadhar / ID Number", value: reg.aadharNo || "N/A" },
          ],
          [
            { label: "Father's Name", value: reg.fatherName || "N/A" },
            { label: "Mother's Name", value: reg.motherName || "N/A" },
          ],
        ]);

        currentY += 4;

        // 3. Address Details
        drawSectionHeader("ADDRESS DETAILS", currentY, usableWidth);
        currentY += 12;

        const localAddressStr =
          [
            reg.localAddressLocal,
            reg.localAddressDistrict,
            reg.localAddressState
              ? `${reg.localAddressState}${reg.localAddressPinCode ? ` - ${reg.localAddressPinCode}` : ""}`
              : reg.localAddressPinCode,
          ]
            .filter(Boolean)
            .join(", ") || "N/A";

        const permAddressStr = reg.sameAsLocal
          ? "Same as local address"
          : [
              reg.permAddressLocal,
              reg.permAddressDistrict,
              reg.permAddressState
                ? `${reg.permAddressState}${reg.permAddressPinCode ? ` - ${reg.permAddressPinCode}` : ""}`
                : reg.permAddressPinCode,
            ]
              .filter(Boolean)
              .join(", ") || "Same as local address";

        currentY += drawGridTable(currentY, [
          [
            { label: "Local Address", value: localAddressStr },
            { label: "Permanent Address", value: permAddressStr },
          ],
        ]);

        currentY += 4;

        // 4. Academic Qualifications
        drawSectionHeader("ACADEMIC QUALIFICATIONS", currentY, usableWidth);
        currentY += 12;

        const tableHeaders: {
          text: string;
          width: number;
          align?: "center" | "justify" | "left" | "right";
        }[] = [
          { text: "S.No", width: 24, align: "center" },
          { text: "Qualification", width: 90 },
          { text: "Stream / Subject", width: 110 },
          { text: "Board/University & Institute", width: 188 },
          { text: "Year", width: 60, align: "center" },
          { text: "Grade / Status", width: 75, align: "center" },
        ];

        const drawAcadRow = (
          y: number,
          cells: {
            text: string;
            width: number;
            align?: "center" | "justify" | "left" | "right";
          }[],
          isHeader = false,
        ) => {
          let curX = contentX;
          let maxHeight = 0;

          cells.forEach((cell) => {
            const textHeight = doc.heightOfString(cell.text || "", {
              width: cell.width - 6,
            });
            if (textHeight > maxHeight) maxHeight = textHeight;
          });

          const rowHeight = Math.max(maxHeight + 3, isHeader ? 11 : 13);

          if (isHeader) {
            doc
              .rect(contentX, y, usableWidth, rowHeight)
              .fillAndStroke("#ecfdf5", "#a7f3d0");
          } else {
            doc.rect(contentX, y, usableWidth, rowHeight).stroke("#cbd5e1");
          }

          cells.forEach((cell) => {
            doc
              .rect(curX, y, cell.width, rowHeight)
              .lineWidth(0.5)
              .stroke("#cbd5e1");

            doc
              .font(isHeader ? "Helvetica-Bold" : "Helvetica")
              .fontSize(isHeader ? 6 : 5.5)
              .fillColor(isHeader ? "#065f46" : "#0f172a")
              .text(
                cell.text || "N/A",
                curX + 3,
                y +
                  (rowHeight -
                    doc.heightOfString(cell.text || "N/A", {
                      width: cell.width - 6,
                    })) /
                    2,
                { width: cell.width - 6, align: cell.align || "left" },
              );
            curX += cell.width;
          });

          return rowHeight;
        };

        currentY += drawAcadRow(currentY, tableHeaders, true);

        if (reg.academics && reg.academics.length > 0) {
          reg.academics.forEach((acad, idx) => {
            const cells: {
              text: string;
              width: number;
              align?: "center" | "justify" | "left" | "right";
            }[] = [
              { text: String(idx + 1), width: 24, align: "center" },
              { text: acad.qualification || "N/A", width: 90 },
              { text: acad.stream || acad.subject || "N/A", width: 110 },
              {
                text: `${acad.universityName || "N/A"} - ${acad.instituteName || "N/A"}`,
                width: 188,
              },
              { text: acad.sessionYear || "N/A", width: 60, align: "center" },
              {
                text: `${acad.gradeDivision || "N/A"} (${acad.status || "N/A"})`,
                width: 75,
                align: "center",
              },
            ];
            currentY += drawAcadRow(currentY, cells);
          });
        } else {
          doc.rect(contentX, currentY, usableWidth, 13).stroke("#cbd5e1");
          doc
            .font("Helvetica-Oblique")
            .fontSize(6)
            .fillColor("#64748b")
            .text("No academic records provided.", contentX + 6, currentY + 3.5, {
              width: usableWidth - 12,
            });
          currentY += 13;
        }

        currentY += 4;

        // 5. Skills & Expertise
        drawSectionHeader("SKILLS & EXPERTISE", currentY, usableWidth);
        currentY += 12;

        const skillHeaders: {
          text: string;
          width: number;
          align?: "center" | "justify" | "left" | "right";
        }[] = [
          { text: "Skill Name", width: 140 },
          { text: "Description", width: 407 },
        ];

        const drawSkillRow = (
          y: number,
          cells: {
            text: string;
            width: number;
            align?: "center" | "justify" | "left" | "right";
          }[],
          isHeader = false,
        ) => {
          let curX = contentX;
          let maxHeight = 0;

          cells.forEach((cell) => {
            const textHeight = doc.heightOfString(cell.text || "", {
              width: cell.width - 6,
            });
            if (textHeight > maxHeight) maxHeight = textHeight;
          });

          const rowHeight = Math.max(maxHeight + 3, isHeader ? 11 : 12);

          if (isHeader) {
            doc
              .rect(contentX, y, usableWidth, rowHeight)
              .fillAndStroke("#ecfdf5", "#a7f3d0");
          } else {
            doc.rect(contentX, y, usableWidth, rowHeight).stroke("#cbd5e1");
          }

          cells.forEach((cell) => {
            doc
              .rect(curX, y, cell.width, rowHeight)
              .lineWidth(0.5)
              .stroke("#cbd5e1");

            doc
              .font(isHeader ? "Helvetica-Bold" : "Helvetica")
              .fontSize(isHeader ? 6 : 5.5)
              .fillColor(isHeader ? "#065f46" : "#0f172a")
              .text(
                cell.text || "N/A",
                curX + 3,
                y +
                  (rowHeight -
                    doc.heightOfString(cell.text || "N/A", {
                      width: cell.width - 6,
                    })) /
                    2,
                { width: cell.width - 6, align: cell.align || "left" },
              );
            curX += cell.width;
          });

          return rowHeight;
        };

        currentY += drawSkillRow(currentY, skillHeaders, true);

        if (reg.skills && reg.skills.length > 0) {
          reg.skills.forEach((skill) => {
            const cells = [
              { text: skill.skillName || "N/A", width: 140 },
              {
                text: skill.description || "No description provided.",
                width: 407,
              },
            ];
            currentY += drawSkillRow(currentY, cells);
          });
        } else {
          doc.rect(contentX, currentY, usableWidth, 13).stroke("#cbd5e1");
          doc
            .font("Helvetica-Oblique")
            .fontSize(6)
            .fillColor("#64748b")
            .text("No skills recorded.", contentX + 6, currentY + 3.5, {
              width: usableWidth - 12,
            });
          currentY += 13;
        }

        currentY += 4;

        // 6. Declaration Box
        const decY = currentY;
        const decText =
          "I hereby declare that all information provided in this registration form is true, complete, and correct. Any false statement or omission may lead to cancellation of registration.";
        const decLabelHeight = 10;
        const decValHeight = doc.heightOfString(decText, {
          width: usableWidth - 12,
        });
        const totalDecHeight = decLabelHeight + decValHeight + 5;

        doc.lineWidth(0.5).strokeColor("#cbd5e1");
        doc.rect(contentX, decY, usableWidth, totalDecHeight).stroke();

        doc
          .moveTo(contentX, decY + decLabelHeight)
          .lineTo(contentX + usableWidth, decY + decLabelHeight)
          .stroke();

        doc.save();
        doc
          .rect(
            contentX + 0.25,
            decY + 0.25,
            usableWidth - 0.5,
            decLabelHeight - 0.5,
          )
          .fillColor("#ecfdf5")
          .fill();
        doc.restore();

        doc
          .font("Helvetica-Bold")
          .fontSize(6)
          .fillColor("#065f46")
          .text("DECLARATION", contentX + 6, decY + 2, {
            width: usableWidth - 12,
          });

        doc
          .font("Helvetica")
          .fontSize(5.8)
          .fillColor("#0f172a")
          .text(decText, contentX + 6, decY + decLabelHeight + 2.5, {
            width: usableWidth - 12,
            align: "justify",
          });

        currentY = decY + totalDecHeight + 6;

        // 7. Verification Seal & Candidate Signature (Side-by-Side)
        const footerBlockY = currentY;

        // Left: Official Authenticity Badge
        const stampW = 280;
        const stampH = 36;
        doc
          .rect(contentX, footerBlockY, stampW, stampH)
          .lineWidth(0.5)
          .stroke("#cbd5e1");
        doc.fillColor("#f8fafc").rect(contentX + 0.5, footerBlockY + 0.5, stampW - 1, stampH - 1).fill();
        doc.fillColor("#ecfdf5").rect(contentX + 0.5, footerBlockY + 0.5, stampW - 1, 10).fill();

        doc
          .font("Helvetica-Bold")
          .fontSize(5.5)
          .fillColor("#065f46")
          .text("SYSTEM VERIFICATION & RECORD AUTHENTICITY", contentX + 6, footerBlockY + 2.5);

        doc
          .font("Helvetica")
          .fontSize(5)
          .fillColor("#475569")
          .text(
            `Registered & verified on International Institute of Internship [i3] Registrar Database.\nStudent ID: ${studentCode}  |  Official electronic record.`,
            contentX + 6,
            footerBlockY + 13,
            { width: stampW - 12 },
          );

        // Right: Candidate Signature
        const sigW = 120;
        const sigH = 22;
        const sigX = pageWidth - contentX - sigW;
        const sigY = footerBlockY;
        let sigRendered = false;
        const signatureUrl = reg.signatureUrl;

        if (signatureUrl) {
          const sigBuf = await fetchImageBuffer(signatureUrl);
          if (sigBuf) {
            try {
              doc.save();
              doc.rect(sigX, sigY, sigW, sigH).clip();
              doc.image(sigBuf, sigX, sigY, {
                fit: [sigW, sigH],
                align: "center",
                valign: "center",
              });
              sigRendered = true;
            } catch (err) {
              console.error("Failed to render student signature in PDF:", err);
            } finally {
              doc.restore();
            }
          }
        }

        doc
          .moveTo(sigX, sigY + 23)
          .lineTo(sigX + sigW, sigY + 23)
          .lineWidth(0.7)
          .stroke("#94a3b8");

        doc
          .font("Helvetica-Bold")
          .fontSize(6)
          .fillColor("#334155")
          .text("CANDIDATE'S SIGNATURE", sigX, sigY + 26, {
            width: sigW,
            align: "center",
          });

        if (!sigRendered) {
          doc
            .font("Helvetica-Oblique")
            .fontSize(5.5)
            .fillColor("#94a3b8")
            .text("Digitally Submitted", sigX, sigY + 10, {
              width: sigW,
              align: "center",
            });
        }

        // Single Page Footer Line
        doc
          .font("Helvetica")
          .fontSize(6)
          .fillColor("#94a3b8")
          .text(
            "Official Student Onboarding Registration Record from International Institute of Internship [i3].",
            contentX,
            pageHeight - 22,
            { width: usableWidth, align: "center", lineBreak: false },
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

  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP.UNAUTHORIZED,
      });
    }

    const { id } = await params;

    const registration = await prisma.studentRegistration.findUnique({
      where: { id },
      include: {
        academics: true,
        skills: true,
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
        status: HTTP.NOT_FOUND,
      });
    }

    if (userRole !== "SUPER_ADMIN" && registration.userId !== userId) {
      return errorResponse(
        "FORBIDDEN",
        "You do not have permission to view this registration.",
        { status: HTTP.FORBIDDEN },
      );
    }

    const fileBuffer = await generateStudentRegistrationPDF(registration);

    const rawStudentName =
      registration.fullName ||
      registration.user?.name ||
      registration.studentId ||
      "Student";

    const safeStudentName = rawStudentName
      .trim()
      .replace(/[/\\?%*:|"<>]/g, "")
      .replace(/\s+/g, "_");

    const filename = `${safeStudentName || "Student"}_Application.pdf`;
    const encodedFilename = encodeURIComponent(filename);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
