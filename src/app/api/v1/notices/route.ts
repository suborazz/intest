import type { UserRole } from "@/x/c0183428";
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

/**
 * Official notice-number format: NTC/{YY}{NN}
 *   - YY = last two digits of the calendar year (e.g. 26 for 2026, 27 for 2027)
 *   - NN = yearly sequence, zero-padded to at least 2 digits, resetting back to 01
 *          whenever the year changes.
 * Example: NTC/2601, NTC/2602 ... then next year NTC/2701, NTC/2702 ...
 */
const NOTICE_NUMBER_REGEX = /^NTC\/(\d{2})(\d{2,})$/i;

/** Returns the last-two-digit year token (e.g. 2026 -> "26"). */
function yearToYY(year: number): string {
  return String(Math.abs(year) % 100).padStart(2, "0");
}

/** Highest sequence currently used for a given 2-digit year token. */
async function getMaxSequenceForYY(yy: string): Promise<number> {
  const notices = await prisma.notice.findMany({
    where: { noticeNumber: { startsWith: `NTC/${yy}` } },
    select: { noticeNumber: true },
  });
  let max = 0;
  for (const n of notices) {
    const m = (n.noticeNumber || "").trim().match(NOTICE_NUMBER_REGEX);
    if (m && m[1] === yy) {
      const seq = parseInt(m[2], 10);
      if (!isNaN(seq) && seq > max) max = seq;
    }
  }
  return max;
}

/**
 * Automatically syncs any legacy / old-format notice numbers (e.g. NOT-XXXXXX or
 * NTC/01/2026) into the official NTC/{YY}{NN} format. Sequenced chronologically
 * per year, resetting back to 01 when the year changes.
 */
async function syncLegacyNoticeNumbers() {
  try {
    const all = await prisma.notice.findMany({
      orderBy: { createdAt: "asc" },
      select: { id: true, createdAt: true, date: true, noticeNumber: true, title: true, pdfUrl: true, linkUrl: true },
    });

    if (!all || all.length === 0) return;

    // 1. Strip any suffixed student IDs (e.g. NOT-KV15TL-cmugs20jg...)
    for (const n of all) {
      if (/-[a-z0-9]{20,}$/i.test(n.noticeNumber || "")) {
        const cleaned = n.noticeNumber.replace(/-[a-z0-9]{20,}$/i, "").trim();
        await prisma.notice.update({
          where: { id: n.id },
          data: { noticeNumber: cleaned },
        });
        n.noticeNumber = cleaned;
      }
    }

    // Track the highest sequence already present for each 2-digit year token
    const maxSeqByYY: Record<string, number> = {};
    for (const n of all) {
      const m = (n.noticeNumber || "").trim().match(NOTICE_NUMBER_REGEX);
      if (m) {
        const yy = m[1];
        const seq = parseInt(m[2], 10);
        if (!(yy in maxSeqByYY) || seq > maxSeqByYY[yy]) maxSeqByYY[yy] = seq;
      }
    }

    // Group notices that are NOT already in the official format by calendar year.
    const byYear: Record<number, typeof all> = {};
    for (const n of all) {
      if (NOTICE_NUMBER_REGEX.test((n.noticeNumber || "").trim())) continue;
      const d = n.date ? new Date(n.date) : new Date(n.createdAt);
      const year = isNaN(d.getFullYear())
        ? new Date(n.createdAt).getFullYear()
        : d.getFullYear();
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(n);
    }

    for (const yearStr of Object.keys(byYear)) {
      const year = parseInt(yearStr, 10);
      const yy = yearToYY(year);
      let currentMax = maxSeqByYY[yy] || 0;

      // Group identical notices so duplicates receive the exact same official notice number
      const groupMap = new Map<string, typeof all>();
      for (const n of byYear[year]) {
        const key = `${(n.title || "").trim().toLowerCase()}::${(n.noticeNumber || "").trim().toUpperCase()}`;
        if (!groupMap.has(key)) groupMap.set(key, []);
        groupMap.get(key)!.push(n);
      }

      for (const [_, items] of groupMap) {
        currentMax++;
        const formattedSeq = String(currentMax).padStart(2, "0");
        const newNum = `NTC/${yy}${formattedSeq}`;
        for (const n of items) {
          await prisma.notice.update({
            where: { id: n.id },
            data: { noticeNumber: newNum },
          });
        }
      }
      maxSeqByYY[yy] = currentMax;
    }
  } catch (err) {
    console.error("[Notice Number Sync Error]:", err);
  }
}

/**
 * Generates the next sequential notice number for the specified date/year.
 * Format: NTC/{YY}{NN} (e.g. NTC/2601, NTC/2602... then NTC/2701 next year)
 * Resets automatically to 01 at the start of each new year.
 */
