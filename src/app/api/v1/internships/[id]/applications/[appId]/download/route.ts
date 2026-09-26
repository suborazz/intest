import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import PDFDocument from "pdfkit";
import { ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; appId: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
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
          } catch (e) {}
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

        console.log("[PDF Gen] Fetching remote image:", optimizedUrl);
        const response = await fetch(optimizedUrl);
        if (!response.ok) {
          console.error(
            `[PDF Gen] Remote fetch failed with status: ${response.status} ${response.statusText}`,
          );
          return null;
        }
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
      } catch (error) {
        console.error("[PDF Gen] Failed to fetch image:", error);
        return null;
      }
    }

    function formatInternshipCode(
      code?: string | null,
      companyName?: string | null,
    ): string {
      if (!code) return "IN2026XX10001";

      const trimmed = code.trim();
      if (/^IN\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }

      const sourceText = companyName && companyName.trim() ? companyName : trimmed;
      const words = sourceText
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

      let initials = "HT";
      if (words.length === 1 && words[0]!.length >= 2) {
        initials = words[0]!.slice(0, 2).toUpperCase();
      } else if (words.length >= 2) {
        initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
      }

      let hash = 0;
      for (let i = 0; i < trimmed.length; i++) {
        hash = (hash * 31 + trimmed.charCodeAt(i)) % 2147483647;
      }
      const numericSuffix = (Math.abs(hash) % 90000) + 10000;

      return `IN2026${initials}${numericSuffix}`;
    }

    function generateApplicationCode(
      id: string,
      createdAt?: string | Date | null,
    ): string {
        const date = createdAt ? new Date(createdAt) : new Date();
      const year = String(date.getFullYear()).slice(-2);

        let hash = 0;
      for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) >>> 0; 
      }

        const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const c1 = ALPHA[hash % 26]!;
      const h2 = Math.floor(hash / 26);
      const c2 = ALPHA[h2 % 26]!;
      const h3 = Math.floor(h2 / 26);
      const c3 = ALPHA[h3 % 26]!;

        const h4 = Math.floor(h3 / 26);
      const numeric = String(10000 + (h4 % 90000)).padStart(5, "0");

      return `${year}${c1}${c2}${c3}${numeric}`;
    }

    async function generateInternshipApplicationPDF(application: {
      id: string;
      appliedAt: Date;
      status: string;
      student: {
        name: string | null;
        email: string;
        studentRegistration?: {
          id: string;
          studentId?: string | null;
          fullName: string;
          fatherName: string;
          motherName: string;
          dob: string;
          gender: string;
          category: string;
          mobileNo: string;
          internshipGoal: string;
          aadharNo?: string | null;
          sameAsLocal: boolean;
          localAddressLocal: string;
          localAddressBlock?: string | null;
          localAddressDistrict: string;
          localAddressState: string;
          localAddressCountry: string;
          localAddressPinCode: string;
          permAddressLocal: string;
          permAddressBlock?: string | null;
          permAddressDistrict: string;
          permAddressState: string;
          permAddressCountry: string;
          permAddressPinCode: string;
          photoUrl?: string | null;
          signatureUrl?: string | null;
          academics?: {
            qualification: string;
            stream?: string | null;
            subject?: string | null;
            instituteName?: string | null;
            universityName?: string | null;
            sessionYear?: string | null;
            gradeDivision?: string | null;
            status?: string | null;
          }[];
          skills?: {
            skillName: string;
            description: string;
          }[];
        } | null;
      };
      internship: {
        id: string;
        title: string;
        createdAt: Date;
        companyName?: string | null;
        location?: string | null;
        mode?: string | null;
        type?: string | null;
        duration?: string | null;
        price?: number | null;
        stipendAmount?: number | null;
        startDate?: Date | null;
      };
    }): Promise<Buffer> {
      return new Promise(async (resolve, reject) => {
        try {
                const doc = new PDFDocument({ size: "A4", margin: 35 });
          const chunks: Buffer[] = [];
          doc.on("data", (chunk) => chunks.push(chunk));
          doc.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
          doc.on("error", reject);

                const drawBorder = () => {
            doc
              .rect(15, 15, doc.page.width - 30, doc.page.height - 30)
              .lineWidth(1)
              .stroke("#059669");
            doc
              .rect(18, 18, doc.page.width - 36, doc.page.height - 36)
              .lineWidth(1.5)
              .stroke("#065F46");
          };

                drawBorder();
          doc.on("pageAdded", () => {
            drawBorder();
          });

          const reg = application.student.studentRegistration;

                const logoPath = join(process.cwd(), "public", "logo.png");
          const headerY = 24;
          const hasLogo = fs.existsSync(logoPath);

                if (hasLogo) {
            doc.image(logoPath, 35, headerY, { width: 45 });
          }

          doc
            .fontSize(15)
            .font("Helvetica-Bold")
            .fillColor("#065f46")
            .text("International Institute of Internship [i3]", 35, headerY, {
              align: "center",
              width: doc.page.width - 70,
            });

          doc
            .fontSize(9)
            .font("Helvetica-Bold")
            .fillColor("#374151")
            .text("OFFICIAL INTERNSHIP APPLICATION RECORD", 35, headerY + 16, {
              align: "center",
              width: doc.page.width - 70,
            });

          doc
            .fontSize(7.5)
            .font("Helvetica")
            .fillColor("#4b5563")
            .text(
              "A Unit of DPKHRC Trust  |  Website: www.iiinternship.in",
              35,
              headerY + 28,
              { align: "center", width: doc.page.width - 70 },
            );

                doc
            .moveTo(35, 76)
            .lineTo(doc.page.width - 35, 76)
            .lineWidth(0.5)
            .stroke("#cbd5e1");

          let currentY = 84;
          const usableWidth = 525; 

          const drawSectionHeader = (
            title: string,
            y: number,
            width: number = usableWidth,
          ) => {
            doc.fillColor("#ecfdf5").rect(35, y, width, 15).fill();

            doc
              .font("Helvetica-Bold")
              .fontSize(8)
              .fillColor("#065f46")
              .text(title, 42, y + 4);

            doc
              .moveTo(35, y + 15)
              .lineTo(35 + width, y + 15)
              .lineWidth(0.8)
              .stroke("#a7f3d0");
          };

                const drawGridTable = (
            y: number,
            rows: { label: string; value: string }[][],
            totalWidth: number = usableWidth,
          ) => {
            let currentY = y;

            rows.forEach((row, rowIdx) => {
              const colWidth = totalWidth / row.length;
              let maxRowHeight = 0;
              let maxLabelAreaHeight = 0;

                        const cellData = row.map((cell) => {
                const labelStr = cell.label.toUpperCase();
                const valueStr = cell.value || "N/A";

                const labelHeight = doc.heightOfString(labelStr, {
                  width: colWidth - 12,
                });
                const valueHeight = doc.heightOfString(valueStr, {
                  width: colWidth - 12,
                });

                const labelAreaHeight = labelHeight + 4;
                const valueAreaHeight = valueHeight + 6;
                const cellHeight = labelAreaHeight + valueAreaHeight;

                if (cellHeight > maxRowHeight) {
                  maxRowHeight = cellHeight;
                }
                if (labelAreaHeight > maxLabelAreaHeight) {
                  maxLabelAreaHeight = labelAreaHeight;
                }
                return {
                  labelStr,
                  valueStr,
                  labelHeight,
                  labelAreaHeight,
                  valueAreaHeight,
                };
              });

                        doc.lineWidth(0.5).strokeColor("#cbd5e1");

                        if (rowIdx === 0) {
                doc
                  .moveTo(35, currentY)
                  .lineTo(35 + totalWidth, currentY)
                  .stroke();
              }
              doc
                .moveTo(35, currentY + maxRowHeight)
                .lineTo(35 + totalWidth, currentY + maxRowHeight)
                .stroke();

                        doc
                .moveTo(35, currentY)
                .lineTo(35, currentY + maxRowHeight)
                .stroke();
              doc
                .moveTo(35 + totalWidth, currentY)
                .lineTo(35 + totalWidth, currentY + maxRowHeight)
                .stroke();

                        let currentX = 35;
              cellData.forEach((cell, idx) => {
                            if (idx < row.length - 1) {
                  doc
                    .moveTo(currentX + colWidth, currentY)
                    .lineTo(currentX + colWidth, currentY + maxRowHeight)
                    .stroke();
                }

                            doc
                  .moveTo(currentX, currentY + maxLabelAreaHeight)
                  .lineTo(currentX + colWidth, currentY + maxLabelAreaHeight)
                  .stroke();

                            doc.save();
                doc
                  .rect(
                    currentX + 0.25,
                    currentY + 0.25,
                    colWidth - 0.5,
                    maxLabelAreaHeight - 0.5,
                  )
                  .fillColor("#ecfdf5")
                  .fill();
                doc.restore();

                            doc
                  .font("Helvetica-Bold")
                  .fontSize(6.5)
                  .fillColor("#065f46")
                  .text(cell.labelStr, currentX + 6, currentY + 2.5, {
                    width: colWidth - 12,
                  });

                            doc
                  .font("Helvetica")
                  .fontSize(7)
                  .fillColor("#0f172a")
                  .text(
                    cell.valueStr,
                    currentX + 6,
                    currentY + maxLabelAreaHeight + 3,
                    { width: colWidth - 12 },
                  );

                currentX += colWidth;
              });

              currentY += maxRowHeight;
            });

            return currentY - y;
          };

          const checkPageBreak = (neededHeight: number) => {
            if (currentY + neededHeight > 760) {
              doc.addPage();
              currentY = 35;
            }
          };

                const photoX = 485;
          const photoY = currentY;
          const photoW = 75;
          const photoH = 95;

          let photoRendered = false;
          const photoUrl = reg?.photoUrl;

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

          doc.rect(photoX, photoY, photoW, photoH).lineWidth(0.5).stroke("#cbd5e1");
          if (!photoRendered) {
            doc
              .fillColor("#f8fafc")
              .rect(photoX + 1, photoY + 1, photoW - 2, photoH - 2)
              .fill();
            doc
              .font("Helvetica-Bold")
              .fontSize(6)
              .fillColor("#64748b")
              .text("PHOTO", photoX, photoY + 38, {
                align: "center",
                width: photoW,
              })
              .font("Helvetica")
              .fontSize(5)
              .text("NOT PROVIDED", photoX, photoY + 48, {
                align: "center",
                width: photoW,
              });
          }

          drawSectionHeader("APPLICATION SUMMARY", currentY, 430);
          currentY += 15;

          const internshipCode = formatInternshipCode(
            application.internship.id,
            application.internship.companyName,
          );
          const appliedDateStr = application.appliedAt
            ? new Date(application.appliedAt).toLocaleDateString("en-IN")
            : "N/A";
          const statusLabel = application.status.replace(/_/g, " ").toUpperCase();

          currentY += drawGridTable(
            currentY,
            [
              [
                {
                  label: "Application / Enroll ID",
                  value: generateApplicationCode(
                    application.id,
                    application.appliedAt,
                  ),
                },
                { label: "Internship ID", value: internshipCode },
              ],
              [
                { label: "Applied Date", value: appliedDateStr },
                { label: "Application Status", value: statusLabel },
              ],
            ],
            430,
          );

          currentY = Math.max(photoY + photoH, currentY) + 8;

                checkPageBreak(126);
          drawSectionHeader("INTERNSHIP DETAILS", currentY);
          currentY += 15;

          const typeModeStr = `${application.internship.type || "N/A"} / ${application.internship.mode || "N/A"}`;
          const startDateStr = application.internship.startDate
            ? new Date(application.internship.startDate).toLocaleDateString("en-IN")
            : "N/A";

          currentY += drawGridTable(currentY, [
            [
              { label: "Internship Title", value: application.internship.title },
              {
                label: "Company Name",
                value: application.internship.companyName || "N/A",
              },
            ],
            [
              { label: "Type & Mode", value: typeModeStr },
              {
                label: "Duration",
                value: application.internship.duration || "N/A",
              },
            ],
            [
              {
                label: "Location",
                value: application.internship.location || "Remote",
              },
              { label: "Start Date", value: startDateStr },
            ],
          ]);

          currentY += 8;

                checkPageBreak(154);
          drawSectionHeader("STUDENT PROFILE", currentY);
          currentY += 15;

          const studentName = reg?.fullName || application.student.name || "N/A";
          const studentRegId = reg?.studentId || "N/A";
          const dobStr = reg?.dob || "N/A";
          const genderCategory = `${reg?.gender || "N/A"} / ${reg?.category || "N/A"}`;
          const mobileNumber = reg?.mobileNo || "N/A";
          const emailAddress = application.student.email || "N/A";
          const fatherName = reg?.fatherName || "N/A";
          const motherName = reg?.motherName || "N/A";

          currentY += drawGridTable(currentY, [
            [
              { label: "Full Name", value: studentName },
              { label: "Student ID / Reg No", value: studentRegId },
            ],
            [
              { label: "Date of Birth", value: dobStr },
              { label: "Gender / Category", value: genderCategory },
            ],
            [
              { label: "Mobile Number", value: mobileNumber },
              { label: "Email Address", value: emailAddress },
            ],
            [
              { label: "Father's Name", value: fatherName },
              { label: "Mother's Name", value: motherName },
            ],
          ]);

          currentY += 8;

                checkPageBreak(70);
          drawSectionHeader("ADDRESS DETAILS", currentY);
          currentY += 15;

          const localAddress = reg
            ? `${reg.localAddressLocal}, ${reg.localAddressDistrict}, ${reg.localAddressState} - ${reg.localAddressPinCode}`
            : "N/A";
          const permAddress = reg
            ? reg.sameAsLocal
              ? "Same as local address"
              : `${reg.permAddressLocal}, ${reg.permAddressDistrict}, ${reg.permAddressState} - ${reg.permAddressPinCode}`
            : "N/A";

          currentY += drawGridTable(currentY, [
            [
              { label: "Local Address", value: localAddress },
              { label: "Permanent Address", value: permAddress },
            ],
          ]);

          currentY += 8;

                const acadRowsCount = reg?.academics?.length || 1;
          checkPageBreak(30 + acadRowsCount * 26);
          drawSectionHeader("ACADEMIC QUALIFICATIONS", currentY);
          currentY += 12;

          const tableHeaders: {
            text: string;
            width: number;
            align?: "center" | "justify" | "left" | "right";
          }[] = [
            { text: "S.No", width: 25, align: "center" },
            { text: "Qualification", width: 95 },
            { text: "Stream / Subject", width: 110 },
            { text: "Board/University & Institute", width: 170 },
            { text: "Year", width: 60, align: "center" },
            { text: "Grade / Status", width: 65, align: "center" },
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
            let currentX = 35;
            let maxHeight = 0;

            cells.forEach((cell) => {
              const textHeight = doc.heightOfString(cell.text || "", {
                width: cell.width - 6,
              });
              if (textHeight > maxHeight) maxHeight = textHeight;
            });

            const rowHeight = Math.max(maxHeight + 4, isHeader ? 12 : 15);

                    if (isHeader) {
              doc
                .rect(35, y, usableWidth, rowHeight)
                .fillAndStroke("#ecfdf5", "#a7f3d0");
            } else {
              doc.rect(35, y, usableWidth, rowHeight).stroke("#cbd5e1");
            }

            cells.forEach((cell) => {
              doc
                .rect(currentX, y, cell.width, rowHeight)
                .lineWidth(0.5)
                .stroke("#cbd5e1");

              doc
                .font(isHeader ? "Helvetica-Bold" : "Helvetica")
                .fontSize(isHeader ? 6.5 : 6)
                .fillColor(isHeader ? "#065f46" : "#0f172a")
                .text(
                  cell.text || "N/A",
                  currentX + 3,
                  y +
                    (rowHeight -
                      doc.heightOfString(cell.text || "N/A", {
                        width: cell.width - 6,
                      })) /
                      2,
                  { width: cell.width - 6, align: cell.align || "left" },
                );
              currentX += cell.width;
            });

            return rowHeight;
          };

          currentY += drawAcadRow(currentY, tableHeaders, true);

          if (reg?.academics && reg.academics.length > 0) {
            reg.academics.forEach((acad, idx) => {
              const cells: {
                text: string;
                width: number;
                align?: "center" | "justify" | "left" | "right";
              }[] = [
                { text: String(idx + 1), width: 25, align: "center" },
                { text: acad.qualification || "N/A", width: 95 },
                { text: acad.stream || acad.subject || "N/A", width: 110 },
                {
                  text: `${acad.universityName || "N/A"}\n${acad.instituteName || "N/A"}`,
                  width: 170,
                },
                { text: acad.sessionYear || "N/A", width: 60, align: "center" },
                {
                  text: `${acad.gradeDivision || "N/A"}\n(${acad.status || "N/A"})`,
                  width: 65,
                  align: "center",
                },
              ];
              currentY += drawAcadRow(currentY, cells);
            });
          } else {
            doc.rect(35, currentY, usableWidth, 15).stroke("#cbd5e1");
            doc
              .font("Helvetica-Oblique")
              .fontSize(7)
              .fillColor("#64748b")
              .text("No academic records provided.", 45, currentY + 4, {
                width: usableWidth - 20,
              });
            currentY += 15;
          }

          currentY += 8;

                const skillRowsCount = reg?.skills?.length || 1;
          checkPageBreak(30 + skillRowsCount * 18);
          drawSectionHeader("SKILLS & EXPERTISE", currentY);
          currentY += 12;

          const skillHeaders: {
            text: string;
            width: number;
            align?: "center" | "justify" | "left" | "right";
          }[] = [
            { text: "Skill Name", width: 130 },
            { text: "Description", width: 395 },
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
            let currentX = 35;
            let maxHeight = 0;

            cells.forEach((cell) => {
              const textHeight = doc.heightOfString(cell.text || "", {
                width: cell.width - 8,
              });
              if (textHeight > maxHeight) maxHeight = textHeight;
            });

            const rowHeight = Math.max(maxHeight + 4, isHeader ? 11 : 14);

            if (isHeader) {
              doc
                .rect(35, y, usableWidth, rowHeight)
                .fillAndStroke("#ecfdf5", "#a7f3d0");
            } else {
              doc.rect(35, y, usableWidth, rowHeight).stroke("#cbd5e1");
            }

            cells.forEach((cell) => {
              doc
                .rect(currentX, y, cell.width, rowHeight)
                .lineWidth(0.5)
                .stroke("#cbd5e1");

              doc
                .font(isHeader ? "Helvetica-Bold" : "Helvetica")
                .fontSize(isHeader ? 6.5 : 6)
                .fillColor(isHeader ? "#065f46" : "#0f172a")
                .text(
                  cell.text || "N/A",
                  currentX + 4,
                  y +
                    (rowHeight -
                      doc.heightOfString(cell.text || "N/A", {
                        width: cell.width - 8,
                      })) /
                      2,
                  { width: cell.width - 8, align: cell.align || "left" },
                );
              currentX += cell.width;
            });

            return rowHeight;
          };

          currentY += drawSkillRow(currentY, skillHeaders, true);

          if (reg?.skills && reg.skills.length > 0) {
            reg.skills.forEach((skill) => {
              const cells = [
                { text: skill.skillName || "N/A", width: 130 },
                {
                  text: skill.description || "No description provided.",
                  width: 395,
                },
              ];
              currentY += drawSkillRow(currentY, cells);
            });
          } else {
            doc.rect(35, currentY, usableWidth, 15).stroke("#cbd5e1");
            doc
              .font("Helvetica-Oblique")
              .fontSize(7)
              .fillColor("#64748b")
              .text("No skills recorded.", 45, currentY + 4, {
                width: usableWidth - 20,
              });
            currentY += 15;
          }

          currentY += 8;

                checkPageBreak(151);
          const decY = currentY;
          const decText =
            "I hereby declare that all the information provided in this application is true, complete, and correct to the best of my knowledge and belief. I understand that any false statement or omission may lead to rejection of my application or cancellation of internship.";
          const decLabelHeight = 13;
          const decValHeight = doc.heightOfString(decText, {
            width: usableWidth - 16,
          });
          const totalDecHeight = decLabelHeight + decValHeight + 8;

          doc.lineWidth(0.5).strokeColor("#cbd5e1");
          doc.rect(35, decY, usableWidth, totalDecHeight).stroke();

                doc
            .moveTo(35, decY + decLabelHeight)
            .lineTo(35 + usableWidth, decY + decLabelHeight)
            .stroke();

                doc.save();
          doc
            .rect(35 + 0.25, decY + 0.25, usableWidth - 0.5, decLabelHeight - 0.5)
            .fillColor("#ecfdf5")
            .fill();
          doc.restore();

                doc
            .font("Helvetica-Bold")
            .fontSize(6.5)
            .fillColor("#065f46")
            .text("DECLARATION", 43, decY + 3, { width: usableWidth - 16 });

                doc
            .font("Helvetica")
            .fontSize(7)
            .fillColor("#0f172a")
            .text(decText, 43, decY + decLabelHeight + 4, {
              width: usableWidth - 16,
              align: "justify",
            });

                const sigY = Math.max(660, decY + totalDecHeight + 8);

                const sigX = doc.page.width - 35 - 130;
          let sigRendered = false;
          const signatureUrl = reg?.signatureUrl;
          if (signatureUrl) {
            const sigBuf = await fetchImageBuffer(signatureUrl);
            if (sigBuf) {
              try {
                doc.save();
                doc.rect(sigX, sigY, 130, 24).clip();
                doc.image(sigBuf, sigX, sigY, {
                  fit: [130, 24],
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
            .moveTo(sigX, sigY + 24)
            .lineTo(sigX + 130, sigY + 24)
            .lineWidth(0.5)
            .stroke(sigRendered ? "#cbd5e1" : "#94a3b8");

          doc
            .font("Helvetica-Bold")
            .fontSize(7)
            .fillColor("#374151")
            .text("CANDIDATE'S SIGNATURE", sigX, sigY + 28, {
              width: 130,
              align: "center",
            });

                const footerY = Math.max(765, sigY + 50);
          doc
            .fontSize(7)
            .font("Helvetica")
            .fillColor("#94a3b8")
            .text(
              "Official Internship Application Record from International Institute of Internship [i3].",
              35,
              footerY,
              { align: "center", width: usableWidth },
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
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: internshipId, appId } = await params;

    const application = await prisma.internshipApplication.findFirst({
      where: { id: appId, internshipId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            studentRegistration: {
              include: {
                academics: true,
                skills: true,
              },
            },
          },
        },
        internship: {
          select: {
            id: true,
            title: true,
            companyName: true,
            location: true,
            mode: true,
            type: true,
            duration: true,
            price: true,
            stipendAmount: true,
            startDate: true,
            createdAt: true,
            instructorId: true,
            createdById: true,
          },
        },
      },
    });

    if (!application) {
      return errorResponse("APPLICATION_NOT_FOUND", "Application not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        const isAllowed =
      requesterRole === "SUPER_ADMIN" ||
      application.studentId === requesterId ||
      (requesterRole === "INSTRUCTOR" &&
        (application.internship.instructorId === requesterId ||
          application.internship.createdById === requesterId));

    if (!isAllowed) {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. You do not have permission to view or download this application receipt.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

        const fileBuffer = await generateInternshipApplicationPDF({
      id: application.id,
      appliedAt: application.appliedAt,
      status: application.status,
      student: application.student,
      internship: application.internship,
    });

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="application-${application.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
