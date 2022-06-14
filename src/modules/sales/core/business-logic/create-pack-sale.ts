import { inject, injectable } from 'tsyringe';

import { IPackSale, PackSale } from '@modules/sales/domain/entities/pack-sale';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { CreatePackSaleRequestDTO } from '@modules/sales/dtos/create-pack-sale-request';
import { AppError } from '@shared/errors/app-error';

@injectable()
class CreatePackSaleBusinessLogic {
  constructor(
    @inject('PackSalesRepository')
    private packSalesRepository: IPackSalesRepository,
  ) {}

  async execute({
    crypto,
    price,
    advanced,
    basic,
    expert,
    quantity,
    startDate,
    totalUnitsSold,
    endDate,
  }: CreatePackSaleRequestDTO): Promise<IPackSale> {
    const percentages = [advanced, basic, expert];

    const totalPercentage = percentages.reduce(
      (previousPercentage, percentage) => previousPercentage + percentage,
      0,
    );

    if (totalPercentage !== 100) {
      throw new AppError('Monkeynaut sale percentage must be 100%');
    }

    const { packSale } = new PackSale({
      advanced,
      basic,
      expert,
      endDate,
      crypto,
      price,
      quantity,
      startDate,
      currentQuantityAvailable: quantity,
      totalUnitsSold,
      active: true,
    });

    await this.packSalesRepository.create(packSale);

    return packSale;
  }
}

export { CreatePackSaleBusinessLogic };
