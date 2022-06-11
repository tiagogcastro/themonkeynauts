import { inject, injectable } from 'tsyringe';

import { ISaleEventsRepository } from '@modules/sale-events/domain/repositories/sale-events-repositories';
import { CreateSaleEventRequestDTO } from '@modules/sale-events/dtos/create-sale-event-request';

import { IDateProvider } from '@shared/domain/providers/date-provider';
import { AppError } from '@shared/errors/app-error';

import {
  MonkeynautSale,
  IMonkeynautSale,
} from '@modules/sale-events/domain/entities/monkeynaut-sale';
import {
  PackSale,
  IPackSale,
} from '@modules/sale-events/domain/entities/pack-sale';
import {
  ShipSale,
  IShipSale,
} from '@modules/sale-events/domain/entities/ship-sale';
import {
  SaleEvent,
  ISaleEvent,
} from '@modules/sale-events/domain/entities/sale-event';
import { SaleEventType } from '@modules/sale-events/domain/enums/sale-event-type';

type Response = {
  saleEvent: ISaleEvent;
  saleData: IPackSale | IShipSale | IMonkeynautSale;
};

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
    salePack,
    saleShip,
    saleMonkeynaut,
    type,
    endDate,
    startDate,
    ...data
  }: CreateSaleEventRequestDTO): Promise<Response> {
    const currentDate = new Date();

    if (endDate) {
      if (this.dateProvider.isBefore(endDate, currentDate)) {
        throw new AppError('End date must be after current date');
      }

      if (this.dateProvider.isBefore(startDate, endDate)) {
        throw new AppError('The start date must be less than the end time');
      }
    }

    if (this.dateProvider.isBefore(startDate, currentDate)) {
      throw new AppError('Start date must be after current date');
    }

    const salesPercentage: Record<SaleEventType, boolean> = {
      PACK:
        !!salePack &&
        Object.values(salePack).reduce(
          (accumulator, current) => accumulator + current,
          0,
        ) === 100,
      MONKEYNAUT:
        !!saleMonkeynaut &&
        Object.values(saleMonkeynaut).reduce(
          (accumulator, current) => accumulator + current,
          0,
        ) === 100,
      SHIP:
        !!saleShip &&
        Object.values(saleShip).reduce(
          (accumulator, current) => accumulator + current,
          0,
        ) === 100,
    };

    if (salesPercentage[type] === false) {
      throw new AppError('Sales percentage must be 100%');
    }

    const { saleEvent } = new SaleEvent({
      active: true,
      type,
    });

    await this.saleEventsRepository.createSaleEvent(saleEvent);

    const createSaleCommons = {
      endDate,
      startDate,
      saleEventId: saleEvent.id,
      ...data,
    };

    const saleData = {
      saleId: '',
      dataByType: {} as IPackSale | IShipSale | IMonkeynautSale,
    };

    switch (type) {
      case 'MONKEYNAUT':
        if (saleMonkeynaut) {
          const { monkeynautSale } = new MonkeynautSale({
            ...saleMonkeynaut,
            ...createSaleCommons,
          });

          saleData.saleId = monkeynautSale.id;
          saleData.dataByType = monkeynautSale;

          await this.saleEventsRepository.createMonkeynautSale(monkeynautSale);
        }

        break;
      case 'SHIP':
        if (saleShip) {
          const { shipSale } = new ShipSale({
            ...saleShip,
            ...createSaleCommons,
          });

          saleData.saleId = shipSale.id;
          saleData.dataByType = shipSale;

          await this.saleEventsRepository.createShipSale(shipSale);
        }
        break;
      case 'PACK':
        if (salePack) {
          const { packSale } = new PackSale({
            ...salePack,
            ...createSaleCommons,
          });

          saleData.saleId = packSale.id;
          saleData.dataByType = packSale;

          await this.saleEventsRepository.createPackSale(packSale);
        }
        break;

      default:
        break;
    }

    return {
      saleEvent,
      saleData: saleData.dataByType,
    };
  }
}

export { CreateSaleEventBusinessLogic };
