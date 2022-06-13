/*
  Warnings:

  - You are about to drop the column `saleEventId` on the `monkeynaut_sales` table. All the data in the column will be lost.
  - You are about to drop the column `saleEventId` on the `pack_sales` table. All the data in the column will be lost.
  - You are about to drop the column `saleEventId` on the `ship_sales` table. All the data in the column will be lost.
  - You are about to drop the `sale_events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "monkeynaut_sales" DROP CONSTRAINT "monkeynaut_sales_saleEventId_fkey";

-- DropForeignKey
ALTER TABLE "pack_sales" DROP CONSTRAINT "pack_sales_saleEventId_fkey";

-- DropForeignKey
ALTER TABLE "ship_sales" DROP CONSTRAINT "ship_sales_saleEventId_fkey";

-- DropIndex
DROP INDEX "monkeynaut_sales_saleEventId_key";

-- DropIndex
DROP INDEX "pack_sales_saleEventId_key";

-- DropIndex
DROP INDEX "ship_sales_saleEventId_key";

-- AlterTable
ALTER TABLE "monkeynaut_sales" DROP COLUMN "saleEventId",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "pack_sales" DROP COLUMN "saleEventId",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ship_sales" DROP COLUMN "saleEventId",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "sale_events";
