/*
  Warnings:

  - You are about to drop the column `experienceId` on the `TripMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TripMember" DROP CONSTRAINT "TripMember_experienceId_fkey";

-- AlterTable
ALTER TABLE "TripMember" DROP COLUMN "experienceId";
