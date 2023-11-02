/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `MoviesOnActors` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `MoviesOnActors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MoviesOnActors" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";
