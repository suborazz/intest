import { Prisma, UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ZodError } from "zod";
import { cloudinary } from "@/x/cloudinary";
import { prisma } from "@/x/e3746f45";

interface CloudinaryUploadResult {
    url: string;
    publicId: string;
}

async function uploadBuffer(
  buffer: Buffer,
  folder: string,
  publicIdPrefix: string,
  resourceType: "image" | "raw" | "auto" = "auto",
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${publicIdPrefix}-${Date.now()}`,
        resource_type: resourceType,
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload returned no result"));
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );
    uploadStream.end(buffer);
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

function buildPaginationMeta(
  total: number,
  page: number,
  limit: number,
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

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

function generateNoticeNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `NOT-${randomPart}`;
}

const createNoticeSchema = z.object({
  noticeNumber: z.string().min(1, "Notice number is required").trim(),
  date: z.string().min(1, "Date is required").trim(),
  title: z.string().min(3, "Title is required").trim(),
  category: z.enum([
    "Important",
    "General",
    "Result",
    "Schedule",
    "Guidelines",
  ]),
  description: z.string().min(5, "Description is required").trim(),
  targetRole: z.enum(["STUDENT", "INSTRUCTOR"]).optional().nullable(),
  receiverId: z.string().optional().nullable(),
  pdfUrl: z.string().optional().nullable(),
  pdfPublicId: z.string().optional().nullable(),
});

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = request.nextUrl;

    const parsed = paginationSchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });

    if (!parsed.success) {
      return errorResponse("VALIDATION_ERROR", "Invalid query parameters", {
        status: HTTP_2.UNPROCESSABLE,
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { page, limit } = parsed.data;
    const skip = (page - 1) * limit;

    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role") as UserRole;

                                let where: Prisma.NoticeWhereInput = {
      targetRole: null,
      receiverId: null,
    };

    if (userId && userRole) {
      if (userRole === "INSTRUCTOR") {
        where = {
          OR: [
            { targetRole: userRole },
            { receiverId: userId },
            {
              senderId: userId,
              OR: [{ receiverId: null }, { receiverId: userId }],
            },
            { targetRole: null, receiverId: null },
          ],
        };
      } else {
        where = {
          OR: [
            { targetRole: userRole },
            { receiverId: userId },
            { senderId: userId },
            { targetRole: null, receiverId: null },
          ],
        };
      }
    }

    const categoryFilter = searchParams.get("category");
    if (categoryFilter) {
      where = {
        AND: [
          where,
          { category: { equals: categoryFilter, mode: "insensitive" } },
        ],
      };
    }

    const search = searchParams.get("search");
    if (search) {
      where = {
        AND: [
          where,
          {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { noticeNumber: { contains: search, mode: "insensitive" } },
            ],
          },
        ],
      };
    }

    const [notices, total] = await Promise.all([
      prisma.notice.findMany({
        where,
        include: {
          sender: { select: { id: true, name: true, email: true, role: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.notice.count({ where }),
    ]);

    const meta = buildPaginationMeta(total, page, limit);

    return successResponse(notices, { meta });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role") as UserRole;

    if (!userId || !userRole) {
      return errorResponse("UNAUTHORIZED", "Authentication required.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

        if (userRole !== "SUPER_ADMIN" && userRole !== "INSTRUCTOR") {
      return errorResponse(
        "FORBIDDEN",
        "Access denied. Only Admins and Instructors can post notices.",
        { status: HTTP_2.FORBIDDEN },
      );
    }

    let body: {
      noticeNumber?: string;
      date?: string;
      title?: string;
      category?: string;
      description?: string;
      targetRole?: string | null;
      receiverId?: string | null;
      content?: string;
      internshipIds?: string[];
      immersionIds?: string[];
    } = {};
    let pdfFile: File | null = null;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const internshipIdsRaw = formData.get("internshipIds");
      let parsedInternshipIds: string[] | undefined = undefined;
      if (internshipIdsRaw) {
        try {
          parsedInternshipIds = JSON.parse(internshipIdsRaw as string);
        } catch {
          parsedInternshipIds = formData.getAll("internshipIds") as string[];
        }
      }

      const immersionIdsRaw = formData.get("immersionIds");
      let parsedImmersionIds: string[] | undefined = undefined;
      if (immersionIdsRaw) {
        try {
          parsedImmersionIds = JSON.parse(immersionIdsRaw as string);
        } catch {
          parsedImmersionIds = formData.getAll("immersionIds") as string[];
        }
      }

      body = {
        noticeNumber: formData.get("noticeNumber") as string,
        date: formData.get("date") as string,
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        targetRole: (formData.get("targetRole") as string) || null,
        receiverId: (formData.get("receiverId") as string) || null,
        internshipIds: parsedInternshipIds,
        immersionIds: parsedImmersionIds,
      };
      pdfFile =
        (formData.get("pdf") as File | null) ||
        (formData.get("pdfFile") as File | null);
    } else {
      body = await request.json();
    }

        if (body.targetRole === "") body.targetRole = null;
    if (body.receiverId === "") body.receiverId = null;

        if (!body.noticeNumber) {
      body.noticeNumber = generateNoticeNumber();
    }
    if (!body.date) {
      body.date = new Date().toISOString().split("T")[0];
    }
    if (!body.description && body.content) {
      body.description = body.content;
    }
    if (body.category) {
      const validCategories = [
        "Important",
        "General",
        "Result",
        "Schedule",
        "Guidelines",
      ];
      if (body.category === "Guidance" || body.category === "Evaluation") {
        body.category = "Guidelines";
      } else if (body.category === "Deadline") {
        body.category = "Important";
      } else if (!validCategories.includes(body.category)) {
        body.category = "General";
      }
    } else {
      body.category = "General";
    }

    const result = createNoticeSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("VALIDATION_ERROR", "Validation failed.", {
        status: HTTP_2.UNPROCESSABLE,
        details: result.error.flatten().fieldErrors,
      });
    }

    let pdfUrl = result.data.pdfUrl || null;
    let pdfPublicId = result.data.pdfPublicId || null;

        if (pdfFile && pdfFile.size > 0) {
      if (pdfFile.size > 5 * 1024 * 1024) {
        return errorResponse(
          "VALIDATION_ERROR",
          "PDF document size exceeds the 5MB limit",
          {
            status: HTTP_2.UNPROCESSABLE,
            details: { pdf: ["PDF must be smaller than 5MB"] },
          },
        );
      }

      const bytes = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await uploadBuffer(
        buffer,
        "iiit/notices",
        "notice",
        "raw",
      );
      pdfUrl = uploadResult.url;
      pdfPublicId = uploadResult.publicId;
    }

    const selectedInternshipIds = body.internshipIds || [];
    const selectedImmersionIds = body.immersionIds || [];
    const hasProgramTargets =
      (Array.isArray(selectedInternshipIds) &&
        selectedInternshipIds.length > 0) ||
      (Array.isArray(selectedImmersionIds) && selectedImmersionIds.length > 0);
    const isTargetedInstructorNotice =
      userRole === "INSTRUCTOR" && hasProgramTargets;
    const isTargetedAdminNotice =
      userRole === "SUPER_ADMIN" && hasProgramTargets;
    const isProgramScoped = isTargetedInstructorNotice || isTargetedAdminNotice;

    const notice = await prisma.notice.create({
      data: {
        noticeNumber: result.data.noticeNumber,
        date: result.data.date,
        title: result.data.title,
        category: result.data.category,
        description: result.data.description,
        senderId: userId,
        targetRole: isProgramScoped ? null : result.data.targetRole || null,
        receiverId: isProgramScoped ? null : result.data.receiverId || null,
        pdfUrl,
        pdfPublicId,
      },
      include: {
        sender: { select: { id: true, name: true, email: true, role: true } },
      },
    });

        if (userRole === "INSTRUCTOR") {
      (async () => {
        try {
          let studentEnrollments: {
            userId: string;
            user: { id: string; email: string; name: string | null };
          }[] = [];
          let immersionRegistrations: {
            studentId: string;
            student: { id: string; email: string; name: string | null };
          }[] = [];

          if (isTargetedInstructorNotice) {
            if (selectedInternshipIds.length > 0) {
              studentEnrollments = await prisma.enrollment.findMany({
                where: {
                  internshipId: { in: selectedInternshipIds },
                  internship: { instructorId: userId },
                },
                select: {
                  userId: true,
                  user: { select: { id: true, email: true, name: true } },
                },
              });
            }
            if (selectedImmersionIds.length > 0) {
              immersionRegistrations =
                await prisma.immersionRegistration.findMany({
                  where: {
                    immersionId: { in: selectedImmersionIds },
                    immersion: { instructorId: userId },
                  },
                  select: {
                    studentId: true,
                    student: { select: { id: true, email: true, name: true } },
                  },
                });
            }
          } else {
            studentEnrollments = await prisma.enrollment.findMany({
              where: {
                internship: { instructorId: userId },
              },
              select: {
                userId: true,
                user: { select: { id: true, email: true, name: true } },
              },
            });
            immersionRegistrations =
              await prisma.immersionRegistration.findMany({
                where: {
                  immersion: { instructorId: userId },
                },
                select: {
                  studentId: true,
                  student: { select: { id: true, email: true, name: true } },
                },
              });
          }

          const recipientsMap = new Map();
          for (const e of studentEnrollments) {
            recipientsMap.set(e.user.id, e.user);
          }
          for (const r of immersionRegistrations) {
            recipientsMap.set(r.student.id, r.student);
          }
          const recipients = Array.from(recipientsMap.values());

          if (recipients.length > 0) {
            if (isTargetedInstructorNotice) {
              await Promise.all(
                recipients.map((rec) =>
                  prisma.notice.create({
                    data: {
                      noticeNumber: `${result.data.noticeNumber}-${rec.id}`,
                      date: result.data.date,
                      title: result.data.title,
                      category: result.data.category,
                      description: result.data.description,
                      senderId: userId,
                      targetRole: null,
                      receiverId: rec.id,
                      pdfUrl,
                      pdfPublicId,
                    },
                  }),
                ),
              );
            }

            const { sendInstructorBroadcastedNoticeNotificationEmail } =
              await import("@/x/b7e0f2d7");
            const instructorName = notice.sender?.name || "Instructor";
            for (const rec of recipients) {
              await sendInstructorBroadcastedNoticeNotificationEmail(
                rec.email,
                rec.name || "Student",
                instructorName,
                notice.title,
                notice.category,
                notice.description,
              );
            }
          }
        } catch (err) {
          console.error(
            "[EMAIL/NOTICE ERROR] Failed to process instructor notices:",
            err,
          );
        }
      })();
    } else if (userRole === "SUPER_ADMIN") {
      (async () => {
        try {
          let recipients: { email: string; name: string | null }[] = [];
          if (isTargetedAdminNotice) {
                                    const recipientsMap = new Map<
              string,
              { id: string; email: string; name: string | null }
            >();

            if (selectedInternshipIds.length > 0) {
              const enrollments = await prisma.enrollment.findMany({
                where: { internshipId: { in: selectedInternshipIds } },
                select: {
                  user: { select: { id: true, email: true, name: true } },
                },
              });
              for (const e of enrollments) {
                recipientsMap.set(e.user.id, e.user);
              }
            }

            if (selectedImmersionIds.length > 0) {
              const registrations = await prisma.immersionRegistration.findMany(
                {
                  where: { immersionId: { in: selectedImmersionIds } },
                  select: {
                    student: { select: { id: true, email: true, name: true } },
                  },
                },
              );
              for (const r of registrations) {
                recipientsMap.set(r.student.id, r.student);
              }
            }

            const programRecipients = Array.from(recipientsMap.values());

                        await Promise.all(
              programRecipients.map((rec) =>
                prisma.notice.create({
                  data: {
                    noticeNumber: `${result.data.noticeNumber}-${rec.id}`,
                    date: result.data.date,
                    title: result.data.title,
                    category: result.data.category,
                    description: result.data.description,
                    senderId: userId,
                    targetRole: null,
                    receiverId: rec.id,
                    pdfUrl,
                    pdfPublicId,
                  },
                }),
              ),
            );

            recipients = programRecipients.map((rec) => ({
              email: rec.email,
              name: rec.name,
            }));
          } else if (notice.receiverId) {
            const user = await prisma.user.findUnique({
              where: { id: notice.receiverId },
              select: { email: true, name: true },
            });
            if (user) recipients = [user];
          } else if (notice.targetRole) {
            recipients = await prisma.user.findMany({
              where: { role: notice.targetRole, deletedAt: null },
              select: { email: true, name: true },
            });
          } else {
                        recipients = await prisma.user.findMany({
              where: { deletedAt: null },
              select: { email: true, name: true },
            });
          }
          if (recipients.length > 0) {
            const { sendAdminPublishedNoticeNotificationEmail } =
              await import("@/x/b7e0f2d7");
            for (const rec of recipients) {
              await sendAdminPublishedNoticeNotificationEmail(
                rec.email,
                rec.name || "User",
                notice.title,
                notice.category,
                notice.description,
                notice.pdfUrl,
              );
            }
          }
        } catch (err) {
          console.error(
            "[EMAIL ERROR] Failed to send admin notice emails:",
            err,
          );
        }
      })();
    }

    return successResponse(notice, {
      message: "Notice posted successfully.",
      status: HTTP_2.CREATED,
    });
  } catch (error) {
    return handleError(error);
  }
}
