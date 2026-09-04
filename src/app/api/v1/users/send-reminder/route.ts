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

    // Fetch all active users with their associated profiles
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        isActive: true,
        ...(userId ? { id: userId } : {}),
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
        message: "No users with incomplete profiles found.",
        sentCount: 0,
      });
    }

    let sentCount = 0;
    for (const u of usersNeedingReminder) {
      try {
        await sendProfileCompletionReminderEmail(
          u.email,
          u.name || "User",
          u.role,
        );
        sentCount++;
      } catch (err) {
        console.error(
          `[Send Reminder Error] Failed to send reminder email to ${u.email}:`,
          err,
        );
      }
    }

    return NextResponse.json({
      success: true,
      message:
        sentCount === 1
          ? `Profile completion reminder email sent successfully to ${usersNeedingReminder[0].email}.`
          : `Profile completion reminder emails sent successfully to ${sentCount} user(s).`,
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
