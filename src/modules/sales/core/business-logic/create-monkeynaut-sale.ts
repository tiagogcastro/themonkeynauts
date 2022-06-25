import { inject, injectable } from 'tsyringe';

import {
  IMonkeynautSale,
  MonkeynautSale,
} from '@modules/sales/domain/entities/monkeynaut-sale';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { CreateMonkeynautSaleRequestDTO } from '@modules/sales/dtos/create-monkeynaut-sale-request';
import { AppError } from '@shared/errors/app-error';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { Log } from '@modules/logs/domain/entities/log';

@injectable()
class CreateMonkeynautSaleBusinessLogic {
  constructor(
    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    captain,
    endDate,
    crypto,
    major,
    adminId,
    price,
    quantity,
    private: _private,
    sergeant,
    startDate,
    totalUnitsSold,
  }: CreateMonkeynautSaleRequestDTO): Promise<IMonkeynautSale> {
    const percentages = [captain, sergeant, major, _private];

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
      sergeant,
      startDate,
      totalUnitsSold,
      currentQuantityAvailable: quantity,
      endDate,
      active: true,
    });

    await this.monkeynautSalesRepository.create(monkeynautSale);

    const { log } = new Log({
      playerId: adminId,
      action: 'Monkeynaut sale created by admin',
      txHash: null,
    });

    await this.logsRepository.create(log);

    return monkeynautSale;
  }
}

export { CreateMonkeynautSaleBusinessLogic };
