/*
  Warnings:

  - You are about to drop the column `canBountyHunt` on the `players` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "players" DROP COLUMN "canBountyHunt";

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

-- CreateIndex
CREATE UNIQUE INDEX "bounty_hunt_ranking_playerId_key" ON "bounty_hunt_ranking"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "init_bounty_hunt_tokens_playerId_key" ON "init_bounty_hunt_tokens"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "init_bounty_hunt_tokens_token_key" ON "init_bounty_hunt_tokens"("token");

-- AddForeignKey
ALTER TABLE "bounty_hunt_ranking" ADD CONSTRAINT "bounty_hunt_ranking_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "init_bounty_hunt_tokens" ADD CONSTRAINT "init_bounty_hunt_tokens_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
