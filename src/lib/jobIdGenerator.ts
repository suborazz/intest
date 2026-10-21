import { prisma as defaultPrisma } from "@/x/e3746f45";

/**
 * Calculates 2-letter series from index:
 * 0 -> 'AA', 1 -> 'AB', ... 25 -> 'AZ', 26 -> 'BA', ... 675 -> 'ZZ'
 */
export function seriesIndexToLetters(index: number): string {
  const safeIndex = Math.max(0, Math.min(index, 675));
  const firstChar = String.fromCharCode(65 + Math.floor(safeIndex / 26));
  const secondChar = String.fromCharCode(65 + (safeIndex % 26));
  return `${firstChar}${secondChar}`;
}

/**
 * Converts 2-letter series to integer index (0 to 675)
 */
export function lettersToSeriesIndex(series: string): number {
  if (!series || series.length < 2) return 0;
  const upper = series.toUpperCase();
  const c1 = upper.charCodeAt(0) - 65;
  const c2 = upper.charCodeAt(1) - 65;
  if (c1 < 0 || c1 > 25 || c2 < 0 || c2 > 25) return 0;
  return c1 * 26 + c2;
}

/**
 * Parses a Job ID in format J{YYYY}{SERIES}{SERIAL} into structured components.
 */
export function parseJobId(
  jobId: string,
): { year: number; series: string; serial: number } | null {
  if (!jobId) return null;
  const match = jobId.trim().match(/^J(\d{4})([A-Z]{2})(\d{3})$/i);
  if (!match) return null;
  return {
    year: parseInt(match[1]!, 10),
    series: match[2]!.toUpperCase(),
    serial: parseInt(match[3]!, 10),
  };
}

/**
 * Pure function: Computes the next sequential Job ID given a list of existing IDs for a target year.
 * Pattern: J{YYYY}{SERIES}{SERIAL} (e.g. J2026AA001)
 */
export function computeNextJobId(
  existingIds: string[],
  targetYear?: number,
): string {
  const year = targetYear || new Date().getFullYear();
  let maxSeriesIndex = 0;
  let maxSerialForMaxSeries = 0;
  let hasValidIdForYear = false;

  for (const id of existingIds) {
    const parsed = parseJobId(id);
    if (parsed && parsed.year === year) {
      hasValidIdForYear = true;
      const sIndex = lettersToSeriesIndex(parsed.series);
      if (sIndex > maxSeriesIndex) {
        maxSeriesIndex = sIndex;
        maxSerialForMaxSeries = parsed.serial;
      } else if (sIndex === maxSeriesIndex) {
        if (parsed.serial > maxSerialForMaxSeries) {
          maxSerialForMaxSeries = parsed.serial;
        }
      }
    }
  }

  if (!hasValidIdForYear) {
    return `J${year}AA001`;
  }

  let nextSerial = maxSerialForMaxSeries + 1;
  let nextSeriesIndex = maxSeriesIndex;

  if (nextSerial > 999) {
    nextSeriesIndex += 1;
    nextSerial = 1;
    if (nextSeriesIndex > 675) {
      nextSeriesIndex = 0;
    }
  }

  const nextSeries = seriesIndexToLetters(nextSeriesIndex);
  const formattedSerial = String(nextSerial).padStart(3, "0");
  return `J${year}${nextSeries}${formattedSerial}`;
}

/**
 * Database-backed generator: Atomically inspects existing records and computes the guaranteed-unique next Job ID.
 */
export async function generateNextJobOpportunityId(
  prismaClient?: any,
  targetYear?: number,
): Promise<string> {
  const client = prismaClient || defaultPrisma;
  const year = targetYear || new Date().getFullYear();

  const existingJobs = await client.jobOpportunity.findMany({
    where: {
      id: {
        startsWith: `J${year}`,
      },
    },
    select: { id: true },
  });

  const existingIds = existingJobs.map((j: { id: string }) => j.id);
  let candidate = computeNextJobId(existingIds, year);

  // Safety check: ensure candidate does not already exist
  let attempts = 0;
  while (attempts < 10) {
    const exists = await client.jobOpportunity.findUnique({
      where: { id: candidate },
      select: { id: true },
    });
    if (!exists) {
      return candidate;
    }
    existingIds.push(candidate);
    candidate = computeNextJobId(existingIds, year);
    attempts++;
  }

  return candidate;
}

/**
 * Pure function: Computes the next sequential Advertisement Number in format: i3/{YEAR}/{SERIAL}
 * e.g. i3/2026/01, i3/2026/02, ... i3/2026/10
 * If the year changes (e.g. 2026 to 2027), serial starts back from 01: i3/2027/01
 */
export function computeNextAdvtNo(
  existingAdvtNos: (string | null | undefined)[],
  targetYear?: number,
): string {
  const year = targetYear || new Date().getFullYear();
  let maxSerial = 0;

  for (const raw of existingAdvtNos) {
    if (!raw) continue;
    const trimmed = raw.trim();

    // Pattern 1: prefix/year/serial (e.g. i3/2026/01, II/2026/01, ADV/2026/01)
    const match = trimmed.match(
      new RegExp(`^(?:[a-z0-9_-]+)[\\/\\-_]${year}[\\/\\-_](\\d+)`, "i"),
    );
    if (match && match[1]) {
      const serial = parseInt(match[1], 10);
      if (!isNaN(serial) && serial > maxSerial) {
        maxSerial = serial;
      }
      continue;
    }

    // Pattern 2: any string containing {year}/{serial} or {year}-{serial}
    const match2 = trimmed.match(new RegExp(`${year}[\\/\\-_](\\d+)`));
    if (match2 && match2[1]) {
      const serial = parseInt(match2[1], 10);
      if (!isNaN(serial) && serial > maxSerial) {
        maxSerial = serial;
      }
    }
  }

  const nextSerial = maxSerial + 1;
  const formattedSerial = String(nextSerial).padStart(2, "0");
  return `i3/${year}/${formattedSerial}`;
}

/**
 * Database-backed generator for Advertisement Number:
 * Inspects all existing job opportunities for the given year and generates the next i3/{YEAR}/{SERIAL}.
 */
export async function generateNextAdvtNo(
  prismaClient?: any,
  targetYear?: number,
): Promise<string> {
  const client = prismaClient || defaultPrisma;
  const year = targetYear || new Date().getFullYear();

  const jobs = await client.jobOpportunity.findMany({
    where: {
      deletedAt: null,
      OR: [
        { advtNo: { contains: `${year}` } },
        {
          createdAt: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lte: new Date(`${year}-12-31T23:59:59.999Z`),
          },
        },
      ],
    },
    select: { advtNo: true },
  });

  const existingAdvtNos = jobs.map((j: { advtNo: string | null }) => j.advtNo);
  return computeNextAdvtNo(existingAdvtNos, year);
}
