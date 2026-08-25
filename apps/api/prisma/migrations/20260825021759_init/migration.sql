-- CreateTable
CREATE TABLE "logs" (
    "id" UUID NOT NULL,
    "playerId" UUID,
    "action" TEXT NOT NULL,
    "txHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" UUID NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "wallet" TEXT,
    "role" TEXT NOT NULL DEFAULT 'DEFAULT',
    "hasAsteroid" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "activeShipId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_tokens" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monkeynauts" (
    "id" UUID NOT NULL,
    "ownerId" UUID,
    "playerId" UUID,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Soldier',
    "rank" TEXT NOT NULL,
    "bonusValue" INTEGER NOT NULL,
    "bonusDescription" TEXT NOT NULL,
    "maxEnergy" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "basePower" INTEGER NOT NULL,
    "baseSpeed" INTEGER NOT NULL,
    "baseResistence" INTEGER NOT NULL,
    "baseHealth" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "resistence" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "breedCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monkeynauts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "spc" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "iron" INTEGER NOT NULL DEFAULT 0,
    "copper" INTEGER NOT NULL DEFAULT 0,
    "scrap" INTEGER NOT NULL DEFAULT 0,
    "science" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ships" (
    "id" UUID NOT NULL,
    "ownerId" UUID,
    "playerId" UUID,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Fighter',
    "rank" TEXT NOT NULL,
    "bonusValue" INTEGER NOT NULL,
    "bonusDescription" TEXT NOT NULL,
    "tankCapacity" INTEGER NOT NULL,
    "fuel" INTEGER NOT NULL,
    "crewCapacity" INTEGER NOT NULL,
    "breedCount" INTEGER NOT NULL,
    "onSale" BOOLEAN NOT NULL DEFAULT false,
    "canRefuelAtStation" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crews" (
    "id" UUID NOT NULL,
    "shipId" UUID NOT NULL,
    "monkeynautId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_auth" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "isLogged" BOOLEAN NOT NULL DEFAULT false,
    "isValidToken" BOOLEAN NOT NULL DEFAULT false,
    "payload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expireIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "private_sales" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "wallet" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "bnbAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "private_sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monkeynaut_sales" (
    "id" UUID NOT NULL,
    "crypto" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,
    "currentQuantityAvailable" INTEGER NOT NULL DEFAULT 0,
    "totalUnitsSold" INTEGER NOT NULL DEFAULT 0,
    "private" DOUBLE PRECISION NOT NULL,
    "sergeant" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "captain" DOUBLE PRECISION NOT NULL,
    "major" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
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
    "currentQuantityAvailable" INTEGER NOT NULL DEFAULT 0,
    "totalUnitsSold" INTEGER NOT NULL DEFAULT 0,
    "rankB" DOUBLE PRECISION NOT NULL,
    "rankA" DOUBLE PRECISION NOT NULL,
    "rankS" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
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
    "currentQuantityAvailable" INTEGER NOT NULL DEFAULT 0,
    "totalUnitsSold" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'Basic',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pack_sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bounty_hunt_ranking" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "maxPoints" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bounty_hunt_ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "init_bounty_hunt_tokens" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "init_bounty_hunt_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_params" (
    "id" UUID NOT NULL,
    "gameClientVersion" TEXT NOT NULL,
    "travelFuelConsuption" INTEGER NOT NULL DEFAULT 0,
    "bountyHuntFuelConsuption" INTEGER NOT NULL DEFAULT 0,
    "shipRefuelCostInPercentage" INTEGER NOT NULL DEFAULT 0,
    "bountyHuntMinReward" INTEGER NOT NULL DEFAULT 0,
    "bountyHuntMaxReward" INTEGER NOT NULL DEFAULT 0,
    "mineGoldAverageResourceReward" INTEGER NOT NULL DEFAULT 0,
    "mineGoldAverageSpcReward" INTEGER NOT NULL DEFAULT 0,
    "mineGoldRewardsVariation" INTEGER NOT NULL DEFAULT 0,
    "mineIronAverageResourceReward" INTEGER NOT NULL DEFAULT 0,
    "mineIronAverageSpcReward" INTEGER NOT NULL DEFAULT 0,
    "mineIronRewardsVariation" INTEGER NOT NULL DEFAULT 0,
    "mineCopperAverageResourceReward" INTEGER NOT NULL DEFAULT 0,
    "mineCopperAverageSpcReward" INTEGER NOT NULL DEFAULT 0,
    "mineCooperRewardsVariation" INTEGER NOT NULL DEFAULT 0,
    "mineScrapAverageResourceReward" INTEGER NOT NULL DEFAULT 0,
    "mineScrapAverageSpcReward" INTEGER NOT NULL DEFAULT 0,
    "mineScrapRewardsVariation" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_params_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "private_sales_p2p" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "bnbAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "private_sales_p2p_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logs_txHash_key" ON "logs"("txHash");

-- CreateIndex
CREATE UNIQUE INDEX "players_nickname_key" ON "players"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- CreateIndex
CREATE UNIQUE INDEX "players_wallet_key" ON "players"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "players_activeShipId_key" ON "players"("activeShipId");

-- CreateIndex
CREATE UNIQUE INDEX "player_tokens_token_key" ON "player_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "resources_playerId_key" ON "resources"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "player_auth_payload_key" ON "player_auth"("payload");

-- CreateIndex
CREATE UNIQUE INDEX "private_sales_txHash_key" ON "private_sales"("txHash");

-- CreateIndex
CREATE UNIQUE INDEX "bounty_hunt_ranking_playerId_key" ON "bounty_hunt_ranking"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "init_bounty_hunt_tokens_playerId_key" ON "init_bounty_hunt_tokens"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "init_bounty_hunt_tokens_token_key" ON "init_bounty_hunt_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "private_sales_p2p_txHash_key" ON "private_sales_p2p"("txHash");

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_activeShipId_fkey" FOREIGN KEY ("activeShipId") REFERENCES "ships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_tokens" ADD CONSTRAINT "player_tokens_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monkeynauts" ADD CONSTRAINT "monkeynauts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monkeynauts" ADD CONSTRAINT "monkeynauts_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ships" ADD CONSTRAINT "ships_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ships" ADD CONSTRAINT "ships_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crews" ADD CONSTRAINT "crews_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "ships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crews" ADD CONSTRAINT "crews_monkeynautId_fkey" FOREIGN KEY ("monkeynautId") REFERENCES "monkeynauts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_auth" ADD CONSTRAINT "player_auth_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private_sales" ADD CONSTRAINT "private_sales_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bounty_hunt_ranking" ADD CONSTRAINT "bounty_hunt_ranking_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "init_bounty_hunt_tokens" ADD CONSTRAINT "init_bounty_hunt_tokens_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
