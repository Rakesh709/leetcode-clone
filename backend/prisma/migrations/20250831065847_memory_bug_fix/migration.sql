/*
  Warnings:

  - You are about to drop the column `memmory` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Submission" DROP COLUMN "memmory",
ADD COLUMN     "memory" TEXT;
