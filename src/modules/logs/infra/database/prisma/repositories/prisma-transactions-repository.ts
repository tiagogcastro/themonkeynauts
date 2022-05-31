import {
  ITransaction,
  Transaction,
} from '@modules/logs/domain/entities/transaction';
import { ITransactionsRepository } from '@modules/logs/domain/repositories/transactions-repository';
import { Transaction as PrismaTransaction } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

const parseTransaction = (transaction: PrismaTransaction): ITransaction => {
  return new Transaction(transaction, {
    id: transaction.id,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  }).transaction;
};

class PrismaTransactionsRepository implements ITransactionsRepository {
  async create({ id: transaction_id, ...props }: ITransaction): Promise<void> {
    await prisma.transaction.create({
      data: {
        id: transaction_id,
        ...props,
      },
    });
  }

  async listAllTransactions(): Promise<ITransaction[]> {
    const transactions = await prisma.transaction.findMany();

    return transactions.map(parseTransaction);
  }

  async findByTxHash(tx_hash: string): AsyncMaybe<ITransaction> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        txHash: tx_hash,
      },
    });

    if (!transaction) return null;

    return parseTransaction(transaction);
  }

  async listAllTransactionsFromWallet(wallet: string): Promise<ITransaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        wallet,
      },
    });

    return transactions.map(parseTransaction);
  }
}

export { PrismaTransactionsRepository };
