/*
  Warnings:

  - You are about to drop the `tripMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tripMember" DROP CONSTRAINT "tripMember_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "tripMember" DROP CONSTRAINT "tripMember_userId_fkey";

-- DropTable
DROP TABLE "tripMember";

-- CreateTable
CREATE TABLE "TripMember" (
    "experienceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TripMember_pkey" PRIMARY KEY ("experienceId","userId")
);

-- AddForeignKey
ALTER TABLE "TripMember" ADD CONSTRAINT "TripMember_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripMember" ADD CONSTRAINT "TripMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
