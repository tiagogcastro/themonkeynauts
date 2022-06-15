/*
  Warnings:

  - You are about to drop the column `sargeant` on the `monkeynaut_sales` table. All the data in the column will be lost.
  - You are about to drop the column `advanced` on the `pack_sales` table. All the data in the column will be lost.
  - You are about to drop the column `basic` on the `pack_sales` table. All the data in the column will be lost.
  - You are about to drop the column `expert` on the `pack_sales` table. All the data in the column will be lost.
  - The `role` column on the `players` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `rank_a` on the `ship_sales` table. All the data in the column will be lost.
  - You are about to drop the column `rank_b` on the `ship_sales` table. All the data in the column will be lost.
  - You are about to drop the column `rank_s` on the `ship_sales` table. All the data in the column will be lost.
  - Added the required column `rankA` to the `ship_sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rankB` to the `ship_sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rankS` to the `ship_sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monkeynaut_sales" DROP COLUMN "sargeant",
ADD COLUMN     "sergeant" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "pack_sales" DROP COLUMN "advanced",
DROP COLUMN "basic",
DROP COLUMN "expert",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT E'BASIC';

-- AlterTable
ALTER TABLE "players" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'DEFAULT';

-- AlterTable
ALTER TABLE "ship_sales" DROP COLUMN "rank_a",
DROP COLUMN "rank_b",
DROP COLUMN "rank_s",
ADD COLUMN     "rankA" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rankB" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rankS" DOUBLE PRECISION NOT NULL;

-- DropEnum
DROP TYPE "PlayerRole";

-- DropEnum
DROP TYPE "SaleEventType";
