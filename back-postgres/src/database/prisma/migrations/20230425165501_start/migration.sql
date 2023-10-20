/*
  Warnings:

  - You are about to drop the column `actorId` on the `movies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_actorId_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "actorId";
