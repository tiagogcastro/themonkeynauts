/*
  Warnings:

  - Added the required column `type` to the `sale_events` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SaleEventType" AS ENUM ('MONKEYNAUT', 'SHIP', 'PACK');

-- AlterTable
ALTER TABLE "sale_events" ADD COLUMN     "type" "SaleEventType" NOT NULL;
