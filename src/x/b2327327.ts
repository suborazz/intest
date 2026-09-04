const IMMERSION_STATUS_RANK: Record<string, number> = {
  APPROVED: 4,
  UNDER_REVIEW: 3,
  SUBMITTED: 3,
  REJECTED: 2,
  DRAFT: 1,
};

export function pickPrimaryImmersionApplication<
  T extends { status: string; createdAt?: Date | string | null },
>(applications: readonly T[]): T | null {
  if (applications.length === 0) return null;

  return applications.reduce((best, current) => {
    const bestRank = IMMERSION_STATUS_RANK[best.status] ?? 0;
    const currentRank = IMMERSION_STATUS_RANK[current.status] ?? 0;
    if (currentRank !== bestRank)
      return currentRank > bestRank ? current : best;

    const bestTime = best.createdAt ? new Date(best.createdAt).getTime() : 0;
    const currentTime = current.createdAt
      ? new Date(current.createdAt).getTime()
      : 0;
    return currentTime > bestTime ? current : best;
  });
}
