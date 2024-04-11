/*
  Warnings:

  - Added the required column `receiverId` to the `TripInvite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TripInvite" ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pending" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "receiverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TripInvite" ADD CONSTRAINT "TripInvite_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
