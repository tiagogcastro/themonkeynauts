-- AlterTable
ALTER TABLE "MonkeynautSale" ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PackSale" ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ShipSale" ALTER COLUMN "endDate" DROP NOT NULL;
