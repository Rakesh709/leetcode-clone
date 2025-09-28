/*
  Warnings:

  - You are about to drop the column `playListId` on the `ProblemInPlaylist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playlistId,problemId]` on the table `ProblemInPlaylist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playlistId` to the `ProblemInPlaylist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ProblemInPlaylist" DROP CONSTRAINT "ProblemInPlaylist_playListId_fkey";

-- DropIndex
DROP INDEX "public"."ProblemInPlaylist_playListId_problemId_key";

-- AlterTable
ALTER TABLE "public"."ProblemInPlaylist" DROP COLUMN "playListId",
ADD COLUMN     "playlistId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProblemInPlaylist_playlistId_problemId_key" ON "public"."ProblemInPlaylist"("playlistId", "problemId");

-- AddForeignKey
ALTER TABLE "public"."ProblemInPlaylist" ADD CONSTRAINT "ProblemInPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "public"."Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
