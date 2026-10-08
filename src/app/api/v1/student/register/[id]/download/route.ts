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
          margin: 35,
          bufferPages: true,
        });
        const chunks: Buffer[] = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
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

        const logoPath = join(process.cwd(), "public", "logo.png");
        const headerY = 24;
        const hasLogo = fs.existsSync(logoPath);

        if (hasLogo) {
          doc.image(logoPath, 35, headerY, { width: 45 });
        }

        const studentCode = reg.studentId || "S2026XX10001";

        // Top right QR Code for Instant Smartphone Verification
        try {
          const host = request.headers.get("host") || "www.iiinternship.in";
          const protocol = host.includes("localhost") ? "http" : "https";
          const verifyUrl = `${protocol}://${host}/verify/id-card/${studentCode}`;

          const qr = qrcode(0, "M");
          qr.addData(verifyUrl);
          qr.make();
          const qrDataUrl = qr.createDataURL(4, 0);
          const qrMatches = qrDataUrl.match(
            /^data:image\/[a-zA-Z+]+;base64,(.+)$/,
          );
          if (qrMatches && qrMatches[1]) {
            const qrBuf = Buffer.from(qrMatches[1], "base64");
            const qrSize = 42;
            const qrX = doc.page.width - 35 - qrSize;
            const qrY = headerY - 1;
            doc.image(qrBuf, qrX, qrY, {
              width: qrSize,
              height: qrSize,
            });
            doc
              .fontSize(5)
              .font("Helvetica-Bold")
              .fillColor("#059669")
              .text("SCAN TO VERIFY", qrX - 10, qrY + qrSize + 1, {
                width: qrSize + 20,
                align: "center",
              });
          }
        } catch (qrErr) {
          console.error("QR Code rendering failed:", qrErr);
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
          .text("STUDENT ONBOARDING REGISTRATION RECORD", 35, headerY + 16, {
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
          let curRowY = y;

          rows.forEach((row) => {
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
                valueHeight,
                labelAreaHeight,
                valueAreaHeight,
              };
            });

            maxRowHeight = Math.max(maxRowHeight, 28);
            maxLabelAreaHeight = Math.max(maxLabelAreaHeight, 12);

            let currentX = 35;
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
                .fontSize(6)
                .fillColor("#64748b")
                .text(cell.labelStr, currentX + 6, curRowY + 3, {
                  width: colWidth - 12,
                });

              doc
                .moveTo(currentX, curRowY + maxLabelAreaHeight)
                .lineTo(currentX + colWidth, curRowY + maxLabelAreaHeight)
                .lineWidth(0.5)
                .stroke("#e2e8f0");

              doc
                .font("Helvetica")
                .fontSize(7.5)
                .fillColor("#0f172a")
                .text(
                  cell.valueStr,
                  currentX + 6,
                  curRowY + maxLabelAreaHeight + 3,
                  {
                    width: colWidth - 12,
                  },
                );

              currentX += colWidth;
            });

            curRowY += maxRowHeight;
          });

          return curRowY - y;
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

        drawSectionHeader("REGISTRATION SUMMARY", currentY, 430);
        currentY += 15;

        const regDateStr = reg.createdAt
          ? new Date(reg.createdAt).toLocaleDateString("en-IN")
          : "N/A";
        const goalStr = reg.internshipGoal
          ? reg.internshipGoal.replace(/_/g, " ").toUpperCase()
          : "N/A";

        currentY += drawGridTable(
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
          430,
        );

        currentY = Math.max(photoY + photoH, currentY) + 8;

        checkPageBreak(120);
        drawSectionHeader("STUDENT & GUARDIAN PROFILE", currentY);
        currentY += 15;

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

        currentY += 8;

        checkPageBreak(90);
        drawSectionHeader("ADDRESS DETAILS", currentY);
        currentY += 15;

        const localAddressStr = [
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

        currentY += 8;

        const acadRowsCount = reg.academics?.length || 1;
        checkPageBreak(35 + acadRowsCount * 22);
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

        if (reg.academics && reg.academics.length > 0) {
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

        const skillRowsCount = reg.skills?.length || 1;
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

        if (reg.skills && reg.skills.length > 0) {
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

        checkPageBreak(120);
        const decY = currentY;
        const decText =
          "I hereby declare that all the information provided in this student registration dossier is true, complete, and correct to the best of my knowledge and belief. I understand that any false statement or omission may lead to rejection or cancellation of registration.";
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
          .rect(
            35 + 0.25,
            decY + 0.25,
            usableWidth - 0.5,
            decLabelHeight - 0.5,
          )
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

        const sigY = Math.max(680, decY + totalDecHeight + 8);
        const sigX = doc.page.width - 35 - 130;
        let sigRendered = false;
        const signatureUrl = reg.signatureUrl;

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
          .moveTo(sigX, sigY + 26)
          .lineTo(sigX + 130, sigY + 26)
          .lineWidth(0.8)
          .stroke("#94a3b8");

        doc
          .font("Helvetica-Bold")
          .fontSize(6.5)
          .fillColor("#334155")
          .text("CANDIDATE'S SIGNATURE", sigX, sigY + 30, {
            width: 130,
            align: "center",
          });

        if (!sigRendered) {
          doc
            .font("Helvetica-Oblique")
            .fontSize(6)
            .fillColor("#94a3b8")
            .text("Digitally Submitted", sigX, sigY + 12, {
              width: 130,
              align: "center",
            });
        }

        const range = doc.bufferedPageRange();
        for (let i = range.start; i < range.start + range.count; i++) {
          doc.switchToPage(i);
          doc
            .font("Helvetica")
            .fontSize(6.5)
            .fillColor("#94a3b8")
            .text(
              "Official Student Onboarding Registration Record from International Institute of Internship [i3].",
              35,
              doc.page.height - 25,
              { width: doc.page.width - 70, align: "center" },
            );
        }

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

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="student_registration_${registration.studentId || registration.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
