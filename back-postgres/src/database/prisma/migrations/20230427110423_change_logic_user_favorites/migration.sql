/*
  Warnings:

  - You are about to drop the column `userId` on the `movies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_userId_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "userId";
