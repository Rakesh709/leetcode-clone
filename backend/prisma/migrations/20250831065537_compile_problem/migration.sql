/*
  Warnings:

  - You are about to drop the column `compiledOutput` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Submission" DROP COLUMN "compiledOutput",
ADD COLUMN     "compileOutput" TEXT;
