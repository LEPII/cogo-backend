/*
  Warnings:

  - The primary key for the `TripMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `tripId` to the `TripMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TripMember" DROP CONSTRAINT "TripMember_experienceId_fkey";

-- AlterTable
ALTER TABLE "TripMember" DROP CONSTRAINT "TripMember_pkey",
ADD COLUMN     "tripId" TEXT NOT NULL,
ALTER COLUMN "experienceId" DROP NOT NULL,
ADD CONSTRAINT "TripMember_pkey" PRIMARY KEY ("tripId", "userId");

-- AddForeignKey
ALTER TABLE "TripMember" ADD CONSTRAINT "TripMember_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripMember" ADD CONSTRAINT "TripMember_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE;
