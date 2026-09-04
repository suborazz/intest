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

    const QUALIFICATION_ORDER: Record<string, number> = {
      MATRICULATION: 1,
      INTERMEDIATE: 2,
      UNDER_GRADUATE: 3,
      GRADUATE_PASS_OUT: 4,
      UNDER_POST_GRADUATE: 5,
      POST_GRADUATE_PASS_OUT: 6,
      UNDER_MPHIL: 7,
      MPHIL_PASS_OUT: 8,
      UNDER_PHD: 9,
      PHD_PASS_OUT: 10,
    };

    const QUALIFICATION_LABELS: Record<string, string> = {
      MATRICULATION: "Matriculation",
      INTERMEDIATE: "Intermediate",
      UNDER_GRADUATE: "Under Graduate",
      GRADUATE_PASS_OUT: "Graduate Pass Out",
      UNDER_POST_GRADUATE: "Under Post Graduate",
      POST_GRADUATE_PASS_OUT: "Post Graduate Pass Out",
      UNDER_MPHIL: "Under M.Phil.",
      MPHIL_PASS_OUT: "M.Phil. Pass Out",
      UNDER_PHD: "Under Ph.D",
      PHD_PASS_OUT: "Ph.D Pass Out",
    };

  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId || requesterRole !== "SUPER_ADMIN") {
      return errorResponse("FORBIDDEN", "Access denied. Super Admin only.", {
        status: HTTP_2.FORBIDDEN,
      });
    }

    const { id: immersionId } = await params;

    const immersion = await prisma.immersion.findUnique({
      where: { id: immersionId },
    });

    if (!immersion) {
      return errorResponse("NOT_FOUND", "Immersion program not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const applications = await prisma.immersionApplication.findMany({
      where: { immersionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            registrationNo: true,
            studentRegistration: {
              include: {
                academics: true,
              },
            },
          },
        },
        assignedMentor: {
          select: {
            name: true,
          },
        },
        academicDetails: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IIInternship";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Applications");

    sheet.columns = [
      { header: "Candidate Name", key: "candidateName", width: 24 },
      { header: "Immersion ID (Formatted)", key: "immersionId", width: 20 },
      { header: "Application ID", key: "applicationId", width: 24 },
      { header: "Email", key: "email", width: 28 },
      { header: "Mobile", key: "mobile", width: 16 },
      { header: "Gender", key: "gender", width: 12 },
      { header: "Qualification", key: "qualification", width: 24 },
      { header: "Stream/Specialization", key: "stream", width: 24 },
      { header: "College/University", key: "college", width: 28 },
      { header: "Local Address", key: "localAddress", width: 32 },
      { header: "Permanent Address", key: "permanentAddress", width: 32 },
      { header: "Payment Status", key: "paymentStatus", width: 16 },
      { header: "Application Status", key: "status", width: 20 },
      { header: "Applied Date", key: "appliedDate", width: 20 },
      { header: "Assigned Mentor", key: "assignedMentor", width: 24 },
    ];

    for (const app of applications) {
      const reg = app.user?.studentRegistration;
      const candidateName = reg?.fullName || app.user?.name || "Candidate";

            let displayId =
        app.user?.registrationNo ||
        app.userId ||
        app.user?.id?.substring(0, 8) ||
        app.id.substring(0, 8);
      if (displayId && !displayId.startsWith("IMM-")) {
        const numPart = displayId.replace(/\D/g, "");
        const lastDigits = numPart.slice(-5).padStart(5, "0");
        displayId = `IMM-2026-${lastDigits}`;
      }

      const email = app.user?.email || "";
      const mobile = reg?.mobileNo || "";
      const gender = reg?.gender || "";

            const acads: any[] = [];
      if (app.academicDetails && app.academicDetails.length > 0) {
        acads.push(...app.academicDetails);
      }
      if (reg?.academics && reg.academics.length > 0) {
        acads.push(...reg.academics);
      }

      let highestQual = "N/A";
      let stream = "N/A";
      let college = "N/A";

      if (acads.length > 0) {
        acads.sort((a, b) => {
          const orderA = QUALIFICATION_ORDER[a.qualification] || 0;
          const orderB = QUALIFICATION_ORDER[b.qualification] || 0;
          return orderB - orderA;
        });
        const highest = acads[0];
        highestQual =
          QUALIFICATION_LABELS[highest.qualification] ||
          highest.qualification ||
          "N/A";
        stream = highest.stream || "N/A";
        college = highest.instituteName || "N/A";
      }

            let localAddress = "";
      if (reg) {
        localAddress = [
          reg.localAddressLocal,
          reg.localAddressBlock,
          reg.localAddressDistrict,
          reg.localAddressState,
          reg.localAddressCountry,
          reg.localAddressPinCode,
        ]
          .filter(Boolean)
          .join(", ");
      }

      let permanentAddress = "";
      if (reg) {
        permanentAddress = reg.sameAsLocal
          ? localAddress
          : [
              reg.permAddressLocal,
              reg.permAddressBlock,
              reg.permAddressDistrict,
              reg.permAddressState,
              reg.permAddressCountry,
              reg.permAddressPinCode,
            ]
              .filter(Boolean)
              .join(", ");
      }

      const isPaid = (immersion.fees ?? 0) > 0;
      const paymentStatus = isPaid ? "PAID" : "FREE";

      const assignedMentor = app.assignedMentor?.name || "—";
      const appliedDateRaw = app.submittedAt || app.createdAt;
      const appliedDate = appliedDateRaw
        ? appliedDateRaw.toISOString().split("T")[0]
        : "";

      sheet.addRow({
        candidateName,
        immersionId: displayId,
        applicationId: generateApplicationCode(
          app.id,
          app.submittedAt || app.createdAt,
        ),
        email,
        mobile,
        gender,
        qualification: highestQual,
        stream,
        college,
        localAddress,
        permanentAddress,
        paymentStatus,
        status: app.status,
        appliedDate,
        assignedMentor,
      });
    }

    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).alignment = { vertical: "middle" };

    const buffer = await workbook.xlsx.writeBuffer();
    const safeTitle = immersion.title
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase()
      .slice(0, 40);
    const filename = `immersion-applications-${safeTitle}-${new Date().toISOString().split("T")[0]}.xlsx`;

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
