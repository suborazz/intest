import { NextRequest, NextResponse } from "next/server";
import { X } from "lucide-react";
import fs from "fs";
import { join } from "path";
import PDFDocument from "pdfkit";
import { ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
import qrcode from "qrcode-generator";
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

    async function generateInstructorIDCardPDF(card: {
      cardNo: string;
      issuedAt: string;
      instructorId: string;
      instructorName: string;
      instructorEmail: string;
      instructorMobile: string;
      instructorAddress: string;
      photoUrl?: string;
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

                doc.rect(5, 5, 390, 240).lineWidth(1.5).stroke("#0d9488"); 
          doc.rect(5, 5, 390, 4).fill("#115e59"); 

                      const logoPath = join(process.cwd(), "public", "logo.png");
          if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 176, 8, { width: 48 });
          }

                doc
            .fontSize(8)
            .font("Helvetica-Bold")
            .fillColor("#115e59")
            .text("International Institute of Internship™", 20, 36, {
              align: "center",
              width: 360,
            });

          doc
            .fontSize(5.5)
            .font("Helvetica-Oblique")
            .fillColor("#4b5563")
            .text("A Unit of DPKHRC Trust", 20, 45, {
              align: "center",
              width: 360,
            });

          doc
            .fontSize(5.5)
            .font("Helvetica-Oblique")
            .fillColor("#4b5563")
            .text("An ISO 21001:2018 Certified Institution", 20, 51, {
              align: "center",
              width: 360,
            });

          doc
            .fontSize(5)
            .font("Helvetica-Oblique")
            .fillColor("#4b5563")
            .text(
              "Regd. Under Indian Trust Act 1882, Government of India",
              20,
              58,
              { align: "center", width: 360 },
            );

          doc
            .fontSize(6.5)
            .font("Helvetica-Bold")
            .fillColor("#0d9488")
            .text("www.iiinternship.in", 20, 65, { align: "center", width: 360 });

                doc.moveTo(20, 75).lineTo(380, 75).lineWidth(0.5).stroke("#cbd5e1");

                doc
            .fontSize(8)
            .font("Helvetica-Bold")
            .fillColor("#0f766e")
            .text("~ Instructor ID Card ~", 20, 80, {
              align: "center",
              width: 360,
            });

                let photoRendered = false;
          if (card.photoUrl) {
            const photoBuf = await fetchImageBuffer(card.photoUrl);
            if (photoBuf) {
              try {
                doc.save();
                doc.roundedRect(24, 94, 52, 64, 4).clip();
                doc.image(photoBuf, 24, 94, {
                  fit: [52, 64],
                  align: "center",
                  valign: "center",
                });
                photoRendered = true;
              } catch (err) {
                console.error(
                  "Failed to render instructor photo in PDF ID Card:",
                  err,
                );
              } finally {
                doc.restore();
              }
            }
          }

          if (!photoRendered) {
            const initials = getInitials(card.instructorName);
            doc.roundedRect(24, 94, 52, 64, 4).fill("#f4f4f5");
            doc.roundedRect(24, 94, 52, 64, 4).lineWidth(0.8).stroke("#e4e4e7");
            doc
              .fontSize(16)
              .font("Helvetica-Bold")
              .fillColor("#4b5563")
              .text(initials, 24, 116, { align: "center", width: 52 });
          }

                try {
            const verificationUrl = `${card.origin || "https://www.iiinternship.in"}/verify/id-card/${card.cardNo}`;
            const qrGenerator =
              typeof XF81bba3e_2 === "function" ? XF81bba3e_2 : (XF81bba3e_2 as any).default;
            if (!qrGenerator) {
              throw new Error("QR Code generator function not found.");
            }
            const qr = qrGenerator(0, "M");
            qr.addData(verificationUrl);
            qr.make();

            const moduleCount = qr.getModuleCount();
            const qrSize = 48;
            const cellSize = qrSize / moduleCount;

            doc.rect(26, 168, 48, 48).fill("#ffffff");
            doc.rect(26, 168, 48, 48).lineWidth(0.5).stroke("#cbd5e1");

            const startX = 26;
            const startY = 168;

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
                    .fill("#115e59");
                }
              }
            }
          } catch (err) {
            console.error("Failed to generate instructor offline QR code:", err);
          }

                const details = [
            ["Instructor ID", card.instructorId],
            ["Instructor Name", card.instructorName],
            ["Address", card.instructorAddress],
            ["Mobile No.", card.instructorMobile],
            ["Email ID", card.instructorEmail],
            [
              "Issued Date",
              new Date(card.issuedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            ],
          ];

          let currentY = 94;
          details.forEach(([label, value]) => {
            doc
              .fontSize(7.5)
              .font("Helvetica-Bold")
              .fillColor("#115e59")
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
            .fontSize(6)
            .font("Helvetica-Bold")
            .fillColor("#4b5563")
            .text(
              "Note: This ID card is valid only as long as you are associated with [i3].",
              96,
              185,
              { width: 280 },
            );

                doc
            .fontSize(6.5)
            .font("Helvetica-Bold")
            .fillColor("#4b5563")
            .text(
              "This ID Card is Computer Generated. Signature Not Required.",
              20,
              230,
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

    if (userRole !== "INSTRUCTOR" && userRole !== "SUPER_ADMIN") {
      return errorResponse("FORBIDDEN", "Forbidden request.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        instructorRegistration: true,
        instructorIdCard: true,
      },
    });

    if (!user || !user.instructorRegistration || !user.instructorIdCard) {
      return errorResponse(
        "NOT_FOUND",
        "ID Card not found or not generated yet.",
        {
          status: HTTP_2.NOT_FOUND,
        },
      );
    }

    const reg = user.instructorRegistration;
    const address = `${reg.currentAddressLocal}, ${reg.currentAddressDistrict}, ${reg.currentAddressState} - ${reg.currentAddressPinCode}`;

    const host = request.headers.get("host") || "www.iiinternship.in";
    const proto = request.headers.get("x-forwarded-proto") || "https";
    const origin = `${proto}://${host}`;

    const pdfPayload = {
      cardNo: user.instructorIdCard.cardNo,
      issuedAt: user.instructorIdCard.issuedAt.toISOString(),
      instructorId: reg.instructorId,
      instructorName: reg.fullName,
      instructorMobile: reg.mobileNo,
      instructorEmail: user.email,
      instructorAddress: address,
      photoUrl: reg.photoUrl || "",
      origin,
    };

    const fileBuffer = await generateInstructorIDCardPDF(pdfPayload);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="instructor_id_card_${user.instructorIdCard.cardNo}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
