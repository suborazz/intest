-- Add Bank Account Details to instructor registrations.
-- Existing accounts are preserved with empty values; new/updated registrations populate them.
ALTER TABLE "instructor_registrations" ADD COLUMN "accountHolderName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "instructor_registrations" ADD COLUMN "accountNo" TEXT NOT NULL DEFAULT '';
ALTER TABLE "instructor_registrations" ADD COLUMN "ifscCode" TEXT NOT NULL DEFAULT '';
ALTER TABLE "instructor_registrations" ADD COLUMN "bankName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "instructor_registrations" ADD COLUMN "bankBranchAddress" TEXT NOT NULL DEFAULT '';