async function generateSequentialNoticeNumber(targetDate?: string | Date): Promise<string> {
  const d = targetDate ? new Date(targetDate) : new Date();
  const year = isNaN(d.getFullYear()) ? new Date().getFullYear() : d.getFullYear();
  const yy = yearToYY(year);

  const maxSequence = await getMaxSequenceForYY(yy);
  const nextSequence = String(maxSequence + 1).padStart(2, "0");
  return `NTC/${yy}${nextSequence}`;
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
  targetRole: z
    .enum(["STUDENT", "INSTRUCTOR", "IMMERSION_USER", "RECRUIT_USER"])
    .optional()
    .nullable(),
  receiverId: z.string().optional().nullable(),
  pdfUrl: z.string().optional().nullable(),
  pdfPublicId: z.string().optional().nullable(),
  linkUrl: z.string().optional().nullable(),
  publishToNoticeBoard: z.union([z.boolean(), z.string()]).optional().nullable(),
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

    await syncLegacyNoticeNumbers();

    const { page, limit } = parsed.data;
    const skip = (page - 1) * limit;

    const userId = request.headers.get("X-User-Id");
    const userRole = request.headers.get("X-User-Role") as UserRole;
    const isPublic = searchParams.get("public") === "true";

    let where: any = {
      receiverId: null,
    };

    if (!isPublic && userId && userRole) {
      if (userRole === "SUPER_ADMIN") {
        where = {};
      } else if (userRole === "INSTRUCTOR") {
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
          receiver: { select: { id: true, name: true, email: true, registrationNo: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.notice.count({ where }),
    ]);

    // Deduplicate notices so each official notice only appears ONCE
    const uniqueMap = new Map<string, (typeof notices)[0]>();
    for (const n of notices) {
      const baseNum = (n.noticeNumber || "").replace(/-[a-z0-9]{20,}$/i, "").trim();
      const normTitle = (n.title || "").trim().toLowerCase();
      const normDate = n.date || (n.createdAt ? new Date(n.createdAt).toISOString().split("T")[0] : "");
      const key = baseNum ? baseNum.toUpperCase() : `${normTitle}::${normDate}`;

      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, {
          ...n,
          noticeNumber: baseNum || n.noticeNumber,
        });
      } else {
        const existing = uniqueMap.get(key)!;
        if (!existing.pdfUrl && n.pdfUrl) {
          existing.pdfUrl = n.pdfUrl;
          existing.pdfPublicId = n.pdfPublicId;
        }
        if (!existing.linkUrl && n.linkUrl) {
          existing.linkUrl = n.linkUrl;
        }
      }
    }
    const deduplicatedNotices = Array.from(uniqueMap.values());
    const totalCount = isPublic ? deduplicatedNotices.length : total;

    const meta = buildPaginationMeta(totalCount, page, limit);

    return successResponse(deduplicatedNotices, { meta });
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
      pdfUrl?: string | null;
      linkUrl?: string | null;
      internshipIds?: string[];
      immersionIds?: string[];
      publishToNoticeBoard?: boolean | string;
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
        description: ((formData.get("description") as string) || (formData.get("content") as string)) as string,
        content: ((formData.get("content") as string) || (formData.get("description") as string)) as string,
        targetRole: (formData.get("targetRole") as string) || null,
        receiverId: (formData.get("receiverId") as string) || null,
        pdfUrl: (formData.get("pdfUrl") as string) || null,
        linkUrl: (formData.get("linkUrl") as string) || null,
        publishToNoticeBoard:
          formData.get("publishToNoticeBoard") === "true" ||
          formData.get("publishToNoticeBoard") === "on",
        internshipIds: parsedInternshipIds,
        immersionIds: parsedImmersionIds,
      };
      pdfFile =
        (formData.get("pdf") as File | null) ||
        (formData.get("pdfFile") as File | null) ||
        (formData.get("file") as File | null);
    } else {
      body = await request.json();
    }

        // Verify sender exists in database
    const sender = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });
    if (!sender) {
      return errorResponse("UNAUTHORIZED", "Sender account not found in database.", {
        status: HTTP_2.UNAUTHORIZED,
      });
    }

    if (body.targetRole === "") body.targetRole = null;
    
    // Resolve receiverId (supports Email address, Registration Number, or User ID)
    let resolvedReceiverId: string | null = null;
    let targetUserRecipient: { id: string; email: string; name: string | null } | null = null;

    if (body.receiverId && typeof body.receiverId === "string" && body.receiverId.trim() !== "") {
      const rawReceiver = body.receiverId.trim();
      const targetUser = await prisma.user.findFirst({
        where: {
          OR: [
            { id: rawReceiver },
            { email: { equals: rawReceiver, mode: "insensitive" } },
            { registrationNo: rawReceiver },
          ],
          deletedAt: null,
        },
        select: { id: true, email: true, name: true },
      });

      if (!targetUser) {
        return errorResponse(
          "VALIDATION_ERROR",
          `Target user "${rawReceiver}" was not found. Please enter a valid registered user email, registration number, or user ID.`,
          {
            status: HTTP_2.UNPROCESSABLE,
            details: { receiverId: [`Target user "${rawReceiver}" not found`] },
          },
        );
      }

      resolvedReceiverId = targetUser.id;
      targetUserRecipient = targetUser;
      body.receiverId = resolvedReceiverId;
    } else {
      body.receiverId = null;
    }

    if (!body.date) {
      body.date = new Date().toISOString().split("T")[0];
    }
    if (!body.noticeNumber || !/^NTC\/\d{4,}$/i.test(body.noticeNumber.trim())) {
      body.noticeNumber = await generateSequentialNoticeNumber(body.date);
    } else {
      body.noticeNumber = body.noticeNumber.trim().toUpperCase();
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

    const publishToNoticeBoard =
      body.publishToNoticeBoard === true ||
      body.publishToNoticeBoard === "true" ||
      body.publishToNoticeBoard === "on";

    const notice = await prisma.notice.create({
      data: {
        noticeNumber: result.data.noticeNumber,
        date: result.data.date,
        title: result.data.title,
        category: result.data.category,
        description: result.data.description,
        senderId: userId,
        targetRole: isProgramScoped ? null : result.data.targetRole || null,
        receiverId: isProgramScoped
          ? (publishToNoticeBoard ? null : userId)
          : resolvedReceiverId,
        pdfUrl,
        pdfPublicId,
        linkUrl: result.data.linkUrl ? result.data.linkUrl.trim() : null,
      },
      include: {
        sender: { select: { id: true, name: true, email: true, role: true } },
        receiver: { select: { id: true, name: true, email: true, registrationNo: true } },
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
                      noticeNumber: result.data.noticeNumber,
                      date: result.data.date,
                      title: result.data.title,
                      category: result.data.category,
                      description: result.data.description,
                      senderId: userId,
                      targetRole: null,
                      receiverId: rec.id,
                      pdfUrl,
                      pdfPublicId,
                      linkUrl: result.data.linkUrl ? result.data.linkUrl.trim() : null,
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
                    noticeNumber: result.data.noticeNumber,
                    date: result.data.date,
                    title: result.data.title,
                    category: result.data.category,
                    description: result.data.description,
                    senderId: userId,
                    targetRole: null,
                    receiverId: rec.id,
                    pdfUrl,
                    pdfPublicId,
                    linkUrl: result.data.linkUrl ? result.data.linkUrl.trim() : null,
                  },
                }),
              ),
            );

            recipients = programRecipients.map((rec) => ({
              email: rec.email,
              name: rec.name,
            }));
          } else if (targetUserRecipient || notice.receiverId) {
            if (targetUserRecipient) {
              recipients = [{ email: targetUserRecipient.email, name: targetUserRecipient.name }];
            } else {
              const user = await prisma.user.findUnique({
                where: { id: notice.receiverId! },
                select: { email: true, name: true },
              });
              if (user) recipients = [user];
            }
          } else if (notice.targetRole) {
            if (notice.targetRole === "RECRUIT_USER") {
              const [recruitUsers, jobApplicants] = await Promise.all([
                prisma.user.findMany({
                  where: { role: "RECRUIT_USER", deletedAt: null },
                  select: { email: true, name: true },
                }),
                prisma.jobApplication.findMany({
                  where: { deletedAt: null },
                  select: { email: true, name: true },
                }),
              ]);
              const recipientsMap = new Map<
                string,
                { email: string; name: string | null }
              >();
              for (const u of recruitUsers) {
                if (u.email) recipientsMap.set(u.email.toLowerCase().trim(), u);
              }
              for (const a of jobApplicants) {
                if (
                  a.email &&
                  !recipientsMap.has(a.email.toLowerCase().trim())
                ) {
                  recipientsMap.set(a.email.toLowerCase().trim(), {
                    email: a.email,
                    name: a.name,
                  });
                }
              }
              recipients = Array.from(recipientsMap.values());
            } else if (notice.targetRole === "IMMERSION_USER") {
              const [immersionUsers, immersionRegs] = await Promise.all([
                prisma.user.findMany({
                  where: { role: "IMMERSION_USER", deletedAt: null },
                  select: { email: true, name: true },
                }),
                prisma.immersionRegistration.findMany({
                  select: {
                    student: { select: { email: true, name: true } },
                  },
                }),
              ]);
              const recipientsMap = new Map<
                string,
                { email: string; name: string | null }
              >();
              for (const u of immersionUsers) {
                if (u.email) recipientsMap.set(u.email.toLowerCase().trim(), u);
              }
              for (const r of immersionRegs) {
                if (
                  r.student?.email &&
                  !recipientsMap.has(r.student.email.toLowerCase().trim())
                ) {
                  recipientsMap.set(r.student.email.toLowerCase().trim(), {
                    email: r.student.email,
                    name: r.student.name,
                  });
                }
              }
              recipients = Array.from(recipientsMap.values());
            } else {
              recipients = await prisma.user.findMany({
                where: { role: notice.targetRole, deletedAt: null },
                select: { email: true, name: true },
              });
            }
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
