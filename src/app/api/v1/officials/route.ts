import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { prisma } from "@/x/e3746f45";

export const dynamic = "force-dynamic";

let tableEnsured = false;
async function ensureTable() {
  if (tableEnsured) return;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS institution_officials (
        id VARCHAR(255) PRIMARY KEY,
        "slNo" INTEGER NOT NULL DEFAULT 1,
        name VARCHAR(255) NOT NULL,
        designation VARCHAR(255) NOT NULL,
        "workingLocation" VARCHAR(255) NOT NULL,
        mobile VARCHAR(50) NOT NULL DEFAULT '',
        email VARCHAR(255) NOT NULL DEFAULT '',
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    tableEnsured = true;
  } catch (err) {
    console.error("[Officials API] Error ensuring table:", err);
  }
}

const officialSchema = z.object({
  slNo: z.number().int().min(1).default(1),
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  workingLocation: z.string().min(1, "Working location is required"),
  mobile: z.string().optional().default(""),
  email: z.string().optional().default(""),
  isActive: z.boolean().optional().default(true),
});

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await ensureTable();

    const { searchParams } = request.nextUrl;
    const includeInactive = searchParams.get("all") === "true";
    const requesterRole = request.headers.get("X-User-Role");

    const whereClause = includeInactive && requesterRole === "SUPER_ADMIN"
      ? ""
      : 'WHERE "isActive" = true';

    const officials = await prisma.$queryRawUnsafe<any[]>(`
      SELECT 
        id, 
        "slNo", 
        name, 
        designation, 
        "workingLocation", 
        mobile, 
        email, 
        "isActive", 
        "createdAt", 
        "updatedAt"
      FROM institution_officials
      ${whereClause}
      ORDER BY "slNo" ASC, "createdAt" ASC
    `);

    return NextResponse.json({
      success: true,
      data: officials,
      count: officials.length,
    });
  } catch (error) {
    console.error("[GET /api/v1/officials] Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch institution officials" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await ensureTable();

    const requesterRole = request.headers.get("X-User-Role");
    if (requesterRole !== "SUPER_ADMIN") {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized. Super Admin access required." } },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = officialSchema.safeParse(body);

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

    const { slNo, name, designation, workingLocation, mobile, email, isActive } = parsed.data;
    const id = `off_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    await prisma.$executeRawUnsafe(
      `
      INSERT INTO institution_officials 
        (id, "slNo", name, designation, "workingLocation", mobile, email, "isActive", "createdAt", "updatedAt")
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `,
      id,
      slNo,
      name,
      designation,
      workingLocation,
      mobile,
      email,
      isActive
    );

    const [created] = await prisma.$queryRawUnsafe<any[]>(
      `SELECT * FROM institution_officials WHERE id = $1`,
      id
    );

    return NextResponse.json(
      {
        success: true,
        message: "Official created successfully",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/v1/officials] Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to create official" } },
      { status: 500 }
    );
  }
}
