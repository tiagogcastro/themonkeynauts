import {
  IPrivateSaleP2P,
  PrivateSaleP2P,
} from '@modules/private-p2p/domain/entities/private-p2p';
import { IPrivateSaleP2PRepository } from '@modules/private-p2p/domain/repositories/private-p2p-repositories';
import { PrivateSaleP2P as PrismaPrivateSaleP2P } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';

const parsePrivateSaleP2P = (
  privateSaleP2P: PrismaPrivateSaleP2P,
): IPrivateSaleP2P => {
  return new PrivateSaleP2P(privateSaleP2P, {
    id: privateSaleP2P.id,
    createdAt: privateSaleP2P.createdAt,
    updatedAt: privateSaleP2P.updatedAt,
  }).privateSaleP2P;
};

class PrismaPrivateSaleP2PRepository implements IPrivateSaleP2PRepository {
  async findByTxHash(txHash: string): AsyncMaybe<IPrivateSaleP2P> {
    const privateSaleP2P = await prisma.privateSaleP2P.findUnique({
      where: {
        txHash,
      },
    });

    if (!privateSaleP2P) {
      return null;
    }

    return parsePrivateSaleP2P(privateSaleP2P);
  }

  async create({
    id: privateSaleP2PId,
    ...props
  }: IPrivateSaleP2P): Promise<void> {
    if (props.txHash) {
      const privateSaleP2P = await prisma.privateSaleP2P.findUnique({
        where: {
          txHash: props.txHash,
        },
      });

      if (privateSaleP2P) {
        return;
      }
    }

    await prisma.privateSaleP2P.create({
      data: {
        id: privateSaleP2PId,
        ...props,
      },
    });
  }

  async listAllPrivateSaleP2P(): Promise<IPrivateSaleP2P[]> {
    const privateSaleP2P = await prisma.privateSaleP2P.findMany();

    return privateSaleP2P.map(parsePrivateSaleP2P);
  }

  async listManyPrivateSaleP2PFromPlayer(
    email: string,
  ): Promise<IPrivateSaleP2P[]> {
    const privateSaleP2P = await prisma.privateSaleP2P.findMany({
      where: {
        email,
      },
    });

    return privateSaleP2P.map(parsePrivateSaleP2P);
  }
}

export { PrismaPrivateSaleP2PRepository };
