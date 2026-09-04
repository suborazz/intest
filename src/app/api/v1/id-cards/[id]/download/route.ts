import { NextRequest, NextResponse } from "next/server";
import { X } from "lucide-react";
import fs from "fs";
import { join } from "path";
import PDFDocument from "pdfkit";
import { ZodError } from "zod";
import { v2 as cloudinary } from "cloudinary";
import qrcode from "qrcode-generator";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
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

    const getInitials = (name: string): string => {
      if (!name) return "XX";
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return "XX";
      if (parts.length === 1) {
        const word = parts[0];
        if (word.length >= 2) return word.slice(0, 2).toUpperCase();
        return (word[0] + "X").toUpperCase();
      }
      const first = parts[0][0] || "";
      const last = parts[parts.length - 1][0] || "";
      return (first + last).toUpperCase();
    };

    const XF81bba3e_2 = qrcode;

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

    async function generateEnrollmentIDCardPDF(card: {
      cardNo: string;
      issuedAt: string;
      studentId: string;
      studentName: string;
      studentEmail: string;
      studentMobile: string;
      studentAddress: string;
      photoUrl?: string;
      internshipId: string;
      internshipTitle: string;
      internshipLocation: string;
      origin?: string;
    }): Promise<Buffer> {
      return new Promise(async (resolve, reject) => {
        try {
          const doc = new PDFDocument({ size: [400, 250], margin: 0 });
          const chunks: Buffer[] = [];
          doc.on("data", (chunk) => chunks.push(chunk));
          doc.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
          doc.on("error", reject);

                doc.rect(0, 0, 400, 250).fill("#ffffff");

                doc.rect(5, 5, 390, 240).lineWidth(1.5).stroke("#10b981");
          doc.rect(5, 5, 390, 4).fill("#022c22");

                      const logoPath = join(process.cwd(), "public", "logo.png");
          if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 176, 8, { width: 48 });
          }

                doc
            .fontSize(8)
            .font("Helvetica-Bold")
            .fillColor("#022c22")
            .text("International Institute of Internship™", 20, 36, {
              align: "center",
              width: 360,
            });

          doc
            .fontSize(6)
            .font("Helvetica-Oblique")
            .fillColor("#4b5563")
            .text("Learn Today, Lead Tomorrow", 20, 46, {
              align: "center",
              width: 360,
            });

          doc
            .fontSize(5.5)
            .font("Helvetica-Oblique")
            .fillColor("#4b5563")
            .text("A Unit of DPKHRC Trust", 20, 53, {
              align: "center",
              width: 360,
            });

          doc
            .fontSize(6.5)
            .font("Helvetica-Bold")
            .fillColor("#10b981")
            .text("www.iiinternship.in", 20, 61, { align: "center", width: 360 });

                doc.moveTo(20, 75).lineTo(380, 75).lineWidth(0.5).stroke("#e2e8f0");

                let photoRendered = false;
          if (card.photoUrl) {
            const photoBuf = await fetchImageBuffer(card.photoUrl);
            if (photoBuf) {
              try {
                doc.save();
                doc.roundedRect(24, 84, 52, 64, 4).clip();
                doc.image(photoBuf, 24, 84, {
                  fit: [52, 64],
                  align: "center",
                  valign: "center",
                });
                photoRendered = true;
              } catch (err) {
                console.error(
                  "Failed to render student photo in PDF ID Card:",
                  err,
                );
              } finally {
                doc.restore();
              }
            }
          }

          if (!photoRendered) {
            const initials = getInitials(card.studentName);
                    doc.roundedRect(24, 84, 52, 64, 4).fill("#f4f4f5");
                    doc.roundedRect(24, 84, 52, 64, 4).lineWidth(0.8).stroke("#e4e4e7");
            doc
              .fontSize(16)
              .font("Helvetica-Bold")
              .fillColor("#4b5563")
              .text(initials, 24, 106, { align: "center", width: 52 });
          }

                try {
            const verificationUrl = `${card.origin || "https://www.iiinternship.in"}/login`;
                    const qrGenerator =
              typeof XF81bba3e_2 === "function" ? XF81bba3e_2 : (XF81bba3e_2 as any).default;
            if (!qrGenerator) {
              throw new Error("QR Code generator function not found.");
            }
            const qr = qrGenerator(0, "M");
            qr.addData(verificationUrl);
            qr.make();

            const moduleCount = qr.getModuleCount();
            const qrSize = 52;
            const cellSize = qrSize / moduleCount;

                    doc.rect(26, 156, 52, 52).fill("#ffffff");
                    doc.rect(26, 156, 52, 52).lineWidth(0.5).stroke("#e2e8f0");

                    const startX = 26;
            const startY = 156;

            for (let row = 0; row < moduleCount; row++) {
              for (let col = 0; col < moduleCount; col++) {
                if (qr.isDark(row, col)) {
                  doc
                    .rect(
                      startX + col * cellSize,
                      startY + row * cellSize,
                      cellSize,
                      cellSize,
                    )
                    .fill("#022c22");
                }
              }
            }
          } catch (err) {
            console.error("Failed to generate offline QR code:", err);
          }

          const isImmersion = card.studentId?.startsWith("IMM-");

                const details = [
            [
              isImmersion ? "Immersion ID" : "Student ID",
              card.studentId,
            ],
            ["Student Name", card.studentName],
            ["Student Address", card.studentAddress],
            ["Mobile No.", card.studentMobile],
            ["Email ID", card.studentEmail],
            [
              isImmersion ? "Program Name" : "Internship Name",
              card.internshipTitle,
            ],
            [
              isImmersion ? "Program ID" : "Internship ID",
              isImmersion
                ? formatImmersionCode(card.internshipId, card.internshipTitle)
                : formatInternshipCode(card.internshipId, card.internshipTitle),
            ],
            [
              isImmersion ? "Program Location" : "Internship Location",
              card.internshipLocation,
            ],
            [
              "Issued Date",
              new Date(card.issuedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            ],
          ];

          let currentY = 82;
          details.forEach(([label, value]) => {
                    doc
              .fontSize(7.5)
              .font("Helvetica-Bold")
              .fillColor("#022c22")
              .text(label, 96, currentY, { width: 90 });

                    doc.font("Helvetica").fillColor("#9ca3af").text(":", 184, currentY);

                    doc
              .font("Helvetica")
              .fillColor("#1f2937")
              .text(value || "N/A", 192, currentY, {
                width: 195,
                height: 11,
                lineBreak: false,
                ellipsis: true,
              });

            currentY += 14;
          });

                doc
            .fontSize(7)
            .font("Helvetica-Bold")
            .fillColor("#4b5563")
            .text(
              "This ID Card is Computer Generated. Signature Not Required.",
              20,
              228,
              { align: "center", width: 360 },
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

    if (!userId) {
      return errorResponse("UNAUTHORIZED", "Unauthorized request.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id } = await params;

        const idCard = await prisma.idCard.findFirst({
      where: {
        OR: [{ id }, { enrollmentId: id }, { cardNo: id }],
      },
      include: {
        student: {
          select: {
            name: true,
            email: true,
            studentRegistration: {
              select: {
                studentId: true,
                mobileNo: true,
                photoUrl: true,
                localAddressLocal: true,
                localAddressDistrict: true,
                localAddressState: true,
                localAddressPinCode: true,
              },
            },
          },
        },
        enrollment: {
          include: {
            internship: {
              select: {
                id: true,
                title: true,
                location: true,
              },
            },
          },
        },
      },
    });

    if (!idCard) {
      return errorResponse("NOT_FOUND", "ID Card not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

        if (userRole !== "SUPER_ADMIN" && idCard.studentId !== userId) {
      return errorResponse("FORBIDDEN", "Forbidden request.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const reg = idCard.student.studentRegistration;
    const address = reg
      ? `${reg.localAddressLocal}, ${reg.localAddressDistrict}, ${reg.localAddressState} - ${reg.localAddressPinCode}`
      : "N/A";

    const host = request.headers.get("host") || "www.iiinternship.in";
    const proto = request.headers.get("x-forwarded-proto") || "https";
    const origin = `${proto}://${host}`;

    const pdfPayload = {
      cardNo: idCard.cardNo,
      issuedAt: idCard.issuedAt.toISOString(),
      studentId: reg?.studentId || "N/A",
      studentName: idCard.student.name || "Student",
      studentEmail: idCard.student.email,
      studentMobile: reg?.mobileNo || "N/A",
      studentAddress: address,
      photoUrl: reg?.photoUrl || "",
      internshipId: idCard.enrollment.internship.id,
      internshipTitle: idCard.enrollment.internship.title,
      internshipLocation: idCard.enrollment.internship.location || "Remote",
      origin,
    };

    const fileBuffer = await generateEnrollmentIDCardPDF(pdfPayload);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="id_card_${idCard.cardNo}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
