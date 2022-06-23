/*
  Warnings:

  - A unique constraint covering the columns `[activeShipId]` on the table `players` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "activeShipId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "players_activeShipId_key" ON "players"("activeShipId");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_activeShipId_fkey" FOREIGN KEY ("activeShipId") REFERENCES "ships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
