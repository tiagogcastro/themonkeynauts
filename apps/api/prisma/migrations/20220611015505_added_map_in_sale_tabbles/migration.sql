/*
  Warnings:

  - You are about to drop the `MonkeynautSale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackSale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShipSale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MonkeynautSale" DROP CONSTRAINT "MonkeynautSale_saleEventId_fkey";

-- DropForeignKey
ALTER TABLE "PackSale" DROP CONSTRAINT "PackSale_saleEventId_fkey";

-- DropForeignKey
ALTER TABLE "ShipSale" DROP CONSTRAINT "ShipSale_saleEventId_fkey";

-- DropTable
DROP TABLE "MonkeynautSale";

-- DropTable
DROP TABLE "PackSale";

-- DropTable
DROP TABLE "ShipSale";

-- CreateTable
CREATE TABLE "monkeynaut_sales" (
    "id" UUID NOT NULL,
    "crypto" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,
    "totalUnitsSold" INTEGER NOT NULL DEFAULT 0,
    "private" DOUBLE PRECISION NOT NULL,
    "sargeant" DOUBLE PRECISION NOT NULL,
    "captain" DOUBLE PRECISION NOT NULL,
    "major" DOUBLE PRECISION NOT NULL,
    "saleEventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monkeynaut_sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ship_sales" (
    "id" UUID NOT NULL,
    "crypto" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,
    "totalUnitsSold" INTEGER NOT NULL DEFAULT 0,
    "rank_b" DOUBLE PRECISION NOT NULL,
    "rank_a" DOUBLE PRECISION NOT NULL,
    "rank_s" DOUBLE PRECISION NOT NULL,
    "saleEventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ship_sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pack_sales" (
    "id" UUID NOT NULL,
    "crypto" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,
    "totalUnitsSold" INTEGER NOT NULL DEFAULT 0,
    "basic" DOUBLE PRECISION NOT NULL,
    "advanced" DOUBLE PRECISION NOT NULL,
    "expert" DOUBLE PRECISION NOT NULL,
    "saleEventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pack_sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "monkeynaut_sales_saleEventId_key" ON "monkeynaut_sales"("saleEventId");

-- CreateIndex
CREATE UNIQUE INDEX "ship_sales_saleEventId_key" ON "ship_sales"("saleEventId");

-- CreateIndex
CREATE UNIQUE INDEX "pack_sales_saleEventId_key" ON "pack_sales"("saleEventId");

-- AddForeignKey
ALTER TABLE "monkeynaut_sales" ADD CONSTRAINT "monkeynaut_sales_saleEventId_fkey" FOREIGN KEY ("saleEventId") REFERENCES "sale_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ship_sales" ADD CONSTRAINT "ship_sales_saleEventId_fkey" FOREIGN KEY ("saleEventId") REFERENCES "sale_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pack_sales" ADD CONSTRAINT "pack_sales_saleEventId_fkey" FOREIGN KEY ("saleEventId") REFERENCES "sale_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
