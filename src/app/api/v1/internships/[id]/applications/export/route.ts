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

  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    const { id: targetId } = await params;

    const internship = await prisma.internship.findFirst({
      where: {
        id: targetId,
        deletedAt: null,
      },
    });

    if (!internship) {
      return errorResponse("INTERNSHIP_NOT_FOUND", "Internship not found.", {
        status: HTTP_2.NOT_FOUND,
      });
    }

    const internshipId = internship.id;

        if (requesterRole !== "SUPER_ADMIN") {
      if (
        requesterRole !== "INSTRUCTOR" ||
        (internship.instructorId !== requesterId &&
          internship.createdById !== requesterId)
      ) {
        return errorResponse(
          "FORBIDDEN",
          "Access denied. Only the assigned instructor or admin can export applications.",
          {
            status: HTTP_2.FORBIDDEN,
          },
        );
      }
    }

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IIInternship";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Applications");

    const isLeadsOnly =
      internship.category === "ON_CAMPUS" || internship.category === "VIRTUAL";

    if (isLeadsOnly) {
      const leads = await prisma.internshipInterest.findMany({
        where: { internshipId },
        orderBy: { createdAt: "desc" },
      });

      sheet.columns = [
        { header: "Name", key: "name", width: 24 },
        { header: "Email", key: "email", width: 28 },
        { header: "Mobile", key: "mobile", width: 16 },
        { header: "Education", key: "education", width: 24 },
        { header: "Address", key: "address", width: 32 },
        { header: "Submission Date", key: "createdAt", width: 20 },
      ];

      for (const lead of leads) {
        sheet.addRow({
          name: lead.name,
          email: lead.email,
          mobile: lead.mobile,
          education: lead.education,
          address: lead.address || "",
          createdAt: lead.createdAt.toISOString().split("T")[0],
        });
      }
    } else {
            const applications = await prisma.internshipApplication.findMany({
        where: { internshipId },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              studentRegistration: {
                include: {
                  academics: true,
                  skills: true,
                },
              },
            },
          },
        },
        orderBy: { appliedAt: "desc" },
      });

      const enrollments = await prisma.enrollment.findMany({
        where: { internshipId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              studentRegistration: {
                include: {
                  academics: true,
                  skills: true,
                },
              },
            },
          },
          payment: true,
        },
      });

            const formattedApplications = applications.map((app) => {
        const reg = app.student?.studentRegistration;
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

        const matchingEnrollment = enrollments.find(
          (e) => e.userId === app.studentId,
        );
        const paymentStatus =
          matchingEnrollment?.payment?.status === "COMPLETED" ||
          (app.status === "APPROVED" && internship.type === "PAID")
            ? "PAID"
            : "FREE";

        return {
          name: reg?.fullName || app.student?.name || "Candidate",
          studentId: reg?.studentId || app.studentId || app.id.substring(0, 8),
          applicationId: generateApplicationCode(app.id, app.appliedAt),
          email: app.student?.email || "",
          mobile: reg?.mobileNo || "",
          gender: reg?.gender || "",
          college: reg?.academics?.[0]?.instituteName || "",
          branch: reg?.academics?.[0]?.stream || "",
          semester: reg?.academics?.[0]?.sessionYear || "",
          rollNo: "",
          localAddress,
          permanentAddress,
          paymentStatus,
          status: app.status,
          appliedAt: app.appliedAt,
        };
      });

            const enrolledUserIds = new Set(applications.map((app) => app.studentId));
      const orphanEnrollments = enrollments.filter(
        (e) => !enrolledUserIds.has(e.userId),
      );

      const formattedOrphans = orphanEnrollments.map((e) => {
        const reg = e.user?.studentRegistration;
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

        const pStatus = e.payment?.status === "COMPLETED" ? "PAID" : "FREE";

        return {
          name: reg?.fullName || e.user?.name || "Candidate",
          studentId: reg?.studentId || e.userId || e.id.substring(0, 8),
          applicationId: generateApplicationCode(e.id, e.createdAt),
          email: e.user?.email || "",
          mobile: reg?.mobileNo || "",
          gender: reg?.gender || "",
          college: reg?.academics?.[0]?.instituteName || "",
          branch: reg?.academics?.[0]?.stream || "",
          semester: reg?.academics?.[0]?.sessionYear || "",
          rollNo: "",
          localAddress,
          permanentAddress,
          paymentStatus: pStatus,
          status: "APPROVED",
          appliedAt: e.createdAt,
        };
      });

      const combined = [...formattedApplications, ...formattedOrphans];

      sheet.columns = [
        { header: "Name", key: "name", width: 24 },
        { header: "Student ID", key: "studentId", width: 20 },
        { header: "Application ID", key: "applicationId", width: 24 },
        { header: "Email", key: "email", width: 28 },
        { header: "Mobile", key: "mobile", width: 16 },
        { header: "Gender", key: "gender", width: 12 },
        { header: "College", key: "college", width: 28 },
        { header: "Branch/Stream", key: "branch", width: 20 },
        { header: "Semester/Year", key: "semester", width: 16 },
        { header: "Local Address", key: "localAddress", width: 32 },
        { header: "Permanent Address", key: "permanentAddress", width: 32 },
        { header: "Payment Status", key: "paymentStatus", width: 16 },
        { header: "Application Status", key: "status", width: 20 },
        { header: "Applied Date", key: "appliedAt", width: 20 },
      ];

      for (const row of combined) {
        sheet.addRow({
          ...row,
          appliedAt: row.appliedAt.toISOString().split("T")[0],
        });
      }
    }

    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).alignment = { vertical: "middle" };

    const buffer = await workbook.xlsx.writeBuffer();
    const safeTitle = internship.title
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
