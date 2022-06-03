import { prisma } from '@shared/infra/database/prisma/client';

import {
  IPrivateSale,
  PrivateSale,
} from '@modules/private-sales/domain/entities/private-sale';
import { IPrivateSalesRepository } from '@modules/private-sales/domain/repositories/private-sales-repositories';
import { AsyncMaybe } from '@shared/types/maybe';
import { PrivateSale as PrismaPrivateSale } from '@prisma/client';

const parsePrivateSale = (log: PrismaPrivateSale): IPrivateSale => {
  return new PrivateSale(log, {
    id: log.id,
    createdAt: log.createdAt,
    updatedAt: log.updatedAt,
  }).privateSale;
};

class PrismaPrivateSalesRepository implements IPrivateSalesRepository {
  async listAllPrivateSalesFromPlayer(
    player_id: string,
  ): Promise<IPrivateSale[]> {
    const privateSales = await prisma.privateSale.findMany({
      where: {
        playerId: player_id,
      },
    });

    return privateSales.map(parsePrivateSale);
  }

  async listAllPrivateSales(): Promise<IPrivateSale[]> {
    const privateSales = await prisma.privateSale.findMany();

    return privateSales.map(parsePrivateSale);
  }

  async findByTxHash(tx_hash: string): AsyncMaybe<IPrivateSale> {
    const privateSale = await prisma.privateSale.findUnique({
      where: {
        txHash: tx_hash,
      },
    });

    if (!privateSale) return null;

    return parsePrivateSale(privateSale);
  }

  async listAllPrivateSalesFromWallet(wallet: string): Promise<IPrivateSale[]> {
    const privateSales = await prisma.privateSale.findMany({
      where: {
        wallet,
      },
    });

    return privateSales.map(parsePrivateSale);
  }

  async create({ id: private_sale_id, ...props }: IPrivateSale): Promise<void> {
    await prisma.privateSale.create({
      data: {
        id: private_sale_id,
        ...props,
      },
    });
  }
}

export { PrismaPrivateSalesRepository };
