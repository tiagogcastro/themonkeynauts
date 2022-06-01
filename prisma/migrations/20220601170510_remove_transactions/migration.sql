/*
  Warnings:

  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[txHash]` on the table `private_sales` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `txHash` to the `private_sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_wallet_fkey";

-- AlterTable
ALTER TABLE "private_sales" ADD COLUMN     "txHash" TEXT NOT NULL;

-- DropTable
DROP TABLE "transactions";

-- CreateIndex
CREATE UNIQUE INDEX "private_sales_txHash_key" ON "private_sales"("txHash");
