/*
  Warnings:

  - You are about to drop the column `a` on the `ShipSale` table. All the data in the column will be lost.
  - You are about to drop the column `b` on the `ShipSale` table. All the data in the column will be lost.
  - You are about to drop the column `s` on the `ShipSale` table. All the data in the column will be lost.
  - You are about to drop the column `crypto` on the `sale_events` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `sale_events` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `sale_events` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `sale_events` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `sale_events` table. All the data in the column will be lost.
  - You are about to drop the column `totalUnitsSold` on the `sale_events` table. All the data in the column will be lost.
  - Added the required column `crypto` to the `MonkeynautSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `MonkeynautSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `MonkeynautSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `MonkeynautSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `MonkeynautSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalUnitsSold` to the `MonkeynautSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crypto` to the `PackSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `PackSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `PackSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `PackSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `PackSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalUnitsSold` to the `PackSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crypto` to the `ShipSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `ShipSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ShipSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ShipSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank_a` to the `ShipSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank_b` to the `ShipSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank_s` to the `ShipSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `ShipSale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalUnitsSold` to the `ShipSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonkeynautSale" ADD COLUMN     "crypto" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalUnitsSold" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PackSale" ADD COLUMN     "crypto" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalUnitsSold" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ShipSale" DROP COLUMN "a",
DROP COLUMN "b",
DROP COLUMN "s",
ADD COLUMN     "crypto" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "rank_a" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rank_b" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rank_s" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalUnitsSold" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sale_events" DROP COLUMN "crypto",
DROP COLUMN "endDate",
DROP COLUMN "price",
DROP COLUMN "quantity",
DROP COLUMN "startDate",
DROP COLUMN "totalUnitsSold";
