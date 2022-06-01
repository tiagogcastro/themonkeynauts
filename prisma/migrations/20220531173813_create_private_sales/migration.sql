-- CreateTable
CREATE TABLE "private_sales" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "wallet" TEXT NOT NULL,
    "bnbAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "private_sales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "private_sales" ADD CONSTRAINT "private_sales_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;
