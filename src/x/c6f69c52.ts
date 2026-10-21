import { prisma } from "@/x/e3746f45";

export async function generateIdCardNo(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ID-${year}-`;

  const cards = await prisma.idCard.findMany({
    where: { cardNo: { startsWith: prefix } },
    select: { cardNo: true },
  });

  let maxSeq = 0;
  for (const card of cards) {
    const match = card.cardNo.match(/\d+$/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (!isNaN(num) && num > maxSeq) {
        maxSeq = num;
      }
    }
  }

  const nextSeq = String(maxSeq + 1).padStart(4, "0");
  return `${prefix}${nextSeq}`;
}

export async function issueIdCard(studentId: string, enrollmentId: string) {
  if (!studentId || !enrollmentId) {
    console.warn(`[issueIdCard] Missing studentId (${studentId}) or enrollmentId (${enrollmentId})`);
    return null;
  }

  // 1. Check if ID card already exists for this enrollment
  const existing = await prisma.idCard.findUnique({
    where: { enrollmentId },
  });

  if (existing) {
    return existing;
  }

  // 1.5 Verify student user exists to prevent foreign key P2003 error
  const student = await prisma.user.findUnique({
    where: { id: studentId },
    select: { id: true },
  });
  if (!student) {
    console.warn(
      `[issueIdCard] Student ${studentId} not found in database. Skipping ID card issuance.`,
    );
    return null;
  }

  // 2. Retry loop to handle concurrent race conditions safely
  const maxRetries = 10;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Re-verify in case another concurrent request created it while waiting
      const currentExisting = await prisma.idCard.findUnique({
        where: { enrollmentId },
      });
      if (currentExisting) {
        return currentExisting;
      }

      const cardNo = await generateIdCardNo();

      return await prisma.idCard.create({
        data: {
          cardNo,
          studentId,
          enrollmentId,
        },
      });
    } catch (err: any) {
      // If unique constraint violation (P2002) occurs:
      if (err?.code === "P2002") {
        // If the enrollmentId already has a card created concurrently, return it
        const checkExisting = await prisma.idCard.findUnique({
          where: { enrollmentId },
        });
        if (checkExisting) {
          return checkExisting;
        }

        // If cardNo collided with another concurrent creation, backoff with jitter and retry
        if (attempt < maxRetries) {
          const jitter = Math.floor(Math.random() * 60) + attempt * 25;
          await new Promise((resolve) => setTimeout(resolve, jitter));
          continue;
        }
      }

      // If max retries reached and still colliding, generate a guaranteed unique card number
      if (attempt === maxRetries) {
        console.warn(
          `[issueIdCard] Hit max retries for enrollment ${enrollmentId}, using unique timestamp suffix fallback.`,
        );
        try {
          const timestampSuffix = `${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`;
          return await prisma.idCard.create({
            data: {
              cardNo: `ID-${new Date().getFullYear()}-${timestampSuffix}`,
              studentId,
              enrollmentId,
            },
          });
        } catch (fallbackErr) {
          const finalCheck = await prisma.idCard.findUnique({
            where: { enrollmentId },
          });
          if (finalCheck) return finalCheck;
          throw fallbackErr;
        }
      }

      throw err;
    }
  }

  const finalCard = await prisma.idCard.findUnique({
    where: { enrollmentId },
  });
  if (finalCard) return finalCard;

  throw new Error(`Failed to issue ID card for enrollment ${enrollmentId}`);
}

