/*
  Warnings:

  - A unique constraint covering the columns `[movieId,userId]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ratings_movieId_userId_key" ON "ratings"("movieId", "userId");
