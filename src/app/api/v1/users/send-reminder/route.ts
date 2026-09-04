import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/x/e3746f45";
import { sendProfileCompletionReminderEmail } from "@/x/b7e0f2d7";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const requesterRole = request.headers.get("X-User-Role");
    if (requesterRole !== "SUPER_ADMIN") {
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

    const body = await request.json().catch(() => ({}));
    const { userId, sendToAllIncomplete } = body;

    if (!userId && !sendToAllIncomplete) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Please specify userId or sendToAllIncomplete: true.",
          },
        },
        { status: 400 },
      );
    }

    // Fetch users with their associated profiles
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        ...(userId ? { id: userId } : { isActive: true }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        studentRegistration: {
          select: { id: true, deletedAt: true },
        },
        instructorRegistration: {
          select: { id: true, deletedAt: true },
        },
        immersionParticipantProfile: {
          select: { id: true },
        },
        recruitProfile: {
          select: { id: true },
        },
      },
    });

    // Filter users whose profile is NOT created
    const usersNeedingReminder = users.filter((u) => {
      if (u.role === "STUDENT") {
        return !u.studentRegistration || u.studentRegistration.deletedAt !== null;
      }
      if (u.role === "INSTRUCTOR") {
        return !u.instructorRegistration || u.instructorRegistration.deletedAt !== null;
      }
      if (u.role === "IMMERSION_USER") {
        return !u.immersionParticipantProfile;
      }
      if (u.role === "RECRUIT_USER") {
        return !u.recruitProfile;
      }
      return false; // SUPER_ADMIN or roles without separate registration profile
    });

    if (usersNeedingReminder.length === 0) {
      return NextResponse.json({
        success: true,
        message: userId
          ? "इस यूज़र का प्रोफाइल पहले से ही पूर्ण (Completed) है।"
          : "कोई भी अधूरा प्रोफाइल वाला यूज़र नहीं मिला।",
        sentCount: 0,
      });
    }

    let sentCount = 0;
    // Process in parallel batches of 5 to avoid SMTP timeouts
    const BATCH_SIZE = 5;
    for (let i = 0; i < usersNeedingReminder.length; i += BATCH_SIZE) {
      const batch = usersNeedingReminder.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map((u) =>
          sendProfileCompletionReminderEmail(u.email, u.name || "User", u.role),
        ),
      );
      results.forEach((r, idx) => {
        if (r.status === "fulfilled" && r.value) {
          sentCount++;
        } else {
          console.error(
            `[Send Reminder Error] Failed for ${batch[idx].email}:`,
            r.status === "rejected" ? r.reason : "SMTP dispatch failed",
          );
        }
      });
    }

    return NextResponse.json({
      success: true,
      message:
        sentCount === 1
          ? `रिमाइंडर ईमेल सफलतापूर्वक भेज दिया गया (${usersNeedingReminder[0].email})`
          : `कुल ${sentCount} यूज़र्स को प्रोफाइल रिमाइंडर ईमेल सफलतापूर्वक भेज दिए गए।`,
      sentCount,
    });
  } catch (error) {
    console.error("[Send Reminder API Exception]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Internal server error",
        },
      },
      { status: 500 },
    );
  }
}
