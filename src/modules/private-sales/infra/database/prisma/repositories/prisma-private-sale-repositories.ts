// import { PrivateSale as PrismaPrivateSale } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';

import { IPrivateSale } from '@modules/private-sales/domain/entities/private-sale';
import { IPrivateSaleRepository } from '@modules/private-sales/domain/repositories/private-sales-repositories';

// const parsePrivateSale = (log: PrismaPrivateSale): IPrivateSale => {
//   return new PrivateSale(log, {
//     id: log.id,
//     createdAt: log.createdAt,
//     updatedAt: log.updatedAt,
//   }).privateSale;
// };

class PrismaPrivateSalesRepository implements IPrivateSaleRepository {
  async create({ bnbAmount, playerId, wallet, ...props }: IPrivateSale): Promise<void> {
    // error in id
    await prisma.privateSale.create({
      data: {
        bnbAmount, 
        playerId, 
        wallet,
        ...props,
      },
    });
  }
}

export { PrismaPrivateSalesRepository };
