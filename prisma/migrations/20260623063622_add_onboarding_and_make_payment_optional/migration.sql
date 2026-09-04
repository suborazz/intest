-- AlterTable
ALTER TABLE "enrollments" ALTER COLUMN "paymentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "internships" ADD COLUMN     "onboardingDetails" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3);
