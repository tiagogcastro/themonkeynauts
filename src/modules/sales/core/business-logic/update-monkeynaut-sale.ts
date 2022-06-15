import { inject, injectable } from 'tsyringe';

import {
  IMonkeynautSale,
  MonkeynautSale,
} from '@modules/sales/domain/entities/monkeynaut-sale';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { UpdateMonkeynautSaleRequestDTO } from '@modules/sales/dtos/update-monkeynaut-sale-request';
import { AppError } from '@shared/errors/app-error';

@injectable()
class UpdateMonkeynautSaleBusinessLogic {
  constructor(
    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,
  ) {}

  async execute({
    endDate,
    crypto,
    price,
    quantity,

    saleMonkeynaut,

    currentQuantityAvailable,

    startDate,
    totalUnitsSold,
    active,
  }: UpdateMonkeynautSaleRequestDTO): Promise<IMonkeynautSale> {
    const foundMonkeynautSale = await this.monkeynautSalesRepository.findById(
      saleMonkeynaut?.saleMonkeynautId as string,
    );

    if (!foundMonkeynautSale) {
      throw new AppError('Monkeynaut Sale does not exist', 404);
    }

    const percentageValues = {
      captain: saleMonkeynaut?.captain ?? foundMonkeynautSale.captain,
      sargeant: saleMonkeynaut?.sargeant ?? foundMonkeynautSale.sargeant,
      major: saleMonkeynaut?.major ?? foundMonkeynautSale.major,
      private: saleMonkeynaut?.private ?? foundMonkeynautSale.private,
    };

    const percentages = [
      percentageValues.private,
      percentageValues.sargeant,
      percentageValues.captain,
      percentageValues.major,
    ];

    const totalPercentage = percentages.reduce(
      (previousPercentage, percentage) => previousPercentage + percentage,
      0,
    );

    if (totalPercentage !== 100) {
      throw new AppError('Monkeynaut sale percentage must be 100%');
    }

    const { monkeynautSale } = new MonkeynautSale(
      {
        crypto: crypto || foundMonkeynautSale.crypto,
        price: price ?? foundMonkeynautSale.price,
        quantity: quantity ?? foundMonkeynautSale.quantity,

        totalUnitsSold: totalUnitsSold ?? foundMonkeynautSale.totalUnitsSold,
        currentQuantityAvailable:
          currentQuantityAvailable ??
          foundMonkeynautSale.currentQuantityAvailable,

        ...percentageValues,

        startDate: startDate || foundMonkeynautSale.startDate,
        endDate: endDate || foundMonkeynautSale.endDate,

        active: active || foundMonkeynautSale.active,
      },
      {
        updatedAt: new Date(),
        createdAt: foundMonkeynautSale.createdAt,
        id: foundMonkeynautSale.id,
      },
    );

    await this.monkeynautSalesRepository.update(monkeynautSale);

    return monkeynautSale;
  }
}

export { UpdateMonkeynautSaleBusinessLogic };
