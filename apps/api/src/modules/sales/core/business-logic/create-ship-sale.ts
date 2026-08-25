import { inject, injectable } from 'tsyringe';

import { IShipSale, ShipSale } from '@modules/sales/domain/entities/ship-sale';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { CreateShipSaleRequestDTO } from '@modules/sales/dtos/create-ship-sale-request';
import { AppError } from '@shared/errors/app-error';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { Log } from '@modules/logs/domain/entities/log';

@injectable()
class CreateShipSaleBusinessLogic {
  constructor(
    @inject('ShipSalesRepository')
    private shipSalesRepository: IShipSalesRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    crypto,
    price,
    rankA,
    rankS,
    rankB,
    adminId,
    quantity,
    startDate,
    totalUnitsSold,
    endDate,
  }: CreateShipSaleRequestDTO): Promise<IShipSale> {
    const percentages = [rankA, rankS, rankB];

    const totalPercentage = percentages.reduce(
      (previousPercentage, percentage) => previousPercentage + percentage,
      0,
    );

    if (totalPercentage !== 100) {
      throw new AppError('Monkeynaut sale percentage must be 100%');
    }

    const { shipSale } = new ShipSale({
      rankA,
      rankB,
      rankS,
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

    const { log } = new Log({
      playerId: adminId,
      action: 'Ship sale created by admin',
      txHash: null,
    });

    await this.logsRepository.create(log);

    return shipSale;
  }
}

export { CreateShipSaleBusinessLogic };
