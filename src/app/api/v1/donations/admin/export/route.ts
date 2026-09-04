import { Prisma } from "@prisma/client";
import ExcelJS from "exceljs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
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
    const requesterRole = request.headers.get("X-User-Role");
    if (requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Administrator privileges required.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const url = new URL(request.url);
    const search = url.searchParams.get("search") || undefined;

    const where: Prisma.DonationWhereInput = {};
    if (search) {
      where.OR = [
        { donorName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { mobile: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        { panNumber: { contains: search, mode: "insensitive" } },
        { razorpayOrderId: { contains: search, mode: "insensitive" } },
        { razorpayPaymentId: { contains: search, mode: "insensitive" } },
      ];
    }

    const donations = await prisma.donation.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IIInternship";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Donations");

    sheet.columns = [
      { header: "Donor Name", key: "donorName", width: 24 },
      { header: "Email", key: "email", width: 28 },
      { header: "Mobile", key: "mobile", width: 16 },
      { header: "Address", key: "address", width: 32 },
      { header: "Amount (INR)", key: "amount", width: 16 },
      { header: "Status", key: "status", width: 12 },
      { header: "80G Requested", key: "wants80G", width: 14 },
      { header: "PAN Number", key: "panNumber", width: 16 },
      { header: "Razorpay Order ID", key: "razorpayOrderId", width: 24 },
      { header: "Razorpay Payment ID", key: "razorpayPaymentId", width: 24 },
      { header: "Reference Note", key: "notes", width: 32 },
      { header: "Logged Date", key: "createdAt", width: 20 },
    ];

    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).alignment = { vertical: "middle" };

    for (const donation of donations) {
      sheet.addRow({
        donorName: donation.donorName,
        email: donation.email,
        mobile: donation.mobile,
        address: donation.address,
        amount: donation.amount,
        status: donation.status,
        wants80G: donation.wants80G ? "Yes" : "No",
        panNumber: donation.panNumber || "",
        razorpayOrderId: donation.razorpayOrderId || "",
        razorpayPaymentId: donation.razorpayPaymentId || "",
        notes: donation.notes || "",
        createdAt: donation.createdAt.toISOString().split("T")[0],
      });
    }

    sheet.getColumn("amount").numFmt = "₹#,##0.00";

    const buffer = await workbook.xlsx.writeBuffer();
    const filename = `donations-ledger-${new Date().toISOString().split("T")[0]}.xlsx`;

    return new NextResponse(buffer, {
      status: HTTP_2.OK,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
