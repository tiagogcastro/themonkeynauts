-- AlterTable
ALTER TABLE "monkeynauts" ALTER COLUMN "role" SET DEFAULT E'Soldier';

-- AlterTable
ALTER TABLE "pack_sales" ALTER COLUMN "type" SET DEFAULT E'Basic';

-- AlterTable
ALTER TABLE "ships" ALTER COLUMN "role" SET DEFAULT E'Fighter';

-- CreateTable
CREATE TABLE "game_params" (
    "id" UUID NOT NULL,
    "gameClientVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_params_pkey" PRIMARY KEY ("id")
);
