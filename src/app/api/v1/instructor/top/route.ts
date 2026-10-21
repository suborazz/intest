import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/x/e3746f45";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase();

    // Fetch approved instructors who are not deleted
    const instructors = await prisma.instructorRegistration.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        instructorId: true,
        fullName: true,
        currentAddressDistrict: true,
        currentAddressState: true,
        currentAddressCountry: true,
        permAddressDistrict: true,
        permAddressState: true,
        permAddressCountry: true,
        mentorshipMode: true,
        totalWorkExperience: true,
        mentorshipAreas: true,
        photoUrl: true,
        currentOrganization: true,
        currentDesignation: true,
        isApproved: true,
        createdAt: true,
      },
      orderBy: [
        { isApproved: "desc" },
        { createdAt: "desc" },
      ],
      take: 100,
    });

    const formatted = instructors.map((inst: any, index: number) => {
      // Build location strictly: District, State, Country
      const district = (inst.currentAddressDistrict || inst.permAddressDistrict || "").trim();
      const state = (inst.currentAddressState || inst.permAddressState || "").trim();
      const country = (inst.currentAddressCountry || inst.permAddressCountry || "India").trim();

      const locationParts = [district, state, country].filter(Boolean);
      const fromWhere = locationParts.length > 0 ? locationParts.join(", ") : "India";

      let modes: string[] = [];
      if (Array.isArray(inst.mentorshipMode)) {
        modes = inst.mentorshipMode.map((m: any) => String(m).trim()).filter(Boolean);
      } else if (typeof inst.mentorshipMode === "string") {
        modes = (inst.mentorshipMode as string).split(",").map((m: string) => m.trim()).filter(Boolean);
      }
      if (modes.length === 0) {
        modes = ["Online / Hybrid"];
      }

      return {
        id: inst.id,
        instructorId: inst.instructorId,
        slNo: index + 1,
        name: inst.fullName || "Instructor",
        fromWhere,
        mentorshipMode: modes,
        totalExperience: inst.totalWorkExperience || "Experienced",
        mentorshipAreas: inst.mentorshipAreas || "General Mentorship & Domain Guidance",
        organization: inst.currentOrganization || "",
        designation: inst.currentDesignation || "",
        photoUrl: inst.photoUrl || "",
        isApproved: inst.isApproved,
      };
    });

    const filtered = search
      ? formatted.filter(
          (item: any) =>
            item.name.toLowerCase().includes(search) ||
            item.fromWhere.toLowerCase().includes(search) ||
            item.mentorshipAreas.toLowerCase().includes(search) ||
            item.mentorshipMode.some((m: string) => m.toLowerCase().includes(search)),
        )
      : formatted;

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch (error: any) {
    console.error("[API Error /api/v1/instructor/top]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch instructors list.",
        message: error?.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}
