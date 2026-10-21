import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/x/e3746f45";

export const dynamic = "force-dynamic";

const updateSchema = z.object({
  slNo: z.number().int().min(1).optional(),
  name: z.string().min(1, "Name is required").optional(),
  designation: z.string().min(1, "Designation is required").optional(),
  workingLocation: z.string().min(1, "Working location is required").optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const [official] = await prisma.$queryRawUnsafe<any[]>(
      `SELECT * FROM institution_officials WHERE id = $1`,
      id
    );

    if (!official) {
      return NextResponse.json(
        { success: false, error: { message: "Official not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: official,
    });
  } catch (error) {
    console.error("[GET /api/v1/officials/[id]] Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch official" } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const requesterRole = request.headers.get("X-User-Role");
    if (requesterRole !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized. Super Admin access required." } },
        { status: 403 }
      );
    }

    const { id } = await params;
    const [existing] = await prisma.$queryRawUnsafe<any[]>(
      `SELECT * FROM institution_officials WHERE id = $1`,
      id
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: { message: "Official not found" } },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation failed",
            details: parsed.error.flatten().fieldErrors,
          },
        },
        { status: 422 }
      );
    }

    const d = parsed.data;
    const newSlNo = d.slNo ?? existing.slNo;
    const newName = d.name ?? existing.name;
    const newDesignation = d.designation ?? existing.designation;
    const newLocation = d.workingLocation ?? existing.workingLocation;
    const newMobile = d.mobile !== undefined ? d.mobile : existing.mobile;
    const newEmail = d.email !== undefined ? d.email : existing.email;
    const newActive = d.isActive !== undefined ? d.isActive : existing.isActive;

    await prisma.$executeRawUnsafe(
      `
      UPDATE institution_officials
      SET 
        "slNo" = $1,
        name = $2,
        designation = $3,
        "workingLocation" = $4,
        mobile = $5,
        email = $6,
        "isActive" = $7,
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE id = $8
      `,
      newSlNo,
      newName,
      newDesignation,
      newLocation,
      newMobile,
      newEmail,
      newActive,
      id
    );

    const [updated] = await prisma.$queryRawUnsafe<any[]>(
      `SELECT * FROM institution_officials WHERE id = $1`,
      id
    );

    return NextResponse.json({
      success: true,
      message: "Official updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("[PATCH /api/v1/officials/[id]] Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update official" } },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return PATCH(request, context);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const requesterRole = request.headers.get("X-User-Role");
    if (requesterRole !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized. Super Admin access required." } },
        { status: 403 }
      );
    }

    const { id } = await params;
    const [existing] = await prisma.$queryRawUnsafe<any[]>(
      `SELECT * FROM institution_officials WHERE id = $1`,
      id
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: { message: "Official not found" } },
        { status: 404 }
      );
    }

    await prisma.$executeRawUnsafe(
      `DELETE FROM institution_officials WHERE id = $1`,
      id
    );

    return NextResponse.json({
      success: true,
      message: "Official deleted successfully",
    });
  } catch (error) {
    console.error("[DELETE /api/v1/officials/[id]] Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete official" } },
      { status: 500 }
    );
  }
}
