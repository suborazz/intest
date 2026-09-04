import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import PDFDocument from "pdfkit";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
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

    async function generateCertificatePDF(cert: {
      certificateNo: string;
      issuedAt: string;
      studentName: string;
      studentId?: string;
      internshipTitle: string;
      internshipId?: string;
      companyName?: string;
      location?: string;
      duration?: string;
      issuedBy?: string;
      signatureUrl?: string;
      isImmersion?: boolean;
      grade?: string;
      credits?: string;
      mode?: string;
    }): Promise<Buffer> {
      return new Promise((resolve, reject) => {
        try {
          const doc = new PDFDocument({
            size: "A4",
            layout: "landscape",
            margins: { top: 20, bottom: 20, left: 40, right: 40 },
          });
          const chunks: Buffer[] = [];
          doc.on("data", (chunk) => chunks.push(chunk));
          doc.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
          doc.on("error", reject);

          const fontsDir = join(process.cwd(), "public", "fonts");
          doc.registerFont("Cinzel", join(fontsDir, "Cinzel-Bold.ttf"));
          doc.registerFont(
            "PlayfairItalic",
            join(fontsDir, "PlayfairDisplay-Italic.ttf"),
          );

          const PAGE_W = 841.89;
          const PAGE_H = 595.28;
          const amber800 = "#92400e";
          const amber700 = "#b45309";
          const amber600 = "#d97706";
          const slate900 = "#0f172a";
          const gray500 = "#6b7280";

                doc.rect(0, 0, PAGE_W, PAGE_H).fill("#fdfcf9");

                doc
            .rect(24, 24, PAGE_W - 48, PAGE_H - 48)
            .lineWidth(3)
            .stroke(amber800);
          doc
            .rect(32, 32, PAGE_W - 64, PAGE_H - 64)
            .lineWidth(1)
            .stroke(amber600);

                const cornerSize = 34;
          const cornerInset = 40;
          const drawCorner = (x: number, y: number, dx: 1 | -1, dy: 1 | -1) => {
            doc
              .moveTo(x, y + cornerSize * dy)
              .lineTo(x, y)
              .lineTo(x + cornerSize * dx, y)
              .lineWidth(2)
              .stroke(amber600);
          };
          drawCorner(cornerInset, cornerInset, 1, 1);
          drawCorner(PAGE_W - cornerInset, cornerInset, -1, 1);
          drawCorner(cornerInset, PAGE_H - cornerInset, 1, -1);
          drawCorner(PAGE_W - cornerInset, PAGE_H - cornerInset, -1, -1);

          const logoPath = join(process.cwd(), "public", "logo.png");

                try {
            doc.save();
            doc.opacity(0.045);

            const centerX = PAGE_W / 2;
            const centerY = PAGE_H / 2;

                    doc
              .circle(centerX, centerY - 52, 91)
              .lineWidth(8)
              .stroke(amber700);

                    doc
              .moveTo(centerX - 49, centerY + 25)
              .lineTo(centerX - 65, centerY + 143)
              .lineTo(centerX, centerY + 104)
              .lineTo(centerX + 65, centerY + 143)
              .lineTo(centerX + 49, centerY + 25)
              .lineWidth(8)
              .lineJoin("round")
              .lineCap("round")
              .stroke(amber700);

            doc.restore();
          } catch (_e) {}

                doc
            .font("Courier-Bold")
            .fontSize(9)
            .fillColor("#1e293b")
            .text(`Certificate No: `, 65, 50, { continued: true })
            .fillColor(amber800)
            .text(cert.certificateNo);

          doc
            .font("Courier-Bold")
            .fontSize(9)
            .fillColor("#1e293b")
            .text(
              `${cert.studentId?.startsWith("IMM-") ? "Immersion ID" : "Student ID"}: ${cert.studentId || "S2026TS45901"}`,
              PAGE_W - 253,
              50,
              { width: 188, align: "right" },
            );

                if (fs.existsSync(logoPath)) {
            try {
              doc.image(logoPath, PAGE_W / 2 - 40, 36, { width: 80 });
            } catch (_e) {}
          }

          doc
            .font("Cinzel")
            .fontSize(18)
            .fillColor("#064e3b") 
            .text("International Institute of Internship™", 60, 92, {
              align: "center",
              width: PAGE_W - 120,
            });

          doc
            .font("Helvetica")
            .fontSize(9.5)
            .fillColor("#334155")
            .text("A Unit of DPKHRC Trust", 60, 116, {
              align: "center",
              width: PAGE_W - 120,
            });

          doc
            .font("Helvetica-Bold")
            .fontSize(8.5)
            .fillColor("#475569")
            .text("An ISO 21001:2018 Certified Institution", 60, 130, {
              align: "center",
              width: PAGE_W - 120,
            });

          doc
            .font("Helvetica")
            .fontSize(8)
            .fillColor("#64748b")
            .text(
              "Regd. Under Indian Trust Act 1882, Government of India",
              60,
              142,
              {
                align: "center",
                width: PAGE_W - 120,
              },
            );

          doc
            .font("Helvetica-Bold")
            .fontSize(8.5)
            .fillColor("#047857")
            .text("BCC Greens, Deva Road, Lucknow, Uttar Pradesh, India", 60, 154, {
              align: "center",
              width: PAGE_W - 120,
            });

                doc
            .font("Cinzel")
            .fontSize(26)
            .fillColor(amber800)
            .text("CERTIFICATE OF COMPLETION", 60, 182, {
              align: "center",
              width: PAGE_W - 120,
            });

                doc
            .font("PlayfairItalic")
            .fontSize(12)
            .fillColor(gray500)
            .text("This is proudly presented to", 60, 222, {
              align: "center",
              width: PAGE_W - 120,
            });

                doc
            .font("Helvetica-Bold")
            .fontSize(24)
            .fillColor(slate900)
            .text(cert.studentName, 60, 240, {
              align: "center",
              width: PAGE_W - 120,
            });
          doc
            .moveTo(PAGE_W / 2 - 120, 270)
            .lineTo(PAGE_W / 2 + 120, 270)
            .lineWidth(1)
            .stroke("#d1d5db");

                const programType = cert.isImmersion ? "Immersion" : "Internship";
          doc
            .font("Helvetica")
            .fontSize(10.5)
            .fillColor("#334155")
            .text(
              `for successfully completing the ${programType} program`,
              60,
              282,
              { align: "center", width: PAGE_W - 120 },
            );

                doc
            .font("Cinzel")
            .fontSize(15)
            .fillColor(amber700)
            .text(cert.internshipTitle, 60, 306, {
              align: "center",
              width: PAGE_W - 120,
            });

                const programCode = cert.isImmersion
            ? formatImmersionCode(cert.internshipId, cert.internshipTitle)
            : formatInternshipCode(cert.internshipId, cert.companyName);
          const programIdLabel = cert.isImmersion
            ? "Immersion Program ID"
            : "Internship ID";
          const locationOrMode =
            cert.mode !== "ONLINE" && cert.location
              ? `Location: ${cert.location}`
              : `Mode: ${cert.mode === "ONLINE" ? "Online" : cert.mode === "HYBRID" ? "Hybrid" : "Offline"}`;
          const detailsText = `${programIdLabel}: ${programCode}      |      ${locationOrMode}      |      Duration: ${cert.duration || "N/A"}`;
          doc
            .font("Helvetica-Bold")
            .fontSize(9.5)
            .fillColor("#334155")
            .text(detailsText, 60, 330, {
              align: "center",
              width: PAGE_W - 120,
            });

                let currentDrawY = 356;
          if (cert.grade || cert.credits) {
            const gradeText = cert.grade ? `Grade: ${cert.grade}` : "";
            const creditsText = cert.credits ? `Credits: ${cert.credits}` : "";
            const gradeCreditsText = [gradeText, creditsText]
              .filter(Boolean)
              .join("      |      ");

            doc
              .font("Helvetica-Bold")
              .fontSize(10)
              .fillColor("#6d28d9") 
              .text(gradeCreditsText, 60, currentDrawY, {
                align: "center",
                width: PAGE_W - 120,
              });
            currentDrawY += 22;
          }

                doc
            .font("PlayfairItalic")
            .fontSize(12)
            .fillColor(amber800)
            .text("We wish you a bright future.", 60, currentDrawY, {
              align: "center",
              width: PAGE_W - 120,
            });

                const sigY = 462;
          const lineY = 498;
          const textY = 502;

                const tapasSigPath = join(
            process.cwd(),
            "public",
            "signature",
            "tapas.jpeg",
          );
          if (fs.existsSync(tapasSigPath)) {
            try {
              doc.image(tapasSigPath, 80, sigY, {
                fit: [120, 34],
                align: "center",
                valign: "center",
              });
            } catch (_e) {}
          }
          doc.moveTo(80, lineY).lineTo(200, lineY).lineWidth(0.5).stroke(amber600);
          doc
            .font("Helvetica-Bold")
            .fontSize(9)
            .fillColor(slate900)
            .text("Tapas Kumar", 80, textY, { width: 120, align: "center" });
          doc
            .font("Helvetica")
            .fontSize(7.5)
            .fillColor("#475569")
            .text("Chief Executive Officer [i3]", 80, textY + 11, {
              width: 120,
              align: "center",
            });

                const dateStr = new Date(cert.issuedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          doc
            .font("Helvetica-Bold")
            .fontSize(7.5)
            .fillColor("#475569")
            .text("Date: ", 65, textY + 26, {
              continued: true,
              width: 320,
              align: "left",
            })
            .font("Helvetica")
            .text(dateStr);

          doc
            .font("Helvetica-Bold")
            .fontSize(7.5)
            .fillColor("#475569")
            .text("Place: ", 65, textY + 36, {
              continued: true,
              width: 320,
              align: "left",
            })
            .font("Helvetica")
            .text("Lucknow, Uttar Pradesh, India");

                const centerBadgeX = PAGE_W / 2;
          const centerBadgeY = 475;

                doc.circle(centerBadgeX, centerBadgeY, 12).fill("#059669");

                doc
            .moveTo(centerBadgeX - 5, centerBadgeY)
            .lineTo(centerBadgeX - 2, centerBadgeY + 3)
            .lineTo(centerBadgeX + 5, centerBadgeY - 4)
            .lineWidth(2)
            .lineCap("round")
            .stroke("#ffffff");

          doc
            .font("Helvetica-Bold")
            .fontSize(9)
            .fillColor("#059669")
            .text("VERIFIED CERTIFICATE", centerBadgeX - 80, centerBadgeY + 18, {
              align: "center",
              width: 160,
            });

                const webIconX = centerBadgeX - 98;
          const webIconY = 512;

                doc.circle(webIconX, webIconY, 4.5).lineWidth(0.75).stroke("#64748b");
          doc.ellipse(webIconX, webIconY, 2, 4.5).lineWidth(0.75).stroke("#64748b");
          doc
            .moveTo(webIconX - 4.5, webIconY)
            .lineTo(webIconX + 4.5, webIconY)
            .lineWidth(0.75)
            .stroke("#64748b");

          doc
            .font("Helvetica")
            .fontSize(7.5)
            .fillColor("#64748b")
            .text("www.iiinternship.in", centerBadgeX - 88, webIconY - 3, {
              width: 80,
              align: "left",
            });

                doc
            .font("Helvetica")
            .fontSize(7.5)
            .fillColor("#cbd5e1")
            .text("|", centerBadgeX - 2, webIconY - 3, {
              width: 4,
              align: "center",
            });

                const emailIconX = centerBadgeX + 15;
          const emailIconY = 512;

                const envW = 10;
          const envH = 7;
          const envStartX = emailIconX - envW / 2;
          const envStartY = emailIconY - envH / 2;
          doc
            .rect(envStartX, envStartY, envW, envH)
            .lineWidth(0.75)
            .stroke("#64748b");
          doc
            .moveTo(envStartX, envStartY)
            .lineTo(emailIconX, envStartY + 3.5)
            .lineTo(envStartX + envW, envStartY)
            .lineWidth(0.75)
            .stroke("#64748b");

          doc
            .font("Helvetica")
            .fontSize(7.5)
            .fillColor("#64748b")
            .text("i3.office2025@gmail.com", centerBadgeX + 24, emailIconY - 3, {
              width: 105,
              align: "left",
            });

                const rightX = PAGE_W - 200;
          const avishekSigPath = join(
            process.cwd(),
            "public",
            "signature",
            "avishek.jpeg",
          );
          if (fs.existsSync(avishekSigPath)) {
            try {
              doc.image(avishekSigPath, rightX, sigY, {
                fit: [120, 34],
                align: "center",
                valign: "center",
              });
            } catch (_e) {}
          }
          doc
            .moveTo(rightX, lineY)
            .lineTo(rightX + 120, lineY)
            .lineWidth(0.5)
            .stroke(amber600);
          doc
            .font("Helvetica-Bold")
            .fontSize(9)
            .fillColor(slate900)
            .text("Dr. Avishek Kumar", rightX, textY, {
              width: 120,
              align: "center",
            });
          doc
            .font("Helvetica")
            .fontSize(7.5)
            .fillColor("#475569")
            .text("Chief Managing Director [i3]", rightX, textY + 11, {
              width: 120,
              align: "center",
            });

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
      return errorResponse("UNAUTHORIZED", "Unauthorized request.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id } = await params;

        const certificate = await prisma.immersionCertificate.findFirst({
      where: {
        OR: [{ id }, { certificateNo: id }],
      },
      include: {
        application: {
          include: {
            user: { select: { id: true, name: true, registrationNo: true } },
            immersion: {
              select: { id: true, title: true, location: true, period: true },
            },
          },
        },
        issuedBy: { select: { name: true } },
      },
    });

    if (!certificate) {
      return errorResponse("NOT_FOUND", "Certificate not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

            if (
      userRole !== "SUPER_ADMIN" &&
      certificate.application?.user.id !== userId
    ) {
      return errorResponse("FORBIDDEN", "Forbidden request.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const pdfPayload = {
      certificateNo: certificate.certificateNo,
      issuedAt: certificate.issuedAt.toISOString(),
      studentName: certificate.application?.user.name || "Participant",
      studentId: certificate.application?.user.registrationNo || "",
      internshipTitle:
        certificate.application?.immersion?.title || "Immersion Program",
      companyName: "IIInternship Immersion Program",
      location: certificate.application?.immersion?.location || "Remote",
      duration: certificate.application?.immersion?.period || "N/A",
      issuedBy: certificate.issuedBy?.name || undefined,
      isImmersion: true,
      grade: certificate.grade || undefined,
      credits: certificate.credits || undefined,
    };

    const fileBuffer = await generateCertificatePDF(pdfPayload);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificate_${certificate.certificateNo}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
