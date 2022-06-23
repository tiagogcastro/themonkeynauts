/*
  Warnings:

  - You are about to drop the column `enabled` on the `players` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "players" DROP COLUMN "enabled",
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isEnabled" BOOLEAN NOT NULL DEFAULT true;
