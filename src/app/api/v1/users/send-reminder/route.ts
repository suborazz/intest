import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/x/e3746f45";
import { sendProfileCompletionReminderEmail } from "@/x/b7e0f2d7";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Prevent serverless timeouts on bulk email dispatches

async function sendWithRetry(
  email: string,
  name: string,
  role: string,
  retries = 1,
): Promise<boolean> {
  const success = await sendProfileCompletionReminderEmail(email, name, role);
  if (success) return true;
  if (retries > 0) {
    return await sendProfileCompletionReminderEmail(email, name, role);
  }
  return false;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    let requesterRole = request.headers.get("X-User-Role");
    if (!requesterRole) {
      const cookieRole = request.cookies.get("user_role")?.value?.toUpperCase();
      if (cookieRole === "SUPER_ADMIN") {
        requesterRole = "SUPER_ADMIN";
      }
    }
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
    const { userId, sendToAllIncomplete, role, includeInactive = true } = body;

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

    // Build the query filter:
    // If userId is provided, target specifically that user.
    // Otherwise, include all incomplete profiles (including inactive ones by default so no one is skipped).
    const whereClause: Record<string, unknown> = {
      deletedAt: null,
    };

    if (userId) {
      whereClause["id"] = userId;
    } else {
      if (!includeInactive) {
        whereClause["isActive"] = true;
      }
      if (role && Object.values(UserRole).includes(role as UserRole)) {
        whereClause["role"] = role as UserRole;
      }
    }

    // Fetch users with all associated profile relations
    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        studentRegistration: {
          select: { id: true, deletedAt: true },
        },
        instructorRegistration: {
          select: { id: true, deletedAt: true },
        },
        instructorProfile: {
          select: { id: true },
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
        const hasReg = !!u.instructorRegistration && u.instructorRegistration.deletedAt === null;
        const hasProf = !!u.instructorProfile;
        return !hasReg && !hasProf;
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
        totalEligible: 0,
        sentCount: 0,
        failedCount: 0,
      });
    }

    let sentCount = 0;
    const failureList: { email: string; reason: string }[] = [];

    // Process in synchronized batches of 5
    const BATCH_SIZE = 5;
    const startTime = Date.now();
    const MAX_SAFE_DURATION_MS = 8000; // 8 seconds threshold guarantees response before serverless timeout
    let timedOutEarly = false;
    let remainingUsersCount = 0;

    for (let i = 0; i < usersNeedingReminder.length; i += BATCH_SIZE) {
      // Check if approaching execution ceiling before launching next batch
      if (Date.now() - startTime > MAX_SAFE_DURATION_MS) {
        timedOutEarly = true;
        remainingUsersCount = usersNeedingReminder.length - i;
        console.warn(
          `[Send Reminder] Approaching serverless timeout ceiling. Safely halting with ${remainingUsersCount} users remaining.`,
        );
        break;
      }

      const batch = usersNeedingReminder.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map((u) => sendWithRetry(u.email, u.name || "User", u.role)),
      );

      results.forEach((r, idx) => {
        if (r.status === "fulfilled" && r.value === true) {
          sentCount++;
        } else {
          const reason =
            r.status === "rejected"
              ? String(r.reason)
              : "SMTP delivery failed";
          failureList.push({ email: batch[idx].email, reason });
          console.error(
            `[Send Reminder Error] Failed for ${batch[idx].email}:`,
            reason,
          );
        }
      });

      // Brief 150ms pacing between batches
      if (i + BATCH_SIZE < usersNeedingReminder.length) {
        await new Promise((res) => setTimeout(res, 150));
      }
    }

    if (sentCount === 0 && usersNeedingReminder.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "SMTP_DISPATCH_FAILED",
            message: `ईमेल भेजने में विफल। (SMTP Dispatch Failed: ${failureList[0]?.reason || "Check SMTP server settings / password"})`,
          },
          totalEligible: usersNeedingReminder.length,
          sentCount: 0,
          failedCount: failureList.length,
          failedEmails: failureList.map((f) => f.email),
        },
        { status: 500 },
      );
    }

    const failedCount = failureList.length;
    let message = "";
    if (timedOutEarly && remainingUsersCount > 0) {
      message = `समय सीमा सुरक्षा (Timeout Protection): कुल ${sentCount} यूज़र्स को ईमेल भेजे गए। शेष ${remainingUsersCount} यूज़र्स को भेजने के लिए कृपया दोबारा बटन दबाएं।`;
    } else if (sentCount === 1 && failedCount === 0) {
      message = `रिमाइंडर ईमेल सफलतापूर्वक भेज दिया गया (${usersNeedingReminder[0].email})`;
    } else if (failedCount > 0) {
      message = `कुल ${sentCount} यूज़र्स को प्रोफाइल रिमाइंडर भेजे गए (${failedCount} विफल रहे)।`;
    } else {
      message = `कुल ${sentCount} यूज़र्स को प्रोफाइल रिमाइंडर ईमेल सफलतापूर्वक भेज दिए गए।`;
    }

    return NextResponse.json({
      success: true,
      message,
      totalEligible: usersNeedingReminder.length,
      sentCount,
      failedCount,
      remainingCount: remainingUsersCount,
      failedEmails: failureList.map((f) => f.email),
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
