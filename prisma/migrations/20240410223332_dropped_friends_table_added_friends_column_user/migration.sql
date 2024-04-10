/*
  Warnings:

  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendOneId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friendTwoId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "friends" JSONB;

-- DropTable
DROP TABLE "Friend";
