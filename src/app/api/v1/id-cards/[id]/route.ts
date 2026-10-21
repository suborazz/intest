import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/x/e3746f45";
import { generateApplicationCode } from "@/x/a85a9c0c";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse> {
    interface ApiErrorResponse {
      success: false;
      error: {
        code: string;
        message: string;
        details?: unknown;
      };
    }

    const HTTP = {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      UNPROCESSABLE: 422,
      TOO_MANY_REQUESTS: 429,
      INTERNAL_SERVER_ERROR: 500,
    } as const;

    function errorResponse(
      code: string,
      message: string,
      options?: {
        status?: number;
        details?: unknown;
      },
    ): NextResponse<ApiErrorResponse> {
      const body: ApiErrorResponse = {
        success: false,
        error: {
          code,
          message,
          ...(options?.details !== undefined && { details: options.details }),
        },
      };

      return NextResponse.json(body, {
        status: options?.status ?? HTTP.INTERNAL_SERVER_ERROR,
      });
    }

    function validationErrorResponse(
      error: ZodError,
    ): NextResponse<ApiErrorResponse> {
      return errorResponse("VALIDATION_ERROR", "Request validation failed", {
        status: HTTP.UNPROCESSABLE,
        details: error.flatten().fieldErrors,
      });
    }

    function handleError(error: unknown): NextResponse<ApiErrorResponse> {
      console.error("[API Error]", error);

      if (error instanceof ZodError) {
        return validationErrorResponse(error);
      }

      if (error instanceof Error) {
            const message =
          process.env["NODE_ENV"] === "production"
            ? "An internal server error occurred"
            : error.message;

        return errorResponse("INTERNAL_SERVER_ERROR", message, {
          status: HTTP.INTERNAL_SERVER_ERROR,
        });
      }

      return errorResponse("UNKNOWN_ERROR", "An unexpected error occurred", {
        status: HTTP.INTERNAL_SERVER_ERROR,
      });
    }

    interface PaginationMeta {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    }

    interface ApiSuccessResponse<T = unknown> {
      success: true;
      data: T;
      message?: string;
      meta?: PaginationMeta;
    }

    function successResponse<T>(
      data: T,
      options?: {
        message?: string;
        status?: number;
        meta?: PaginationMeta;
      },
    ): NextResponse<ApiSuccessResponse<T>> {
      const body: ApiSuccessResponse<T> = {
        success: true,
        data,
        ...(options?.message && { message: options.message }),
        ...(options?.meta && { meta: options.meta }),
      };

      return NextResponse.json(body, { status: options?.status ?? HTTP.OK });
    }

    const HTTP_2 = {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      UNPROCESSABLE: 422,
      TOO_MANY_REQUESTS: 429,
      INTERNAL_SERVER_ERROR: 500,
    } as const;

  try {
    const { id } = await params;

    const idCard = await prisma.idCard.findFirst({
      where: {
        OR: [{ id }, { cardNo: id }],
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            studentRegistration: {
              select: {
                studentId: true,
                mobileNo: true,
                photoUrl: true,
                localAddressLocal: true,
                localAddressDistrict: true,
                localAddressState: true,
                localAddressPinCode: true,
              },
            },
          },
        },
        enrollment: {
          include: {
            internship: {
              select: {
                id: true,
                title: true,
                companyName: true,
                mode: true,
                location: true,
                duration: true,
              },
            },
          },
        },
      },
    });

    if (!idCard) {
      // 1. Fallback to StudentRegistration (for registration verification QR codes)
      const studentReg = await prisma.studentRegistration.findFirst({
        where: {
          OR: [{ id }, { studentId: id }, { userId: id }],
          deletedAt: null,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });

      if (studentReg) {
        const addressParts = [
          studentReg.localAddressLocal,
          studentReg.localAddressDistrict,
          studentReg.localAddressState,
          studentReg.localAddressPinCode ? `- ${studentReg.localAddressPinCode}` : "",
        ].filter(Boolean);
        const address = addressParts.join(", ") || "N/A";

        const responsePayload = {
          cardNo: studentReg.studentId || studentReg.id,
          issuedAt: studentReg.createdAt,
          studentId: studentReg.studentId || studentReg.id,
          studentName: studentReg.fullName || studentReg.user?.name || "Student",
          studentEmail: studentReg.user?.email || "N/A",
          studentMobile: studentReg.mobileNo || "N/A",
          studentAddress: address,
          photoUrl: studentReg.photoUrl || "",
          internshipId: studentReg.id,
          internshipTitle: "Student Onboarding Registration",
          companyName: "International Institute of Internship [i3]",
          internshipMode: "Active Registration",
          internshipLocation: studentReg.localAddressDistrict || "Verified",
          duration: "Institutional Record",
          status: "VERIFIED",
        };

        return successResponse(responsePayload);
      }

      // 2. Fallback to Instructor ID Card
      const instructorCard = await prisma.instructorIdCard.findFirst({
        where: {
          OR: [{ id }, { cardNo: id }],
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              instructorRegistration: {
                select: {
                  instructorId: true,
                  fullName: true,
                  mobileNo: true,
                  photoUrl: true,
                  currentAddressLocal: true,
                  currentAddressDistrict: true,
                  currentAddressState: true,
                  currentAddressPinCode: true,
                },
              },
            },
          },
        },
      });

      if (instructorCard && instructorCard.user.instructorRegistration) {
        const reg = instructorCard.user.instructorRegistration;
        const address = `${reg.currentAddressLocal}, ${reg.currentAddressDistrict}, ${reg.currentAddressState} - ${reg.currentAddressPinCode}`;

        const responsePayload = {
          cardNo: instructorCard.cardNo,
          issuedAt: instructorCard.issuedAt,
          studentId: reg.instructorId || "N/A",
          studentName: reg.fullName,
          studentEmail: instructorCard.user.email,
          studentMobile: reg.mobileNo || "N/A",
          studentAddress: address,
          photoUrl: reg.photoUrl || "",
          isInstructor: true,
          status: "VERIFIED",
        };

        return successResponse(responsePayload);
      }

      // 3. Fallback to Instructor Registration
      const instructorReg = await prisma.instructorRegistration.findFirst({
        where: {
          OR: [{ id }, { instructorId: id }, { userId: id }],
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      if (instructorReg) {
        const address = `${instructorReg.currentAddressLocal}, ${instructorReg.currentAddressDistrict}, ${instructorReg.currentAddressState} - ${instructorReg.currentAddressPinCode}`;

        const responsePayload = {
          cardNo: instructorReg.instructorId || instructorReg.id,
          issuedAt: instructorReg.createdAt,
          studentId: instructorReg.instructorId || "N/A",
          studentName: instructorReg.fullName,
          studentEmail: instructorReg.user?.email || "N/A",
          studentMobile: instructorReg.mobileNo || "N/A",
          studentAddress: address,
          photoUrl: instructorReg.photoUrl || "",
          isInstructor: true,
          status: "VERIFIED",
        };

        return successResponse(responsePayload);
      }

      // 4. Fallback to Immersion Application
      let immersionApp = await prisma.immersionApplication.findFirst({
        where: {
          OR: [{ id }, { code: id }],
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              registrationNo: true,
            },
          },
          immersion: {
            select: {
              id: true,
              title: true,
              location: true,
            },
          },
        },
      });

      if (!immersionApp) {
        // Fallback check: in case application.code wasn't yet persisted in DB
        const recentImmersionApps = await prisma.immersionApplication.findMany({
          select: {
            id: true,
            code: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 500,
        });

        const matched = recentImmersionApps.find(
          (app) =>
            generateApplicationCode(app.id, app.createdAt) === id ||
            app.id === id,
        );

        if (matched) {
          immersionApp = await prisma.immersionApplication.findUnique({
            where: { id: matched.id },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  registrationNo: true,
                },
              },
              immersion: {
                select: {
                  id: true,
                  title: true,
                  location: true,
                },
              },
            },
          });

          // Persist the code to DB so future lookups are instant
          if (immersionApp && !immersionApp.code) {
            await prisma.immersionApplication
              .update({
                where: { id: immersionApp.id },
                data: { code: id },
              })
              .catch(() => {});
          }
        }
      }

      if (immersionApp) {
        const profile = await prisma.immersionParticipantProfile.findUnique({
          where: { userId: immersionApp.userId },
        });

        const addressParts = profile
          ? [
              profile.permLocalArea,
              profile.permDistrict,
              profile.permState,
              profile.permCountry,
              profile.permPinCode ? `- ${profile.permPinCode}` : "",
            ].filter(Boolean)
          : [];
        const address = addressParts.join(", ") || "N/A";

        const appCode = immersionApp.code || id;

        const durationStr = immersionApp.preferredDuration
          ? `${immersionApp.preferredDuration.replace(/^DAYS_/, "")} Days`
          : "Institutional Record";

        const modeStr = immersionApp.presenceType
          ? immersionApp.presenceType.replace(/_/g, " ")
          : "Immersion Program";

        const responsePayload = {
          cardNo: appCode,
          issuedAt: immersionApp.createdAt,
          studentId: appCode,
          studentName:
            profile?.fullName ||
            immersionApp.user.name ||
            "Immersion Participant",
          studentEmail: profile?.emailAddress || immersionApp.user.email,
          studentMobile: profile?.mobileNumber || "N/A",
          studentAddress: address,
          photoUrl:
            (profile as any)?.photoUrl || profile?.passportPhotoUrl || "",
          internshipId: immersionApp.immersion?.id || immersionApp.id,
          internshipTitle:
            immersionApp.immersion?.title || "Immersion Program",
          companyName: "International Institute of Internship [i3]",
          internshipMode: modeStr,
          internshipLocation:
            immersionApp.preferredLocation ||
            immersionApp.immersion?.location ||
            profile?.permDistrict ||
            "Verified",
          duration: durationStr,
          isImmersion: true,
          status: "VERIFIED",
        };

        return successResponse(responsePayload);
      }

      // 5. Fallback to Job Application (Recruitment)
      const jobApp = await prisma.jobApplication.findFirst({
        where: {
          OR: [{ id }],
        },
        include: {
          jobOpportunity: true,
        },
      });

      if (jobApp) {
        const responsePayload = {
          cardNo: jobApp.id,
          issuedAt: jobApp.createdAt,
          studentId: jobApp.id,
          studentName: jobApp.name,
          studentEmail: jobApp.email,
          studentMobile: jobApp.mobile,
          studentAddress: jobApp.address,
          photoUrl: "",
          internshipId: jobApp.jobOpportunity.id,
          internshipTitle: jobApp.jobOpportunity.postOpportunity,
          companyName: jobApp.jobOpportunity.companyName,
          internshipMode: jobApp.jobOpportunity.jobNature,
          internshipLocation: jobApp.jobOpportunity.address,
          duration: "Recruitment Track",
          isRecruitment: true,
          status: "VERIFIED",
        };

        return successResponse(responsePayload);
      }

      // 6. Fallback to Recruit Registration Profile
      const recruitProfile = await prisma.recruitProfile.findFirst({
        where: {
          OR: [{ id }, { userId: id }],
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      if (recruitProfile) {
        const latestJobApp = await prisma.jobApplication.findFirst({
          where: { userId: recruitProfile.userId },
          orderBy: { createdAt: "desc" },
          include: { jobOpportunity: true },
        });

        const addressParts = [
          recruitProfile.currAddressLocal,
          recruitProfile.currAddressDistrict,
          recruitProfile.currAddressState,
          recruitProfile.currAddressCountry,
          recruitProfile.currAddressPinCode ? `- ${recruitProfile.currAddressPinCode}` : "",
        ].filter(Boolean);
        const address = addressParts.join(", ") || "N/A";

        const responsePayload = {
          cardNo: recruitProfile.id,
          issuedAt: recruitProfile.createdAt,
          studentId: recruitProfile.id,
          studentName:
            recruitProfile.fullName ||
            recruitProfile.user?.name ||
            "Job Applicant",
          studentEmail:
            recruitProfile.email || recruitProfile.user?.email || "N/A",
          studentMobile: recruitProfile.mobileNo || "N/A",
          studentAddress: address,
          photoUrl: recruitProfile.photoUrl || "",
          internshipId: latestJobApp?.jobOpportunity?.id || recruitProfile.id,
          internshipTitle:
            latestJobApp?.jobOpportunity?.postOpportunity ||
            "Recruit Profile Registration",
          companyName:
            latestJobApp?.jobOpportunity?.companyName ||
            "International Institute of Internship [i3]",
          internshipMode:
            latestJobApp?.jobOpportunity?.jobNature ||
            "Job Applicant Registration",
          internshipLocation:
            latestJobApp?.jobOpportunity?.address ||
            recruitProfile.currAddressDistrict ||
            "Verified",
          duration: "Recruitment Track",
          isRecruitment: true,
          status: "VERIFIED",
        };

        return successResponse(responsePayload);
      }

      return errorResponse(
        "ID_CARD_NOT_FOUND",
        "No record found for this ID or card number.",
        { status: HTTP_2.NOT_FOUND },
      );
    }

    const reg = idCard.student.studentRegistration;
    const address = reg
      ? `${reg.localAddressLocal}, ${reg.localAddressDistrict}, ${reg.localAddressState} - ${reg.localAddressPinCode}`
      : "N/A";

    const responsePayload = {
      cardNo: idCard.cardNo,
      issuedAt: idCard.issuedAt,
      studentId: reg?.studentId || "N/A",
      studentName: idCard.student.name,
      studentEmail: idCard.student.email,
      studentMobile: reg?.mobileNo || "N/A",
      studentAddress: address,
      photoUrl: reg?.photoUrl || "",
      internshipId: idCard.enrollment.internship.id,
      internshipTitle: idCard.enrollment.internship.title,
      companyName: idCard.enrollment.internship.companyName,
      internshipMode: idCard.enrollment.internship.mode,
      internshipLocation: idCard.enrollment.internship.location || "Remote",
      duration: idCard.enrollment.internship.duration,
      status: "VERIFIED",
    };

    return successResponse(responsePayload);
  } catch (error) {
    return handleError(error);
  }
}
