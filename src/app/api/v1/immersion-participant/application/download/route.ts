import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import PDFDocument from "pdfkit";
import { ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
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

    function formatImmersionCode(
      code?: string | null,
      programTitle?: string | null,
    ): string {
      if (!code) return "IM2026XX10001";
      const trimmed = code.trim();
      if (/^IM\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }
      const sourceText =
        programTitle && programTitle.trim() ? programTitle : trimmed;
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
      const numericPart = code.replace(/[^0-9]/g, "");
      let index = "81251";
      if (numericPart.length >= 5) {
        index = numericPart.slice(-5);
      } else if (numericPart.length > 0) {
        index = numericPart.padStart(5, "0");
      } else {
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
          hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        index = Math.abs((hash % 90000) + 10000).toString();
      }
      return `IM2026${initials}${index}`;
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

    async function generateImmersionApplicationPDF(application: {
      id: string;
      code?: string | null;
      immersion?: { id: string; title: string } | null;
      user: { name: string | null; email: string; registrationNo: string | null };
      preferredDuration: string | null;
      customDuration?: string | null;
      preferredLocation: string | null;
      preferredStartDate: Date | null;
      expectedLearning: string | null;
      careerGoal?: string | null;
      specialTalentSkill?: string | null;
      languagesKnown?: string | null;
      presenceType: string | null;
      fieldVisitsComfort: boolean | null;
      workType: string | null;
      emergencyContactName?: string | null;
      emergencyRelationship?: string | null;
      emergencyMobile?: string | null;
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
      profile?: {
        fullName?: string | null;
        fatherMotherName?: string | null;
        dateOfBirth?: Date | string | null;
        gender?: string | null;
        mobileNumber?: string | null;
        alternateMobileNo?: string | null;
        emailAddress?: string | null;
        photoUrl?: string | null;
        passportPhotoUrl?: string | null;
        currentAddressSameAsPerm?: boolean | null;
        currLocalArea?: string | null;
        currDistrict?: string | null;
        currState?: string | null;
        currCountry?: string | null;
        currPinCode?: string | null;
        permLocalArea?: string | null;
        permDistrict?: string | null;
        permState?: string | null;
        permCountry?: string | null;
        permPinCode?: string | null;
      } | null;
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

          const profile = application.profile;

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
            .text("International Institute of Internship (i3)", 35, headerY, {
              align: "center",
              width: doc.page.width - 70,
            });

          doc
            .fontSize(9)
            .font("Helvetica-Bold")
            .fillColor("#374151")
            .text("OFFICIAL IMMERSION APPLICATION RECORD", 35, headerY + 16, {
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
          const photoUrl = profile?.photoUrl || profile?.passportPhotoUrl;

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
                console.error("Failed to render candidate photo in PDF:", err);
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

          const programName = application.immersion
            ? application.immersion.title
            : "N/A";
          const programCode = application.immersion
            ? formatImmersionCode(
                application.immersion.id,
                application.immersion.title,
              )
            : "N/A";
          const appCodeVal =
            application.code || generateApplicationCode(application.id);

          currentY += drawGridTable(
            currentY,
            [
              [
                { label: "Application ID", value: appCodeVal },
                {
                  label: "Immersion ID (Reg No)",
                  value: application.user.registrationNo || "N/A",
                },
              ],
              [
                { label: "Candidate Name", value: application.user.name || "N/A" },
                { label: "Registered Email", value: application.user.email },
              ],
              [
                { label: "Applied Program", value: programName },
                { label: "Program ID", value: programCode },
              ],
            ],
            430,
          );

          currentY = Math.max(photoY + photoH, currentY) + 8;

                if (profile) {
            checkPageBreak(154);
            drawSectionHeader("PERSONAL PROFILE", currentY);
            currentY += 15;

            const dobStr = profile.dateOfBirth
              ? new Date(profile.dateOfBirth).toLocaleDateString("en-IN")
              : "N/A";
            const altMobile = profile.alternateMobileNo || "N/A";

            currentY += drawGridTable(currentY, [
              [
                { label: "Full Name", value: profile.fullName || "N/A" },
                {
                  label: "Father / Mother Name",
                  value: profile.fatherMotherName || "N/A",
                },
              ],
              [
                { label: "Date of Birth", value: dobStr },
                { label: "Gender", value: profile.gender || "N/A" },
              ],
              [
                { label: "Mobile Number", value: profile.mobileNumber || "N/A" },
                { label: "Alternate Mobile", value: altMobile },
              ],
              [
                {
                  label: "Contact Email Address",
                  value: profile.emailAddress || "N/A",
                },
              ],
            ]);
            currentY += 8;

                    checkPageBreak(100);
            drawSectionHeader("ADDRESS DETAILS", currentY);
            currentY += 15;

            const joinAddress = (parts: (string | null | undefined)[]) => {
              const filled = parts.filter(Boolean);
              return filled.length ? filled.join(", ") : "N/A";
            };

            const permAddr = joinAddress([
              profile.permLocalArea,
              profile.permDistrict,
              profile.permState,
              profile.permCountry,
              profile.permPinCode,
            ]);
            const currAddr = profile.currentAddressSameAsPerm
              ? "Same as permanent address"
              : joinAddress([
                  profile.currLocalArea,
                  profile.currDistrict,
                  profile.currState,
                  profile.currCountry,
                  profile.currPinCode,
                ]);

            currentY += drawGridTable(currentY, [
              [
                { label: "Permanent Address", value: permAddr },
                { label: "Current Address", value: currAddr },
              ],
            ]);
            currentY += 8;
          }

                const academics = application.academics || [];
          if (academics.length > 0) {
            const rowHeight = 22;
            const totalAcadHeight = 15 + rowHeight * (academics.length + 1) + 8;
            checkPageBreak(totalAcadHeight);
            drawSectionHeader("ACADEMIC QUALIFICATIONS", currentY);
            currentY += 15;

            const colWidths = [65, 80, 150, 110, 60, 60];
            const headers = [
              "QUALIFICATION",
              "SPECIALIZATION",
              "INSTITUTE / UNIVERSITY",
              "BOARD",
              "YEAR",
              "SCORE / STATUS",
            ];

            doc.lineWidth(0.5).strokeColor("#cbd5e1");
            doc
              .moveTo(35, currentY)
              .lineTo(35 + usableWidth, currentY)
              .stroke();

            let headerX = 35;
            headers.forEach((h, idx) => {
              doc.save();
              doc
                .rect(
                  headerX + 0.25,
                  currentY + 0.25,
                  colWidths[idx]! - 0.5,
                  rowHeight - 0.5,
                )
                .fillColor("#ecfdf5")
                .fill();
              doc.restore();

              doc
                .font("Helvetica-Bold")
                .fontSize(6)
                .fillColor("#065f46")
                .text(h, headerX + 4, currentY + 7, {
                  width: colWidths[idx]! - 8,
                  align: "center",
                });

              doc
                .moveTo(headerX, currentY)
                .lineTo(headerX, currentY + rowHeight)
                .stroke();
              headerX += colWidths[idx]!;
            });
            doc
              .moveTo(35 + usableWidth, currentY)
              .lineTo(35 + usableWidth, currentY + rowHeight)
              .stroke();
            doc
              .moveTo(35, currentY + rowHeight)
              .lineTo(35 + usableWidth, currentY + rowHeight)
              .stroke();
            currentY += rowHeight;

            academics.forEach((acad) => {
              let rowX = 35;
              const cells = [
                acad.qualification,
                acad.stream || acad.subject || "N/A",
                acad.instituteName || "N/A",
                acad.universityName || "N/A",
                acad.sessionYear || "N/A",
                acad.gradeDivision || acad.status || "N/A",
              ];

              cells.forEach((val, idx) => {
                doc
                  .font("Helvetica")
                  .fontSize(6.5)
                  .fillColor("#0f172a")
                  .text(val, rowX + 4, currentY + 7, {
                    width: colWidths[idx]! - 8,
                    align: "center",
                  });

                doc
                  .moveTo(rowX, currentY)
                  .lineTo(rowX, currentY + rowHeight)
                  .stroke();
                rowX += colWidths[idx]!;
              });
              doc
                .moveTo(35 + usableWidth, currentY)
                .lineTo(35 + usableWidth, currentY + rowHeight)
                .stroke();
              doc
                .moveTo(35, currentY + rowHeight)
                .lineTo(35 + usableWidth, currentY + rowHeight)
                .stroke();
              currentY += rowHeight;
            });
            currentY += 8;
          }

                checkPageBreak(100);
          drawSectionHeader("PROGRAM PREFERENCES", currentY);
          currentY += 15;

          const durationStr = `${application.preferredDuration?.replace("DAYS_", "") || "N/A"} Days${application.customDuration ? ` (${application.customDuration})` : ""}`;
          const startDateStr = application.preferredStartDate
            ? new Date(application.preferredStartDate).toLocaleDateString("en-IN")
            : "N/A";

          currentY += drawGridTable(currentY, [
            [
              { label: "Preferred Duration", value: durationStr },
              {
                label: "Preferred Location",
                value: application.preferredLocation || "N/A",
              },
              { label: "Preferred Start Date", value: startDateStr },
            ],
          ]);
          currentY += 8;

                const showGoals = !!application.careerGoal;
          const showTalent = !!application.specialTalentSkill;
          const showLanguages = !!application.languagesKnown;
          const neededInterestHeight =
            50 +
            (showGoals ? 30 : 0) +
            (showTalent ? 20 : 0) +
            (showLanguages ? 20 : 0);

          checkPageBreak(neededInterestHeight);
          drawSectionHeader("INTERESTS & SKILLS", currentY);
          currentY += 15;

          const rowsSec6 = [
            [
              {
                label: "Expected Learning from this program",
                value: application.expectedLearning || "N/A",
              },
            ],
          ];
          if (showGoals) {
            rowsSec6.push([
              {
                label: "What are your career goals?",
                value: application.careerGoal!,
              },
            ]);
          }
          if (showTalent || showLanguages) {
            const subRow = [];
            if (showTalent)
              subRow.push({
                label: "Special Talent / Skill",
                value: application.specialTalentSkill!,
              });
            if (showLanguages)
              subRow.push({
                label: "Languages Known",
                value: application.languagesKnown!,
              });
            rowsSec6.push(subRow);
          }

          currentY += drawGridTable(currentY, rowsSec6);
          currentY += 8;

                checkPageBreak(120);
          drawSectionHeader("AVAILABILITY & EMERGENCY CONTACT", currentY);
          currentY += 15;

          const presenceStr = application.presenceType?.replace("_", " ") || "N/A";
          const fieldComfort = application.fieldVisitsComfort ? "Yes" : "No";
          const workProfile = application.workType?.replace("_", " ") || "N/A";

          currentY += drawGridTable(currentY, [
            [
              { label: "Presence Type", value: presenceStr },
              { label: "Comfort with field visits", value: fieldComfort },
              { label: "Work Profile", value: workProfile },
            ],
            [
              {
                label: "Emergency Contact Name",
                value: application.emergencyContactName || "N/A",
              },
              {
                label: "Relationship",
                value: application.emergencyRelationship || "N/A",
              },
              {
                label: "Emergency Contact Mobile",
                value: application.emergencyMobile || "N/A",
              },
            ],
          ]);
          currentY += 15;

                doc
            .fontSize(6.5)
            .font("Helvetica-Oblique")
            .fillColor("#64748b")
            .text(
              "This is an auto-generated application form receipt. Remaining details must be uploaded post-login.",
              35,
              currentY,
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
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role");

    if (!userId || userRole !== "IMMERSION_USER") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Immersion Participants only.",
        {
          status: HTTP_2.FORBIDDEN,
        },
      );
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    const application = await prisma.immersionApplication.findFirst({
      where: id ? { id, userId } : { userId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            registrationNo: true,
          },
        },
        immersion: {
          select: {
            id: true,
            title: true,
          },
        },
        academicDetails: true,
      },
    });

    if (!application) {
      return errorResponse("NOT_FOUND", "No application found to download.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const profile = await prisma.immersionParticipantProfile.findUnique({
      where: { userId },
    });

    let finalApp = { ...application };
    if (!application.preferredDuration || !application.presenceType) {
      const fallbackApp = await prisma.immersionApplication.findFirst({
        where: {
          userId: application.userId,
          NOT: { preferredDuration: null },
        },
        include: {
          immersion: {
            select: {
              id: true,
              title: true,
            },
          },
          academicDetails: true,
        },
        orderBy: { createdAt: "desc" },
      });
      if (fallbackApp) {
        finalApp = {
          ...application,
          immersion: application.immersion || fallbackApp.immersion,
          academicDetails: application.academicDetails?.length
            ? application.academicDetails
            : fallbackApp.academicDetails,
          preferredDuration: fallbackApp.preferredDuration,
          customDuration: fallbackApp.customDuration,
          preferredLocation: fallbackApp.preferredLocation,
          preferredStartDate: fallbackApp.preferredStartDate,
          expectedLearning: fallbackApp.expectedLearning,
          presenceType: fallbackApp.presenceType,
          fieldVisitsComfort: fallbackApp.fieldVisitsComfort,
          workType: fallbackApp.workType,
          emergencyContactName: fallbackApp.emergencyContactName,
          emergencyRelationship: fallbackApp.emergencyRelationship,
          emergencyMobile: fallbackApp.emergencyMobile,
        };
      }
    }

        const fileBuffer = await generateImmersionApplicationPDF({
      profile,
      id: finalApp.id,
      code: finalApp.code,
      immersion: finalApp.immersion,
      user: {
        name: finalApp.user.name,
        email: finalApp.user.email,
        registrationNo: finalApp.user.registrationNo,
      },
      preferredDuration: finalApp.preferredDuration,
      customDuration: finalApp.customDuration,
      preferredLocation: finalApp.preferredLocation,
      preferredStartDate: finalApp.preferredStartDate,
      expectedLearning: finalApp.expectedLearning,
      careerGoal: finalApp.careerGoal,
      specialTalentSkill: finalApp.specialTalentSkill,
      languagesKnown: finalApp.languagesKnown,
      presenceType: finalApp.presenceType,
      fieldVisitsComfort: finalApp.fieldVisitsComfort,
      workType: finalApp.workType,
      emergencyContactName: finalApp.emergencyContactName,
      emergencyRelationship: finalApp.emergencyRelationship,
      emergencyMobile: finalApp.emergencyMobile,
      academics: finalApp.academicDetails?.map((ac) => ({
        qualification: ac.qualification,
        stream: ac.stream,
        subject: ac.subject,
        instituteName: ac.instituteName,
        universityName: ac.universityName,
        sessionYear: ac.sessionYear,
        gradeDivision: ac.gradeDivision,
        status: ac.studentStatus,
      })),
    });

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="immersion_application_${application.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
