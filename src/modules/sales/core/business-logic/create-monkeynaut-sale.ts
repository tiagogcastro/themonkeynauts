import { inject, injectable } from 'tsyringe';

import {
  IMonkeynautSale,
  MonkeynautSale,
} from '@modules/sales/domain/entities/monkeynaut-sale';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { CreateMonkeynautSaleRequestDTO } from '@modules/sales/dtos/create-monkeynaut-sale-request';
import { AppError } from '@shared/errors/app-error';

@injectable()
class CreateMonkeynautSaleBusinessLogic {
  constructor(
    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,
  ) {}

  async execute({
    captain,
    endDate,
    crypto,
    major,
    price,
    quantity,
    private: _private,
    sargeant,
    startDate,
    totalUnitsSold,
  }: CreateMonkeynautSaleRequestDTO): Promise<IMonkeynautSale> {
    const percentages = [captain, sargeant, major, _private];

    const totalPercentage = percentages.reduce(
      (previousPercentage, percentage) => previousPercentage + percentage,
      0,
    );

    if (totalPercentage !== 100) {
      throw new AppError('Monkeynaut sale percentage must be 100%');
    }

    const { monkeynautSale } = new MonkeynautSale({
      captain,
      crypto,
      major,
      price,
      private: _private,
      quantity,
      sargeant,
      startDate,
      totalUnitsSold,
      currentQuantityAvailable: quantity,
      endDate,
      active: true,
    });

    await this.monkeynautSalesRepository.create(monkeynautSale);

    return monkeynautSale;
  }
}

export { CreateMonkeynautSaleBusinessLogic };
