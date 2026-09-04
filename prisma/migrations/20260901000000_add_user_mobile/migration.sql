-- Existing accounts have no mobile number in the current schema. Preserve those
-- accounts with an empty value; all new registrations are validated as 10 digits.
ALTER TABLE "users" ADD COLUMN "mobile" TEXT NOT NULL DEFAULT '';

ALTER TABLE "users" ALTER COLUMN "mobile" DROP DEFAULT;
