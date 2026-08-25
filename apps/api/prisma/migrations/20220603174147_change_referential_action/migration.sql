-- DropForeignKey
ALTER TABLE "crews" DROP CONSTRAINT "crews_monkeynautId_fkey";

-- DropForeignKey
ALTER TABLE "crews" DROP CONSTRAINT "crews_shipId_fkey";

-- DropForeignKey
ALTER TABLE "player_auth" DROP CONSTRAINT "player_auth_playerId_fkey";

-- DropForeignKey
ALTER TABLE "private_sales" DROP CONSTRAINT "private_sales_playerId_fkey";

-- AlterTable
ALTER TABLE "logs" ALTER COLUMN "playerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "monkeynauts" ALTER COLUMN "ownerId" DROP NOT NULL,
ALTER COLUMN "playerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ships" ALTER COLUMN "ownerId" DROP NOT NULL,
ALTER COLUMN "playerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "crews" ADD CONSTRAINT "crews_monkeynautId_fkey" FOREIGN KEY ("monkeynautId") REFERENCES "monkeynauts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crews" ADD CONSTRAINT "crews_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "ships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_auth" ADD CONSTRAINT "player_auth_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private_sales" ADD CONSTRAINT "private_sales_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
