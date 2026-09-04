import ExcelJS from "exceljs";
import { NextRequest, NextResponse } from "next/server";
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
    if (requesterRole !== "SUPER_ADMIN") {
      return errorResponse(
        "FORBIDDEN",
        "Only Super Admins can export applications.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    const { id } = await params;

    const job = await prisma.jobOpportunity.findFirst({
      where: { id, deletedAt: null },
    });
    if (!job) {
      return errorResponse("NOT_FOUND", "Job opportunity not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { jobOpportunityId: id, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IIInternship";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Applications");

    sheet.columns = [
      { header: "S.No", key: "slNo", width: 8 },
      { header: "Candidate Name", key: "name", width: 24 },
      { header: "Age", key: "age", width: 8 },
      { header: "Email", key: "email", width: 28 },
      { header: "Mobile", key: "mobile", width: 16 },
      { header: "Qualification", key: "qualification", width: 22 },
      { header: "Skills", key: "skills", width: 28 },
      { header: "Address", key: "address", width: 32 },
      { header: "Status", key: "status", width: 14 },
      { header: "Resume URL", key: "resumeUrl", width: 40 },
      { header: "Applied Date", key: "createdAt", width: 16 },
    ];

    applications.forEach((app, index) => {
      sheet.addRow({
        slNo: index + 1,
        name: app.name,
        age: app.age,
        email: app.email,
        mobile: app.mobile,
        qualification: app.qualification,
        skills: app.skills || "",
        address: app.address,
        status: app.status,
        resumeUrl: app.resumeUrl,
        createdAt: app.createdAt.toISOString().split("T")[0],
      });
    });

    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).alignment = { vertical: "middle" };

    const buffer = await workbook.xlsx.writeBuffer();
    const safeTitle = (job.postOpportunity || "vacancy")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase()
      .slice(0, 40);
    const filename = `applications-${safeTitle}-${new Date().toISOString().split("T")[0]}.xlsx`;

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
