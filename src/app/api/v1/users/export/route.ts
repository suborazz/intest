import ExcelJS from "exceljs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/x/e3746f45";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (request.headers.get("X-User-Role") !== "SUPER_ADMIN") {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "Access denied. Administrator privileges required.",
        },
      },
      { status: 403 },
    );
  }

  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: null },
      select: {
        name: true,
        email: true,
        mobile: true,
        role: true,
        isActive: true,
        createdAt: true,
        studentRegistration: {
          select: { mobileNo: true, deletedAt: true },
        },
        instructorRegistration: {
          select: { mobileNo: true, deletedAt: true },
        },
        immersionParticipantProfile: {
          select: { mobileNumber: true },
        },
        recruitProfile: {
          select: { mobileNo: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "IIInternship";
    const sheet = workbook.addWorksheet("User Accounts");

    sheet.columns = [
      { header: "S. No.", key: "serialNumber", width: 10 },
      { header: "Name", key: "name", width: 28 },
      { header: "Email Address", key: "email", width: 32 },
      { header: "Mobile Number", key: "mobile", width: 18 },
      { header: "Role", key: "role", width: 22 },
      { header: "Status", key: "status", width: 14 },
      { header: "Created At", key: "createdAt", width: 18 },
    ];
    sheet.getRow(1).font = { bold: true };

    users.forEach((user, index) => {
      const resolvedMobile =
        user.mobile && user.mobile.trim() !== ""
          ? user.mobile
          : user.studentRegistration?.mobileNo ||
            user.instructorRegistration?.mobileNo ||
            user.immersionParticipantProfile?.mobileNumber ||
            user.recruitProfile?.mobileNo ||
            "—";

      sheet.addRow({
        serialNumber: index + 1,
        name: user.name || "",
        email: user.email,
        mobile: resolvedMobile,
        role: user.role,
        status: user.isActive ? "Active" : "Inactive",
        createdAt: user.createdAt.toISOString().split("T")[0],
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="user-accounts.xlsx"',
      },
    });
  } catch (error) {
    console.error("[User Export] Failed to export user accounts", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to export user accounts.",
        },
      },
      { status: 500 },
    );
  }
}
