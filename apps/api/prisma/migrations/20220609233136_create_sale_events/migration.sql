/*
  Warnings:

  - You are about to drop the column `content` on the `logs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[txHash]` on the table `logs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `action` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logs" DROP COLUMN "content",
ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "txHash" TEXT;

-- CreateTable
CREATE TABLE "sale_events" (
    "id" UUID NOT NULL,
    "crypto" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalUnitsSold" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonkeynautSale" (
    "id" UUID NOT NULL,
    "private" DOUBLE PRECISION NOT NULL,
    "sargeant" DOUBLE PRECISION NOT NULL,
    "captain" DOUBLE PRECISION NOT NULL,
    "major" DOUBLE PRECISION NOT NULL,
    "saleEventId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonkeynautSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipSale" (
    "id" UUID NOT NULL,
    "b" DOUBLE PRECISION NOT NULL,
    "a" DOUBLE PRECISION NOT NULL,
    "s" DOUBLE PRECISION NOT NULL,
    "saleEventId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShipSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackSale" (
    "id" UUID NOT NULL,
    "basic" DOUBLE PRECISION NOT NULL,
    "advanced" DOUBLE PRECISION NOT NULL,
    "expert" DOUBLE PRECISION NOT NULL,
    "saleEventId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackSale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonkeynautSale_saleEventId_key" ON "MonkeynautSale"("saleEventId");

-- CreateIndex
CREATE UNIQUE INDEX "ShipSale_saleEventId_key" ON "ShipSale"("saleEventId");

-- CreateIndex
CREATE UNIQUE INDEX "PackSale_saleEventId_key" ON "PackSale"("saleEventId");

-- CreateIndex
CREATE UNIQUE INDEX "logs_txHash_key" ON "logs"("txHash");

-- AddForeignKey
ALTER TABLE "MonkeynautSale" ADD CONSTRAINT "MonkeynautSale_saleEventId_fkey" FOREIGN KEY ("saleEventId") REFERENCES "sale_events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipSale" ADD CONSTRAINT "ShipSale_saleEventId_fkey" FOREIGN KEY ("saleEventId") REFERENCES "sale_events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackSale" ADD CONSTRAINT "PackSale_saleEventId_fkey" FOREIGN KEY ("saleEventId") REFERENCES "sale_events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
