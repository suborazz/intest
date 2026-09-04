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
  const registration = await prisma.instructorRegistration.findFirst({
    where: {
      OR: [{ id }, { instructorId: id }],
    },
    select: { id: true, userId: true, deletedAt: true, isApproved: true },
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

  await prisma.instructorRegistration.update({
    where: { id: registration.id },
    data: {
      isApproved: false,
      approvedAt: null,
    },
  });

  if (registration.userId) {
    await prisma.instructorProfile.updateMany({
      where: { userId: registration.userId },
      data: {
        isApproved: false,
        approvedAt: null,
      },
    });
  }

  return NextResponse.json({
    success: true,
    data: null,
    message: "Instructor registration marked as pending / rejected.",
  });
}
