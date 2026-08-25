/*
  Warnings:

  - You are about to drop the column `avatar` on the `monkeynauts` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `ships` table. All the data in the column will be lost.
  - You are about to drop the column `crew` on the `ships` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "monkeynauts" DROP COLUMN "avatar";

-- AlterTable
ALTER TABLE "ships" DROP COLUMN "avatar",
DROP COLUMN "crew";
