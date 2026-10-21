import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/x/e3746f45";
import {
  generateInternshipOfferLetterPDF,
  pickHighestAcademicRecord,
  formatQualificationStream,
} from "@/lib/offerLetterGenerator";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string; appId: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
  try {
    const requesterId = request.headers.get("X-User-Id");
    const requesterRole = request.headers.get("X-User-Role");

    if (!requesterId) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required." } },
        { status: 401 },
      );
    }

    const { id: internshipId, appId } = await params;

    const application = await prisma.internshipApplication.findFirst({
      where: { id: appId, internshipId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            registrationNo: true,
            studentRegistration: {
              select: {
                studentId: true,
                fullName: true,
                academics: {
                  select: {
                    qualification: true,
                    stream: true,
                    subject: true,
                    instituteName: true,
                    universityName: true,
                    sessionYear: true,
                  },
                },
              },
            },
          },
        },
        internship: {
          select: {
            id: true,
            code: true,
            title: true,
            companyName: true,
            location: true,
            mode: true,
            type: true,
            duration: true,
            stipendAmount: true,
            startDate: true,
            organizer: true,
            instructor: { select: { name: true } },
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Internship application not found." } },
        { status: 404 },
      );
    }

    // Role-based authorization check
    const isOwner = application.studentId === requesterId;
    const isSuperAdmin = requesterRole === "SUPER_ADMIN" || requesterRole === "ADMIN";

    if (!isOwner && !isSuperAdmin) {
      return NextResponse.json(
        { success: false, error: { code: "FORBIDDEN", message: "You are not authorized to download this offer letter." } },
        { status: 403 },
      );
    }

    // Reject वाले स्टूडेंट को इंटर्नशिप ऑफर लेटर जारी नहीं होगा।
    if (application.status === "REJECTED") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICATION_REJECTED",
            message: "Reject वाले स्टूडेंट को इंटर्नशिप ऑफर लेटर जारी नहीं किया जाएगा।",
          },
        },
        { status: 403 },
      );
    }

    // Offer letters are only issued for APPROVED applications
    if (application.status !== "APPROVED") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "APPLICATION_NOT_APPROVED",
            message: "इंटर्नशिप ऑफर लेटर केवल स्वीकृत (Approved) आवेदनों के लिए जारी किया जाता है।",
          },
        },
        { status: 400 },
      );
    }

    const student = application.student;
    const reg = student.studentRegistration;
    const highestAcademic = pickHighestAcademicRecord(reg?.academics);
    const internship = application.internship;

    const studentName = (reg?.fullName || student.name || "Student").trim();
    const registrationNo = reg?.studentId || student.registrationNo || "NA";

    const collegeName =
      highestAcademic?.instituteName || "Recognised College / Institution";
    const universityName =
      highestAcademic?.universityName || "Recognised University";
    const qualificationStream =
      formatQualificationStream(highestAcademic);
    const sessionYear =
      highestAcademic?.sessionYear || "Current Academic Session";

    let stipendText: string | null = null;
    if (
      (internship?.type === "STIPEND" ||
        (internship?.stipendAmount && internship.stipendAmount > 0)) &&
      internship?.stipendAmount
    ) {
      stipendText = `Rs. ${internship.stipendAmount.toLocaleString("en-IN")} / Month`;
    }

    const safeStudentFilename = studentName
      .replace(/[^a-zA-Z0-9_\-]/g, "_")
      .replace(/_+/g, "_")
      .trim();

    const pdfBuffer = await generateInternshipOfferLetterPDF({
      letterRefNo:
        application.code || `APP-${application.id.slice(-6).toUpperCase()}`,
      applicationId:
        application.code || `APP-${application.id.slice(-6).toUpperCase()}`,
      offerDate: application.reviewedAt || application.appliedAt || new Date(),
      studentName,
      registrationNo,
      collegeName,
      universityName,
      qualificationStream,
      sessionYear,
      internshipId: internship?.code || "i3-INT-2026",
      internshipTitle: internship?.title || "Internship Program",
      duration: internship?.duration || "120 Hours",
      mode: internship?.mode || "Online",
      startDate: internship?.startDate || null,
      endDate: null,
      coordinator:
        internship?.instructor?.name ||
        internship?.organizer ||
        "Dr. Avishek Kumar",
      stipend: stipendText,
      verificationUrl: `https://www.iiinternship.in/student/dashboard`,
    });

    const downloadFilename = `${safeStudentFilename}_Internship_Offer_Letter.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${downloadFilename}"`,
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    console.error("[Download Offer Letter Error]", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Failed to generate offer letter PDF." } },
      { status: 500 },
    );
  }
}
