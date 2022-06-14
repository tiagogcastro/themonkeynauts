import { IShipSale } from '@modules/sales/domain/entities/ship-sale';
import { inject, injectable } from 'tsyringe';
import { IShipSalesRepository } from '../../domain/repositories/ship-sales-repositories';

@injectable()
class ListShipSalesBusinesslogic {
  constructor(
    @inject('ShipSalesRepository')
    private shipSalesRepository: IShipSalesRepository,
  ) {}

  async execute(): Promise<IShipSale[]> {
    const shipSales = await this.shipSalesRepository.listManyShips();

    return shipSales.map(sale => {
      return {
        ...sale,
        type: 'Ship',
      };
    });
  }
}

export { ListShipSalesBusinesslogic };
