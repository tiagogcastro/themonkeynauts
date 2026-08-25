import { inject, injectable } from 'tsyringe';

import { UpdateSaleRequestDTO } from '@modules/sales/dtos/update-sale-request';

import { IDateProvider } from '@shared/domain/providers/date-provider';
import { AppError } from '@shared/errors/app-error';

import { IMonkeynautSale } from '@modules/sales/domain/entities/monkeynaut-sale';
import { IPackSale } from '@modules/sales/domain/entities/pack-sale';
import { IShipSale } from '@modules/sales/domain/entities/ship-sale';
import { Either, right } from '@shared/core/logic/either';

type UpdateSaleResponse = Either<
  Error,
  {
    sale: IPackSale | IShipSale | IMonkeynautSale;
  }
>;

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
  }: UpdateSaleRequestDTO): Promise<UpdateSaleResponse> {
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
        type: salePack?.type,
      },

      saleShip: {
        saleShipId: saleShip?.saleShipId as string,
        rankA: saleShip?.rankA,
        rankB: saleShip?.rankB,
        rankS: saleShip?.rankS,
      },

      saleMonkeynaut: {
        saleMonkeynautId: saleMonkeynaut?.saleMonkeynautId as string,
        captain: saleMonkeynaut?.captain,
        major: saleMonkeynaut?.major,
        private: saleMonkeynaut?.private,
        sergeant: saleMonkeynaut?.sergeant,
      },

      price: data.price,
      crypto: data.crypto,
      quantity: data.quantity,
      currentQuantityAvailable: data.currentQuantityAvailable,
      totalUnitsSold: data.totalUnitsSold,
      active: data.active,
      startDate,
      endDate,
    });

    return right({
      sale: updatedSale,
    });
  }
}

export { UpdateSaleBusinessLogic };
