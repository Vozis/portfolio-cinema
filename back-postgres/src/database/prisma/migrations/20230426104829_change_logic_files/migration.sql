/*
  Warnings:

  - You are about to drop the `_ActorToFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_big_posters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_posters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_videos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `folder` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ActorToFile" DROP CONSTRAINT "_ActorToFile_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActorToFile" DROP CONSTRAINT "_ActorToFile_B_fkey";

-- DropForeignKey
ALTER TABLE "_big_posters" DROP CONSTRAINT "_big_posters_A_fkey";

-- DropForeignKey
ALTER TABLE "_big_posters" DROP CONSTRAINT "_big_posters_B_fkey";

-- DropForeignKey
ALTER TABLE "_posters" DROP CONSTRAINT "_posters_A_fkey";

-- DropForeignKey
ALTER TABLE "_posters" DROP CONSTRAINT "_posters_B_fkey";

-- DropForeignKey
ALTER TABLE "_videos" DROP CONSTRAINT "_videos_A_fkey";

-- DropForeignKey
ALTER TABLE "_videos" DROP CONSTRAINT "_videos_B_fkey";

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "bigPosterId" INTEGER,
ADD COLUMN     "folder" TEXT NOT NULL,
ADD COLUMN     "photoId" INTEGER,
ADD COLUMN     "posterId" INTEGER,
ADD COLUMN     "videoId" INTEGER;

-- DropTable
DROP TABLE "_ActorToFile";

-- DropTable
DROP TABLE "_big_posters";

-- DropTable
DROP TABLE "_posters";

-- DropTable
DROP TABLE "_videos";

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "actors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_bigPosterId_fkey" FOREIGN KEY ("bigPosterId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
