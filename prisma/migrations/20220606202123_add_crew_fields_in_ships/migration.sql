/*
  Warnings:

  - Added the required column `crew` to the `ships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crewCapacity` to the `ships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ships" ADD COLUMN     "crew" INTEGER NOT NULL,
ADD COLUMN     "crewCapacity" INTEGER NOT NULL;
