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
      include: {
        user: {
          include: {
            recruitProfile: {
              include: {
                academics: true,
                experiences: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "International Institute of Internship";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Job Applications", {
      views: [{ showGridLines: true }],
    });

    // Helper functions for code generation
    function generateAppCode(applicationId: string, createdAt?: string | Date | null): string {
      if (!applicationId) return "";
      const date = createdAt ? new Date(createdAt) : new Date();
      const year = String(date.getFullYear()).slice(-2);

      let hash = 0;
      for (let i = 0; i < applicationId.length; i++) {
        hash = (hash * 31 + applicationId.charCodeAt(i)) >>> 0;
      }

      const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const c1 = ALPHA[hash % 26]!;
      const h2 = Math.floor(hash / 26);
      const c2 = ALPHA[h2 % 26]!;
      const h3 = Math.floor(h2 / 26);
      const numeric = String(1000 + (h3 % 9000)).padStart(4, "0");

      return `APP${year}${c1}${c2}${numeric}`;
    }

    function formatJobCode(jobId?: string | null, createdAt?: string | Date | null): string {
      if (!jobId) return "J2026AA001";
      const trimmed = jobId.trim();
      if (/^J\d{4}[A-Z]{2}\d{3}$/i.test(trimmed)) {
        return trimmed.toUpperCase();
      }
      const date = createdAt ? new Date(createdAt) : new Date();
      const year = isNaN(date.getFullYear()) ? 2026 : date.getFullYear();

      let hash = 0;
      for (let i = 0; i < trimmed.length; i++) {
        hash = (hash * 31 + trimmed.charCodeAt(i)) >>> 0;
      }
      const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const c1 = ALPHA[hash % 26]!;
      const h2 = Math.floor(hash / 26);
      const c2 = ALPHA[h2 % 26]!;
      const h3 = Math.floor(h2 / 26);
      const numeric = String(1 + (h3 % 999)).padStart(3, "0");
      return `J${year}${c1}${c2}${numeric}`;
    }

    function formatDateTimeIST(dateValue?: string | Date | null): string {
      if (!dateValue) return "—";
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return String(dateValue);
      return d.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    sheet.columns = [
      { header: "S.No", key: "slNo", width: 8 },
      { header: "Application ID", key: "appId", width: 18 },
      { header: "Job ID", key: "jobId", width: 16 },
      { header: "Advt. No.", key: "advtNo", width: 16 },
      { header: "Post Name", key: "postOpportunity", width: 26 },
      { header: "Candidate Name", key: "name", width: 25 },
      { header: "Age", key: "age", width: 8 },
      { header: "Gender", key: "gender", width: 12 },
      { header: "Category", key: "category", width: 14 },
      { header: "Email Address", key: "email", width: 30 },
      { header: "Mobile Number", key: "mobile", width: 16 },
      { header: "Alternate Contact", key: "altMobile", width: 18 },
      { header: "Highest Qualification", key: "qualification", width: 24 },
      { header: "Skills & Languages", key: "skills", width: 32 },
      { header: "Total Experience", key: "experience", width: 24 },
      { header: "Full Address", key: "address", width: 38 },
      { header: "Status", key: "status", width: 16 },
      { header: "Resume Document", key: "resumeLink", width: 28 },
      { header: "Applied Date & Time", key: "createdAt", width: 24 },
    ];

    const formattedJobId = formatJobCode(job.id, job.createdAt);
    const advtNo = job.advtNo || "N/A";
    const postOpportunity = job.postOpportunity || "N/A";

    applications.forEach((app, index) => {
      const profile = app.user?.recruitProfile;
      const appId = generateAppCode(app.id, app.createdAt);

      // Experience summary
      let experienceSummary = "Fresher";
      if (profile?.experiences && profile.experiences.length > 0) {
        experienceSummary = profile.experiences
          .map((exp: any) => `${exp.designation || "Role"} at ${exp.organizationName || "Org"}`)
          .slice(0, 2)
          .join("; ");
      }

      // Address resolution: prefer detailed permanent/current profile address if available
      let resolvedAddress = app.address;
      if (profile?.currAddressLocal || profile?.currAddressDistrict || profile?.currAddressState) {
        const parts = [
          profile.currAddressLocal,
          profile.currAddressDistrict,
          profile.currAddressState,
          profile.currAddressPinCode ? `PIN: ${profile.currAddressPinCode}` : null,
        ].filter(Boolean);
        if (parts.length > 0) {
          resolvedAddress = parts.join(", ");
        }
      }

      // Skills and languages
      const combinedSkills = [
        app.skills,
        profile?.languagesKnown ? `Languages: ${profile.languagesKnown}` : null,
      ]
        .filter(Boolean)
        .join(" | ") || "—";

      const addedRow = sheet.addRow({
        slNo: index + 1,
        appId,
        jobId: formattedJobId,
        advtNo,
        postOpportunity,
        name: app.name || profile?.fullName || "—",
        age: app.age,
        gender: profile?.gender || "—",
        category: profile?.category || "—",
        email: app.email || profile?.email || "—",
        mobile: app.mobile || profile?.mobileNo || "—",
        altMobile: profile?.mobileNo && profile.mobileNo !== app.mobile ? profile.mobileNo : "—",
        qualification: app.qualification || "—",
        skills: combinedSkills,
        experience: experienceSummary,
        address: resolvedAddress || "—",
        status: app.status || "PENDING",
        resumeLink: app.resumeUrl ? "View Resume" : "No Resume",
        createdAt: formatDateTimeIST(app.createdAt),
      });

      // Hyperlink formatting for resume document
      if (app.resumeUrl) {
        const resumeCell = addedRow.getCell("resumeLink");
        resumeCell.value = {
          text: "View Resume",
          hyperlink: app.resumeUrl,
          tooltip: "Click to open candidate resume",
        };
        resumeCell.font = {
          color: { argb: "FF006E52" },
          underline: true,
          bold: true,
        };
      }

      // Alternating row styling (zebra striping)
      if (index % 2 === 1) {
        addedRow.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF9FAFB" },
        };
      }

      // Add cell borders & center alignment where appropriate
      addedRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: { style: "thin", color: { argb: "FFE5E7EB" } },
          left: { style: "thin", color: { argb: "FFE5E7EB" } },
          bottom: { style: "thin", color: { argb: "FFE5E7EB" } },
          right: { style: "thin", color: { argb: "FFE5E7EB" } },
        };
        // Center-align specific columns (S.No, Age, Status, App ID, Job ID, Advt No)
        if ([1, 2, 3, 4, 7, 8, 9, 17].includes(colNumber)) {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else {
          cell.alignment = { vertical: "middle", horizontal: "left" };
        }
      });
    });

    // Style Header Row: Rich Emerald `#006E52` with bold white text
    const headerRow = sheet.getRow(1);
    headerRow.height = 32;
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    headerRow.alignment = { vertical: "middle", horizontal: "center", wrapText: false };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF006E52" },
    };
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: "medium", color: { argb: "FF005A43" } },
        left: { style: "thin", color: { argb: "FF005A43" } },
        bottom: { style: "medium", color: { argb: "FF005A43" } },
        right: { style: "thin", color: { argb: "FF005A43" } },
      };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const safeTitle = (job.postOpportunity || "vacancy")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase()
      .slice(0, 30);
    const safeAdvt = (job.advtNo || "notice")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase();
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `applications-${safeTitle}-${safeAdvt}-${dateStr}.xlsx`;

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
