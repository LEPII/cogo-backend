/*
  Warnings:

  - You are about to drop the column `chatId` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chat` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_chatId_fkey";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "chatId",
ADD COLUMN     "chat" JSONB NOT NULL;

-- DropTable
DROP TABLE "Chat";
