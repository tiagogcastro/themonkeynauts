-- AlterTable
ALTER TABLE "monkeynaut_sales" ADD COLUMN     "currentQuantityAvailable" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "pack_sales" ADD COLUMN     "currentQuantityAvailable" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ship_sales" ADD COLUMN     "currentQuantityAvailable" INTEGER NOT NULL DEFAULT 0;
