import { NextRequest, NextResponse } from "next/server";
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
    function numberToWords(num: number): string {
      const a = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ];
      const b = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];

      function helper(n: number): string {
        if (n < 20) return a[n];
        if (n < 100)
          return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
        if (n < 1000)
          return (
            a[Math.floor(n / 100)] +
            " Hundred" +
            (n % 100 !== 0 ? " and " + helper(n % 100) : "")
          );
        if (n < 100000)
          return (
            helper(Math.floor(n / 1000)) +
            " Thousand" +
            (n % 1000 !== 0 ? " " + helper(n % 1000) : "")
          );
        if (n < 10000000)
          return (
            helper(Math.floor(n / 100000)) +
            " Lakh" +
            (n % 100000 !== 0 ? " " + helper(n % 100000) : "")
          );
        return (
          helper(Math.floor(n / 10000000)) +
          " Crore" +
          (n % 10000000 !== 0 ? " " + helper(n % 10000000) : "")
        );
      }

      const integerPart = Math.floor(num);
      const words = helper(integerPart);
      return words ? words + " Rupees Only" : "Zero Rupees Only";
    }

    async function generateDonationReceiptPDF(donation: {
      id: string;
      amount: number;
      donorName: string;
      email: string;
      mobile: string;
      address: string;
      notes?: string | null;
      wants80G: boolean;
      panNumber?: string | null;
      razorpayPaymentId?: string | null;
      createdAt: Date;
    }): Promise<Buffer> {
      return new Promise((resolve, reject) => {
        try {
          const doc = new PDFDocument({ margin: 50 });
          const chunks: Buffer[] = [];
          doc.on("data", (chunk) => chunks.push(chunk));
          doc.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
          doc.on("error", reject);

                doc
            .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
            .stroke("#2ECC71");
          doc
            .rect(23, 23, doc.page.width - 46, doc.page.height - 46)
            .stroke("#16A085");

                doc
            .fillColor("#2C3E50")
            .fontSize(22)
            .font("Helvetica-Bold")
            .text("IIINTERNSHIP TRUST", { align: "center" });

          doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#7F8C8D")
            .text(
              "Regd. Office: Hilux Tech Park, Cyber City, Gurugram, Haryana - 122002",
              { align: "center" },
            )
            .text("Email: support@iiinternship.org | Web: www.iiinternship.org", {
              align: "center",
            });

          doc.moveDown(1.5);

                doc
            .fillColor("#16A085")
            .rect(50, doc.y, doc.page.width - 100, 25)
            .fill();

          doc
            .fillColor("#FFFFFF")
            .fontSize(12)
            .font("Helvetica-Bold")
            .text("DONATION RECEIPT (UNDER SECTION 80G)", 50, doc.y - 18, {
              align: "center",
            });

          doc.moveDown(1.5);

                doc.fillColor("#2C3E50");

                const gridStartY = doc.y;

                doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .text("Organization PAN:", 60, gridStartY)
            .font("Helvetica")
            .text("AAATI1234F", 180, gridStartY);

          doc
            .font("Helvetica-Bold")
            .text("80G Registration No:", 60, gridStartY + 15)
            .font("Helvetica")
            .text("80G/TRUST/REG/2026/0045", 180, gridStartY + 15);

                doc
            .font("Helvetica-Bold")
            .text("Receipt Serial No:", 320, gridStartY)
            .font("Helvetica")
            .text(`REC-${donation.id.slice(-8).toUpperCase()}`, 430, gridStartY);

          doc
            .font("Helvetica-Bold")
            .text("Date of Receipt:", 320, gridStartY + 15)
            .font("Helvetica")
            .text(
              new Date(donation.createdAt).toLocaleDateString("en-IN"),
              430,
              gridStartY + 15,
            );

          doc.moveDown(3);

                doc
            .moveTo(50, doc.y)
            .lineTo(doc.page.width - 50, doc.y)
            .stroke("#BDC3C7");
          doc.moveDown(1);

                const donorStartY = doc.y;
          doc
            .fontSize(12)
            .fillColor("#16A085")
            .font("Helvetica-Bold")
            .text("Donor Details", 50, donorStartY);
          doc.moveDown(0.5);

          doc.fontSize(10).fillColor("#2C3E50").font("Helvetica");

          doc
            .font("Helvetica-Bold")
            .text("Donor Name:", 50, doc.y)
            .font("Helvetica")
            .text(donation.donorName, 150, doc.y - 10);

          doc
            .font("Helvetica-Bold")
            .text("Mobile Number:", 50, doc.y + 5)
            .font("Helvetica")
            .text(donation.mobile, 150, doc.y - 5);

          doc
            .font("Helvetica-Bold")
            .text("Email Address:", 50, doc.y + 10)
            .font("Helvetica")
            .text(donation.email, 150, doc.y);

          doc
            .font("Helvetica-Bold")
            .text("PAN Card Number:", 50, doc.y + 15)
            .font("Helvetica")
            .text(donation.panNumber || "N/A", 150, doc.y + 5);

          doc
            .font("Helvetica-Bold")
            .text("Donor Address:", 50, doc.y + 20)
            .font("Helvetica")
            .text(donation.address, 150, doc.y + 10);

          doc.moveDown(6);

                const paymentStartY = doc.y;
          doc
            .fontSize(12)
            .fillColor("#16A085")
            .font("Helvetica-Bold")
            .text("Payment Summary", 50, paymentStartY);
          doc.moveDown(0.5);

          doc.fontSize(10).fillColor("#2C3E50").font("Helvetica");

          doc
            .font("Helvetica-Bold")
            .text("Amount Received:", 50, doc.y)
            .font("Helvetica")
            .text(`INR ${donation.amount.toFixed(2)}`, 160, doc.y - 10);

          doc
            .font("Helvetica-Bold")
            .text("Amount in Words:", 50, doc.y + 5)
            .font("Helvetica")
            .text(numberToWords(donation.amount), 160, doc.y - 5);

          doc
            .font("Helvetica-Bold")
            .text("Transaction ID:", 50, doc.y + 10)
            .font("Helvetica")
            .text(donation.razorpayPaymentId || "N/A", 160, doc.y);

          doc
            .font("Helvetica-Bold")
            .text("Status:", 50, doc.y + 15)
            .font("Helvetica")
            .text("COMPLETED (SUCCESS)", 160, doc.y + 5);

          doc.moveDown(4);

                doc
            .fontSize(8)
            .fillColor("#7F8C8D")
            .font("Helvetica-Bold")
            .text("Notes:", 50, doc.y)
            .font("Helvetica")
            .text(
              "1. All donations to IIINTERNSHIP TRUST are eligible for tax exemption under Section 80G of the Income Tax Act, 1961.",
              55,
              doc.y + 2,
            )
            .text(
              "2. This is a computer-generated document and does not require a physical signature for digital verification.",
              55,
              doc.y + 12,
            );

          doc.moveDown(3);

                const sigY = doc.y;
          doc
            .fontSize(10)
            .fillColor("#2C3E50")
            .font("Helvetica-Bold")
            .text("For IIINTERNSHIP TRUST", doc.page.width - 200, sigY, {
              align: "right",
            });

                doc
            .fontSize(8)
            .font("Helvetica")
            .fillColor("#7F8C8D")
            .text("Authorized Signatory", doc.page.width - 200, sigY + 50, {
              align: "right",
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
    const { id } = await params;

    const donation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      return errorResponse("NOT_FOUND", "Donation not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    if (donation.status !== "COMPLETED") {
      return errorResponse(
        "BAD_REQUEST",
        "Donation receipt is only available for completed donations.",
        { status: HTTP_2.BAD_REQUEST },
      );
    }

    const fileBuffer = await generateDonationReceiptPDF(donation);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: HTTP_2.OK,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${donation.id}.pdf"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
