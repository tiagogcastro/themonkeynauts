/*
  Warnings:

  - You are about to drop the column `class` on the `monkeynauts` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `ships` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "monkeynauts" DROP COLUMN "class",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'SOLDIER';

-- AlterTable
ALTER TABLE "ships" DROP COLUMN "class",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'FIGHTER';
