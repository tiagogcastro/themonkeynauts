-- AlterTable
ALTER TABLE "game_params" ADD COLUMN     "bountyHuntFuelConsuption" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bountyHuntMaxReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bountyHuntMinReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineCooperRewardsVariation" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineCopperAverageResourceReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineCopperAverageSpcReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineGoldAverageResourceReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineGoldAverageSpcReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineGoldRewardsVariation" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineIronAverageResourceReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineIronAverageSpcReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineIronRewardsVariation" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineScrapAverageResourceReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineScrapAverageSpcReward" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mineScrapRewardsVariation" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shipRefuelCostInPercentage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "travelFuelConsuption" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "private_sales_p2p" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "bnbAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "private_sales_p2p_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "private_sales_p2p_txHash_key" ON "private_sales_p2p"("txHash");
