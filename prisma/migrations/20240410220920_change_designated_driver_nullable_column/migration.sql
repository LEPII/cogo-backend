-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_designatedDriverId_fkey";

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "designatedDriverId" DROP NOT NULL,
ALTER COLUMN "chat" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_designatedDriverId_fkey" FOREIGN KEY ("designatedDriverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
