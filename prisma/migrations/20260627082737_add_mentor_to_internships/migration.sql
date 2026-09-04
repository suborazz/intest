-- AlterTable
ALTER TABLE "internships" ADD COLUMN     "mentorId" TEXT;

-- CreateIndex
CREATE INDEX "internships_mentorId_idx" ON "internships"("mentorId");

-- AddForeignKey
ALTER TABLE "internships" ADD CONSTRAINT "internships_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
