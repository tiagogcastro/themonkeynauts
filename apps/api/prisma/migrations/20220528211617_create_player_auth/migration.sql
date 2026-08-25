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

-- CreateIndex
CREATE UNIQUE INDEX "player_auth_payload_key" ON "player_auth"("payload");

-- AddForeignKey
ALTER TABLE "player_auth" ADD CONSTRAINT "player_auth_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;
