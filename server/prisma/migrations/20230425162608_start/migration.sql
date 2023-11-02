/*
  Warnings:

  - You are about to drop the `_ActorToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActorToMovie" DROP CONSTRAINT "_ActorToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActorToMovie" DROP CONSTRAINT "_ActorToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_B_fkey";

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "actorId" INTEGER,
ADD COLUMN     "genreId" INTEGER;

-- DropTable
DROP TABLE "_ActorToMovie";

-- DropTable
DROP TABLE "_GenreToMovie";

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
