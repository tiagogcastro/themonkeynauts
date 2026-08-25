/*
  Warnings:

  - You are about to drop the column `bonus` on the `monkeynauts` table. All the data in the column will be lost.
  - Added the required column `bonusDescription` to the `monkeynauts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monkeynauts" DROP COLUMN "bonus",
ADD COLUMN     "bonusDescription" TEXT NOT NULL;
