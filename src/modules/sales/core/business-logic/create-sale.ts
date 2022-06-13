import { inject, injectable } from 'tsyringe';

import { CreateSaleRequestDTO } from '@modules/sales/dtos/create-sale-request';

import { IDateProvider } from '@shared/domain/providers/date-provider';
import { AppError } from '@shared/errors/app-error';

import { IMonkeynautSale } from '@modules/sales/domain/entities/monkeynaut-sale';
import { IPackSale } from '@modules/sales/domain/entities/pack-sale';
import { IShipSale } from '@modules/sales/domain/entities/ship-sale';

type Response = {
  sale: IPackSale | IShipSale | IMonkeynautSale;
};

@injectable()
class CreateSaleBusinessLogic {
  constructor(
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    salePack,
    saleShip,
    saleMonkeynaut,
    endDate,
    sale,
    startDate,
    ...data
  }: CreateSaleRequestDTO): Promise<Response> {
    const currentDate = new Date();

    if (endDate) {
      if (this.dateProvider.isBefore(endDate, currentDate)) {
        throw new AppError('End date must be after current date');
      }

      if (this.dateProvider.isAfter(startDate, endDate)) {
        throw new AppError('The start date must be less than the end time');
      }
    }

    if (this.dateProvider.isBefore(startDate, currentDate)) {
      throw new AppError('Start date must be after current date');
    }

    const createdSale = await sale.execute({
      advanced: salePack?.advanced as number,
      basic: salePack?.basic as number,
      expert: salePack?.expert as number,

      rank_a: saleShip?.rank_a as number,
      rank_b: saleShip?.rank_b as number,
      rank_s: saleShip?.rank_s as number,

      captain: saleMonkeynaut?.captain as number,
      major: saleMonkeynaut?.major as number,
      private: saleMonkeynaut?.private as number,
      sargeant: saleMonkeynaut?.sargeant as number,

      price: data.price,
      crypto: data.crypto,
      quantity: data.quantity,
      totalUnitsSold: data.totalUnitsSold,
      startDate,
      endDate,
    });

    return {
      sale: createdSale,
    };
  }
}

export { CreateSaleBusinessLogic };
