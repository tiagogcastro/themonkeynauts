import { inject, injectable } from 'tsyringe';

import { IPackSale, PackSale } from '@modules/sales/domain/entities/pack-sale';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { AppError } from '@shared/errors/app-error';
import { UpdatePackSaleRequestDTO } from '@modules/sales/dtos/update-pack-sale-request';

@injectable()
class UpdatePackSaleBusinessLogic {
  constructor(
    @inject('PackSalesRepository')
    private packSalesRepository: IPackSalesRepository,
  ) {}

  async execute({
    endDate,
    crypto,
    price,
    quantity,
    salePack,

    currentQuantityAvailable,

    startDate,
    totalUnitsSold,
    active,
  }: UpdatePackSaleRequestDTO): Promise<IPackSale> {
    const foundPackSale = await this.packSalesRepository.findById(
      salePack?.salePackId as string,
    );

    if (!foundPackSale) {
      throw new AppError('Pack Sale does not exist', 404);
    }

    const { packSale } = new PackSale(
      {
        crypto: crypto ?? foundPackSale.crypto,
        price: price ?? foundPackSale.price,
        quantity: quantity ?? foundPackSale.quantity,
        type: salePack?.type ?? foundPackSale.type,
        totalUnitsSold: totalUnitsSold ?? foundPackSale.totalUnitsSold,
        currentQuantityAvailable:
          quantity ??
          currentQuantityAvailable ??
          foundPackSale.currentQuantityAvailable,

        startDate: startDate ?? foundPackSale.startDate,
        endDate: endDate ?? foundPackSale.endDate,

        active: active ?? foundPackSale.active,
      },
      {
        updatedAt: new Date(),
        createdAt: foundPackSale.createdAt,
        id: foundPackSale.id,
      },
    );

    await this.packSalesRepository.update(packSale);

    return packSale;
  }
}

export { UpdatePackSaleBusinessLogic };
