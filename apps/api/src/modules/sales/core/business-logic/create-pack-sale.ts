import { inject, injectable } from 'tsyringe';

import { IPackSale, PackSale } from '@modules/sales/domain/entities/pack-sale';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { CreatePackSaleRequestDTO } from '@modules/sales/dtos/create-pack-sale-request';
import { AppError } from '@shared/errors/app-error';
import { Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';

@injectable()
class CreatePackSaleBusinessLogic {
  constructor(
    @inject('PackSalesRepository')
    private packSalesRepository: IPackSalesRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    crypto,
    price,
    type,
    quantity,
    startDate,
    totalUnitsSold,
    adminId,
    endDate,
  }: CreatePackSaleRequestDTO): Promise<IPackSale> {
    const { packSale } = new PackSale({
      type,
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

    const { log } = new Log({
      playerId: adminId,
      action: 'Pack sale created by admin',
      txHash: null,
    });

    await this.logsRepository.create(log);

    return packSale;
  }
}

export { CreatePackSaleBusinessLogic };
