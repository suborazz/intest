import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/x/e3746f45";
import { generateNextAdvtNo } from "@/lib/jobIdGenerator";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = request.nextUrl;
    const yearParam = searchParams.get("year");
    const targetYear = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();
    const safeYear = isNaN(targetYear) ? new Date().getFullYear() : targetYear;

    const nextAdvtNo = await generateNextAdvtNo(prisma, safeYear);

    return NextResponse.json({
      success: true,
      data: {
        advtNo: nextAdvtNo,
        year: safeYear,
      },
    });
  } catch (error: any) {
    console.error("[Next Advt No API Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message || "Failed to generate next advertisement number",
        },
      },
      { status: 500 },
    );
  }
}
