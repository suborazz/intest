import { type ClassValue, clsx as clsx_2 } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  PaginationMeta,
} from "@/x/d6a2a721";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx_2(inputs));
}

export function deleteCookie(name: string) {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function camelCaseToWords(camelCase: string): string {
  return camelCase
    .replaceAll("_", " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

export function formatHumanReadableDate(date?: string | null): string {
  if (!date) return "N/A";
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "N/A";
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatCurrencyINR(amount?: number | null): string {
  return `₹${(amount ?? 0).toLocaleString("en-IN")}`;
}

export const getSecureRandomInt = (min: number, max: number) => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const randomValue = array[0] / (0xffffffff + 1); 
  return Math.floor(randomValue * (max - min + 1)) + min;
};

export const HTTP = {
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

export function successResponse<T>(
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

export function errorResponse(
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

export function validationErrorResponse(
  error: ZodError,
): NextResponse<ApiErrorResponse> {
  return errorResponse("VALIDATION_ERROR", "Request validation failed", {
    status: HTTP.UNPROCESSABLE,
    details: error.flatten().fieldErrors,
  });
}

export function handleError(error: unknown): NextResponse<ApiErrorResponse> {
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

export function buildPaginationMeta(
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

export function parsePaginationParams(searchParams: URLSearchParams): {
  page: number;
  limit: number;
  skip: number;
} {
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)),
  );
  return { page, limit, skip: (page - 1) * limit };
}

export function generateApplicationCode(
  id: string,
  createdAt?: string | Date | null,
): string {
    const date = createdAt ? new Date(createdAt) : new Date();
  const year = String(date.getFullYear()).slice(-2);

    let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0; 
  }

    const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const c1 = ALPHA[hash % 26]!;
  const h2 = Math.floor(hash / 26);
  const c2 = ALPHA[h2 % 26]!;
  const h3 = Math.floor(h2 / 26);
  const c3 = ALPHA[h3 % 26]!;

    const h4 = Math.floor(h3 / 26);
  const numeric = String(10000 + (h4 % 90000)).padStart(5, "0");

  return `${year}${c1}${c2}${c3}${numeric}`;
}

export function generateRecruitRegistrationCode(
  profileId: string,
  createdAt?: string | Date | null,
): string {
  if (!profileId) return "";
  const date = createdAt ? new Date(createdAt) : new Date();
  const year = String(date.getFullYear()).slice(-2);

  let hash = 0;
  for (let i = 0; i < profileId.length; i++) {
    hash = (hash * 31 + profileId.charCodeAt(i)) >>> 0;
  }

  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const c1 = ALPHA[hash % 26]!;
  const h2 = Math.floor(hash / 26);
  const c2 = ALPHA[h2 % 26]!;
  const h3 = Math.floor(h2 / 26);
  const c3 = ALPHA[h3 % 26]!;

  const h4 = Math.floor(h3 / 26);
  const numeric = String(10000 + (h4 % 90000)).padStart(5, "0");

  return `REG${year}${c1}${c2}${c3}${numeric}`;
}

export function generateJobApplicationCode(
  applicationId: string,
  createdAt?: string | Date | null,
): string {
  if (!applicationId) return "";
  const date = createdAt ? new Date(createdAt) : new Date();
  const year = String(date.getFullYear()).slice(-2);

  let hash = 0;
  for (let i = 0; i < applicationId.length; i++) {
    hash = (hash * 31 + applicationId.charCodeAt(i)) >>> 0;
  }

  const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const c1 = ALPHA[hash % 26]!;
  const h2 = Math.floor(hash / 26);
  const c2 = ALPHA[h2 % 26]!;

  const h3 = Math.floor(h2 / 26);
  const numeric = String(1000 + (h3 % 9000)).padStart(4, "0");

  return `APP${year}${c1}${c2}${numeric}`;
}

export function generateStudentId(fullName: string): string {
  const year = new Date().getFullYear();

  const words = fullName.trim().split(/\s+/).filter(Boolean);
  let initials: string;
  if (words.length === 0) {
    initials = "XX";
  } else if (words.length === 1) {
    const word = words[0]!;
    initials =
      word.length >= 2
        ? word.slice(0, 2).toUpperCase()
        : (word[0]! + "X").toUpperCase();
  } else {
    initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
  }

  const random = Math.floor(Math.random() * 90_000) + 10_000;
  return `S${year}${initials}${random}`;
}

export function generateInstructorId(fullName: string): string {
  const year = new Date().getFullYear();

  const words = fullName.trim().split(/\s+/).filter(Boolean);
  let initials: string;
  if (words.length === 0) {
    initials = "XX";
  } else if (words.length === 1) {
    const word = words[0]!;
    initials =
      word.length >= 2
        ? word.slice(0, 2).toUpperCase()
        : (word[0]! + "X").toUpperCase();
  } else {
    initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
  }

  const random = Math.floor(Math.random() * 90_000) + 10_000;
  return `I${year}${initials}${random}`;
}

export function generateInternshipId(companyName: string): string {
  const year = new Date().getFullYear();

  const words = companyName.trim().split(/\s+/).filter(Boolean);
  let initials: string;
  if (words.length === 0) {
    initials = "XX";
  } else if (words.length === 1) {
    const word = words[0]!;
    initials =
      word.length >= 2
        ? word.slice(0, 2).toUpperCase()
        : (word[0]! + "X").toUpperCase();
  } else {
    initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
  }

  const random = Math.floor(Math.random() * 90_000) + 10_000;
  return `IN${year}${initials}${random}`;
}

export function formatInternshipCode(
  code?: string | null,
  companyName?: string | null,
): string {
  if (!code) return "IN2026XX10001";

  const trimmed = code.trim();
  if (/^IN\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const sourceText = companyName && companyName.trim() ? companyName : trimmed;
  const words = sourceText
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  let initials = "HT";
  if (words.length === 1 && words[0]!.length >= 2) {
    initials = words[0]!.slice(0, 2).toUpperCase();
  } else if (words.length >= 2) {
    initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
  }

  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (hash * 31 + trimmed.charCodeAt(i)) % 2147483647;
  }
  const numericSuffix = (Math.abs(hash) % 90000) + 10000;

  return `IN2026${initials}${numericSuffix}`;
}

export function generateImmersionId(programTitle: string): string {
  const year = new Date().getFullYear();
  const words = programTitle.trim().split(/\s+/).filter(Boolean);
  let initials: string;
  if (words.length === 0) {
    initials = "XX";
  } else if (words.length === 1) {
    const word = words[0]!;
    initials =
      word.length >= 2
        ? word.slice(0, 2).toUpperCase()
        : (word[0]! + "X").toUpperCase();
  } else {
    initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
  }
  const random = Math.floor(Math.random() * 90_000) + 10_000;
  return `IM${year}${initials}${random}`;
}

export function formatImmersionCode(
  code?: string | null,
  programTitle?: string | null,
): string {
  if (!code) return "IM2026XX10001";
  const trimmed = code.trim();
  if (/^IM\d{4}[A-Z]{2}\d{5}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  const sourceText =
    programTitle && programTitle.trim() ? programTitle : trimmed;
  const words = sourceText
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  let initials = "HT";
  if (words.length === 1 && words[0]!.length >= 2) {
    initials = words[0]!.slice(0, 2).toUpperCase();
  } else if (words.length >= 2) {
    initials = (words[0]![0]! + words[1]![0]!).toUpperCase();
  }
  const numericPart = code.replace(/[^0-9]/g, "");
  let index = "81251";
  if (numericPart.length >= 5) {
    index = numericPart.slice(-5);
  } else if (numericPart.length > 0) {
    index = numericPart.padStart(5, "0");
  } else {
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      hash = code.charCodeAt(i) + ((hash << 5) - hash);
    }
    index = Math.abs((hash % 90000) + 10000).toString();
  }
  return `IM2026${initials}${index}`;
}

export function generateImmersionParticipantId(sequence: number): string {
  const currentYear = new Date().getFullYear();
  const formattedSeq = String(sequence).padStart(5, "0");
  return `IMM-${currentYear}-${formattedSeq}`;
}

export function generateNoticeNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `NOT-${randomPart}`;
}

export { pickPrimaryImmersionApplication } from "@/x/b2327327";
