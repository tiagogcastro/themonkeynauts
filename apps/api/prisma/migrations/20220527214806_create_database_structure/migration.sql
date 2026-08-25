-- CreateEnum
CREATE TYPE "PlayerRole" AS ENUM ('ADMIN', 'DEFAULT');

-- CreateTable
CREATE TABLE "logs" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "content" TEXT NOT NULL,
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
    "role" "PlayerRole" NOT NULL DEFAULT E'DEFAULT',
    "hasAsteroid" BOOLEAN NOT NULL DEFAULT false,
    "canBountyHunt" BOOLEAN NOT NULL DEFAULT true,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
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
    "ownerId" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "bonusValue" INTEGER NOT NULL,
    "bonus" TEXT NOT NULL,
    "maxEnergy" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "avatar" TEXT,
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
    "spc" INTEGER NOT NULL DEFAULT 0,
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
    "ownerId" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "bonusValue" INTEGER NOT NULL,
    "bonusDescription" TEXT NOT NULL,
    "tankCapacity" INTEGER NOT NULL,
    "fuel" INTEGER NOT NULL,
    "avatar" TEXT,
    "breedCount" INTEGER NOT NULL,
    "onSale" BOOLEAN NOT NULL DEFAULT false,
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

-- CreateIndex
CREATE UNIQUE INDEX "players_nickname_key" ON "players"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- CreateIndex
CREATE UNIQUE INDEX "players_wallet_key" ON "players"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "player_tokens_token_key" ON "player_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "resources_playerId_key" ON "resources"("playerId");

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "crews" ADD CONSTRAINT "crews_monkeynautId_fkey" FOREIGN KEY ("monkeynautId") REFERENCES "monkeynauts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crews" ADD CONSTRAINT "crews_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "ships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
