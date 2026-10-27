-- Add missing columns and tables to match schema
ALTER TABLE "notices" ADD COLUMN IF NOT EXISTS "linkUrl" TEXT;
ALTER TABLE "job_opportunities" ADD COLUMN IF NOT EXISTS "salary" TEXT;
ALTER TABLE "immersions" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
ALTER TABLE "immersions" ADD COLUMN IF NOT EXISTS "imagePublicId" TEXT;
ALTER TABLE "job_placement_companies" ADD COLUMN IF NOT EXISTS "salaryRange" TEXT;

-- Create institution_officials table
CREATE TABLE IF NOT EXISTS "institution_officials" (
    "id" TEXT NOT NULL,
    "slNo" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "workingLocation" TEXT NOT NULL,
    "mobile" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "institution_officials_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "institution_officials_slNo_idx" ON "institution_officials"("slNo");
CREATE INDEX IF NOT EXISTS "institution_officials_isActive_idx" ON "institution_officials"("isActive");
