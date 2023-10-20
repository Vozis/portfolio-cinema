/*
  Warnings:

  - You are about to drop the column `movieId` on the `actors` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `genres` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "actors" DROP CONSTRAINT "actors_movieId_fkey";

-- DropForeignKey
ALTER TABLE "genres" DROP CONSTRAINT "genres_movieId_fkey";

-- AlterTable
ALTER TABLE "actors" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "genres" DROP COLUMN "movieId";

-- CreateTable
CREATE TABLE "MoviesOnGenres" (
    "movieId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "MoviesOnGenres_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateTable
CREATE TABLE "MoviesOnActors" (
    "movieId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "MoviesOnActors_pkey" PRIMARY KEY ("movieId","actorId")
);

-- AddForeignKey
ALTER TABLE "MoviesOnGenres" ADD CONSTRAINT "MoviesOnGenres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesOnGenres" ADD CONSTRAINT "MoviesOnGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesOnActors" ADD CONSTRAINT "MoviesOnActors_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesOnActors" ADD CONSTRAINT "MoviesOnActors_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
