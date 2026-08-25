import { inject, injectable } from 'tsyringe';

import { CreateSaleRequestDTO } from '@modules/sales/dtos/create-sale-request';

import { IDateProvider } from '@shared/domain/providers/date-provider';
import { AppError } from '@shared/errors/app-error';

import { IMonkeynautSale } from '@modules/sales/domain/entities/monkeynaut-sale';
import { IPackSale } from '@modules/sales/domain/entities/pack-sale';
import { IShipSale } from '@modules/sales/domain/entities/ship-sale';
import { PackType } from '@modules/sales/domain/enums/pack-type';
import { Either, right } from '@shared/core/logic/either';
import { Maybe } from '@shared/core/logic/maybe';

type CreateSaleResponse = Either<
  Error,
  {
    sale: IPackSale | IShipSale | IMonkeynautSale;
  }
>;

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
    endDate: _endDate,
    sale,
    adminId,
    startDate,
    ...data
  }: CreateSaleRequestDTO): Promise<CreateSaleResponse> {
    const currentDate = this.dateProvider.addMinutes(new Date(), -5);

    let endDate: Date | undefined;

    if (_endDate) {
      endDate = this.dateProvider.isEqual(_endDate, startDate)
        ? this.dateProvider.addDays(_endDate, 1)
        : _endDate;

      if (this.dateProvider.isBefore(endDate, currentDate)) {
        throw new AppError('End date must be later than the current date');
      }

      if (this.dateProvider.isAfter(startDate, endDate)) {
        throw new AppError('Start date must be less than the end date');
      }
    }

    if (this.dateProvider.isBefore(startDate, currentDate)) {
      throw new AppError('Start date must be later than the current date');
    }

    const createdSale = await sale.execute({
      type: salePack?.type as PackType,

      rankA: saleShip?.rankA as number,
      rankB: saleShip?.rankB as number,
      rankS: saleShip?.rankS as number,
      adminId,

      captain: saleMonkeynaut?.captain as number,
      major: saleMonkeynaut?.major as number,
      private: saleMonkeynaut?.private as number,
      sergeant: saleMonkeynaut?.sergeant as number,

      price: data.price,
      crypto: data.crypto,
      quantity: data.quantity,
      totalUnitsSold: data.totalUnitsSold,
      startDate,
      endDate,
    });

    return right({
      sale: createdSale,
    });
  }
}

export { CreateSaleBusinessLogic };
