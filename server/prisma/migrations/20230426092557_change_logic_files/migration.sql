/*
  Warnings:

  - You are about to drop the column `photos` on the `actors` table. All the data in the column will be lost.
  - You are about to drop the column `bigPosters` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `posters` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `videos` on the `movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "actors" DROP COLUMN "photos";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "bigPosters",
DROP COLUMN "posters",
DROP COLUMN "videos";

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActorToFile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_posters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_big_posters" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_videos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "files_url_key" ON "files"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_ActorToFile_AB_unique" ON "_ActorToFile"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorToFile_B_index" ON "_ActorToFile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_posters_AB_unique" ON "_posters"("A", "B");

-- CreateIndex
CREATE INDEX "_posters_B_index" ON "_posters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_big_posters_AB_unique" ON "_big_posters"("A", "B");

-- CreateIndex
CREATE INDEX "_big_posters_B_index" ON "_big_posters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_videos_AB_unique" ON "_videos"("A", "B");

-- CreateIndex
CREATE INDEX "_videos_B_index" ON "_videos"("B");

-- AddForeignKey
ALTER TABLE "_ActorToFile" ADD CONSTRAINT "_ActorToFile_A_fkey" FOREIGN KEY ("A") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToFile" ADD CONSTRAINT "_ActorToFile_B_fkey" FOREIGN KEY ("B") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_posters" ADD CONSTRAINT "_posters_A_fkey" FOREIGN KEY ("A") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_posters" ADD CONSTRAINT "_posters_B_fkey" FOREIGN KEY ("B") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_big_posters" ADD CONSTRAINT "_big_posters_A_fkey" FOREIGN KEY ("A") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_big_posters" ADD CONSTRAINT "_big_posters_B_fkey" FOREIGN KEY ("B") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_videos" ADD CONSTRAINT "_videos_A_fkey" FOREIGN KEY ("A") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_videos" ADD CONSTRAINT "_videos_B_fkey" FOREIGN KEY ("B") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
