/*
  Warnings:

  - Added the required column `members` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "members" JSONB NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
