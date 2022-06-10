/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-case-declarations */
import { inject, injectable } from 'tsyringe';

import {
  ISaleEvent,
  SaleEvent,
} from '@modules/sale-events/domain/entities/sale-event';

import { ISaleEventsRepository } from '@modules/sale-events/domain/repositories/sale-events-repositories';
import { CreateSaleEventRequestDTO } from '@modules/sale-events/dtos/create-sale-event-request';
import { SaleEventType } from '@modules/sale-events/domain/enums/sale-event-type';

import { IDateProvider } from '@shared/domain/providers/date-provider';
import { AppError } from '@shared/errors/app-error';

import { MonkeynautSale } from '@modules/sale-events/domain/entities/monkeynaut-sale';
import { PackSale } from '@modules/sale-events/domain/entities/pack-sale';
import { ShipSale } from '@modules/sale-events/domain/entities/ship-sale';
import { PrismaSaleEventsRepository } from '@modules/sale-events/infra/database/prisma/repositories/prisma-sale-events-repositories';
import { DateFnsDateProvider } from '@shared/infra/providers/datefns-date-provider';

@injectable()
class CreateSaleEventBusinessLogic {
  protected saleEvent: SaleEvent;

  constructor(
    @inject('SaleEventsRepository')
    private saleEventsRepository: ISaleEventsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    sale,
    type,
    endDate,
    startDate,
  }: CreateSaleEventRequestDTO): Promise<ISaleEvent> {
    const currentDate = new Date();

    if (endDate) {
      if (this.dateProvider.isBefore(endDate, currentDate)) {
        throw new AppError('End date must be after current date');
      }
    }

    if (this.dateProvider.isBefore(startDate, currentDate)) {
      throw new AppError('Start date must be after current date');
    }

    const { saleEvent } = new SaleEvent({
      active: true,
    });

    // switch (type) {
    //   case 'MONKEYNAUT':
    //     const monkeynautSale = sale as MonkeynautSaleUniqueProps;

    //     if(monkeynautSale.)
    //     break;
    //   case 'SHIP':
    //     break;
    //   case 'PACK':
    //     break;

    //   default:
    //     break;
    // }

    return saleEvent;
  }
}
