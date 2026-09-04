import { prisma } from "@/x/e3746f45";

async function generateIdCardNo(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ID-${year}-`;

  const last = await prisma.idCard.findFirst({
    where: { cardNo: { startsWith: prefix } },
    orderBy: { cardNo: "desc" },
  });

  if (!last) {
    return `${prefix}0001`;
  }

  const lastSeq = parseInt(last.cardNo.replace(prefix, ""), 10);
  const nextSeq = String(lastSeq + 1).padStart(4, "0");
  return `${prefix}${nextSeq}`;
}

export async function issueIdCard(studentId: string, enrollmentId: string) {
    const existing = await prisma.idCard.findUnique({
    where: { enrollmentId },
  });

  if (existing) {
    return existing;
  }

  const cardNo = await generateIdCardNo();

  return await prisma.idCard.create({
    data: {
      cardNo,
      studentId,
      enrollmentId,
    },
  });
}
