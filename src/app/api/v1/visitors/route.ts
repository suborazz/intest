import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/x/e3746f45";

const SETTING_KEY = "total_visitors";
const INITIAL_BASE_COUNT = 1482;

/**
 * GET /api/v1/visitors
 * Returns the current global visitor count.
 */
export async function GET() {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: SETTING_KEY },
    });

    let count = INITIAL_BASE_COUNT;
    if (setting && setting.value) {
      const parsed = parseInt(setting.value, 10);
      if (!isNaN(parsed) && parsed >= INITIAL_BASE_COUNT) {
        count = parsed;
      }
    } else {
      // Initialize in database if not present
      await prisma.systemSetting.upsert({
        where: { key: SETTING_KEY },
        update: {},
        create: {
          key: SETTING_KEY,
          value: INITIAL_BASE_COUNT.toString(),
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        count,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    return NextResponse.json(
      {
        success: true,
        count: INITIAL_BASE_COUNT,
        fallback: true,
      },
      { status: 200 },
    );
  }
}

/**
 * POST /api/v1/visitors
 * Increments the global visitor count by 1 and returns the updated count.
 */
export async function POST(request: NextRequest) {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: SETTING_KEY },
    });

    let currentCount = INITIAL_BASE_COUNT;
    if (setting && setting.value) {
      const parsed = parseInt(setting.value, 10);
      if (!isNaN(parsed) && parsed >= INITIAL_BASE_COUNT) {
        currentCount = parsed;
      }
    }

    const newCount = currentCount + 1;

    await prisma.systemSetting.upsert({
      where: { key: SETTING_KEY },
      update: {
        value: newCount.toString(),
      },
      create: {
        key: SETTING_KEY,
        value: newCount.toString(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        count: newCount,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("Error updating visitor count:", error);
    return NextResponse.json(
      {
        success: true,
        count: INITIAL_BASE_COUNT + 1,
        fallback: true,
      },
      { status: 200 },
    );
  }
}
