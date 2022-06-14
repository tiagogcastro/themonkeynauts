import { inject, injectable } from 'tsyringe';

import { IShipSale, ShipSale } from '@modules/sales/domain/entities/ship-sale';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { CreateShipSaleRequestDTO } from '@modules/sales/dtos/create-ship-sale-request';
import { AppError } from '@shared/errors/app-error';

@injectable()
class CreateShipSaleBusinessLogic {
  constructor(
    @inject('ShipSalesRepository')
    private shipSalesRepository: IShipSalesRepository,
  ) {}

  async execute({
    crypto,
    price,
    rank_a,
    rank_b,
    rank_s,
    quantity,
    startDate,
    totalUnitsSold,
    endDate,
  }: CreateShipSaleRequestDTO): Promise<IShipSale> {
    const percentages = [rank_a, rank_b, rank_s];

    const totalPercentage = percentages.reduce(
      (previousPercentage, percentage) => previousPercentage + percentage,
      0,
    );

    if (totalPercentage !== 100) {
      throw new AppError('Monkeynaut sale percentage must be 100%');
    }

    const { shipSale } = new ShipSale({
      rank_a,
      rank_b,
      rank_s,
      endDate,
      crypto,
      price,
      quantity,
      startDate,
      totalUnitsSold,
      currentQuantityAvailable: quantity,
      active: true,
    });

    await this.shipSalesRepository.create(shipSale);

    return shipSale;
  }
}

export { CreateShipSaleBusinessLogic };
