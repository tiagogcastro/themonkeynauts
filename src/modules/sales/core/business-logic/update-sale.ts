import { inject, injectable } from 'tsyringe';

import { UpdateSaleRequestDTO } from '@modules/sales/dtos/update-sale-request';

import { IDateProvider } from '@shared/domain/providers/date-provider';
import { AppError } from '@shared/errors/app-error';

import { IMonkeynautSale } from '@modules/sales/domain/entities/monkeynaut-sale';
import { IPackSale } from '@modules/sales/domain/entities/pack-sale';
import { IShipSale } from '@modules/sales/domain/entities/ship-sale';

type Response = {
  sale: IPackSale | IShipSale | IMonkeynautSale;
};

@injectable()
class UpdateSaleBusinessLogic {
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
  }: UpdateSaleRequestDTO): Promise<Response> {
    const currentDate = new Date();

    if (endDate) {
      if (this.dateProvider.isBefore(endDate, currentDate)) {
        throw new AppError('End date must be after current date');
      }

      if (this.dateProvider.isAfter(startDate, endDate)) {
        throw new AppError('The start date must be less than the end time');
      }
    }

    if (startDate) {
      if (this.dateProvider.isBefore(startDate, currentDate)) {
        throw new AppError('Start date must be after current date');
      }
    }

    const updatedSale = await sale.execute({
      salePack: {
        salePackId: salePack?.salePackId as string,
        advanced: salePack?.advanced as number,
        basic: salePack?.basic as number,
        expert: salePack?.expert as number,
      },

      saleShip: {
        saleShipId: saleShip?.saleShipId as string,
        rank_a: saleShip?.rank_a as number,
        rank_b: saleShip?.rank_b as number,
        rank_s: saleShip?.rank_s as number,
      },

      saleMonkeynaut: {
        saleMonkeynautId: saleMonkeynaut?.saleMonkeynautId as string,
        captain: saleMonkeynaut?.captain as number,
        major: saleMonkeynaut?.major as number,
        private: saleMonkeynaut?.private as number,
        sargeant: saleMonkeynaut?.sargeant as number,
      },

      price: data.price,
      crypto: data.crypto,
      quantity: data.quantity,
      totalUnitsSold: data.totalUnitsSold,
      active: data.active,
      startDate,
      endDate,
    });

    return {
      sale: updatedSale,
    };
  }
}

export { UpdateSaleBusinessLogic };
