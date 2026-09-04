import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/x/e3746f45";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
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

  const { id } = await params;
  const registration = await prisma.instructorRegistration.findUnique({
    where: { id },
    select: { id: true, deletedAt: true, isApproved: true },
  });

  if (!registration || registration.deletedAt) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "NOT_FOUND", message: "Registration not found." },
      },
      { status: 404 },
    );
  }

  if (!registration.isApproved) {
    await prisma.instructorRegistration.update({
      where: { id },
      data: { isApproved: true, approvedAt: new Date() },
    });
  }

  return NextResponse.json({
    success: true,
    data: null,
    message: "Instructor registration approved successfully.",
  });
}
