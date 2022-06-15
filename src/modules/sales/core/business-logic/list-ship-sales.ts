import { IShipSale } from '@modules/sales/domain/entities/ship-sale';
import { inject, injectable } from 'tsyringe';
import { IShipSalesRepository } from '../../domain/repositories/ship-sales-repositories';

type Request = {
  listWithoutException?: boolean;
};

@injectable()
class ListShipSalesBusinesslogic {
  constructor(
    @inject('ShipSalesRepository')
    private shipSalesRepository: IShipSalesRepository,
  ) {}

  async execute(data?: Request): Promise<IShipSale[]> {
    let shipSales: IShipSale[] = [];

    if (data?.listWithoutException) {
      shipSales =
        await this.shipSalesRepository.listManyShipsWithoutException();
    } else {
      shipSales = await this.shipSalesRepository.listManyShips();
    }

    return shipSales.map(sale => {
      return {
        ...sale,
        type: 'Ship',
      };
    });
  }
}

export { ListShipSalesBusinesslogic };
