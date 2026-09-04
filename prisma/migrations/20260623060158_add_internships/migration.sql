-- CreateEnum
CREATE TYPE "InternshipType" AS ENUM ('PAID', 'STIPEND', 'FREE');

-- CreateTable
CREATE TABLE "internships" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" "InternshipType" NOT NULL,
    "price" DOUBLE PRECISION,
    "stipendAmount" DOUBLE PRECISION,
    "duration" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,

    CONSTRAINT "internships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "internships_type_idx" ON "internships"("type");

-- CreateIndex
CREATE INDEX "internships_createdById_idx" ON "internships"("createdById");

-- AddForeignKey
ALTER TABLE "internships" ADD CONSTRAINT "internships_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
