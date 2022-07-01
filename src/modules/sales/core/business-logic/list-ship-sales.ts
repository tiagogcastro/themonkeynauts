import { IShipSale } from '@modules/sales/domain/entities/ship-sale';
import { Either, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { IShipSalesRepository } from '../../domain/repositories/ship-sales-repositories';

export type SaleAction = 'actived' | 'withoutException' | 'notActived';

export type ListShipSalesRequestDTO = {
  sales?: SaleAction;
};

type ListShipSalesResponse = Either<Error, IShipSale[]>;

@injectable()
class ListShipSalesBusinesslogic {
  constructor(
    @inject('ShipSalesRepository')
    private shipSalesRepository: IShipSalesRepository,
  ) {}

  async execute(
    data?: ListShipSalesRequestDTO,
  ): Promise<ListShipSalesResponse> {
    let shipSales: IShipSale[] = [];

    switch (data?.sales) {
      case 'actived':
        shipSales = await this.shipSalesRepository.listManyShips();
        break;
      case 'withoutException':
        shipSales =
          await this.shipSalesRepository.listManyShipsWithoutException();
        break;
      case 'notActived':
        shipSales = await this.shipSalesRepository.listManyShipsNotActived();
        break;
      default:
        break;
    }
    return right(
      shipSales.map(sale => {
        return {
          ...sale,
          saleType: 'Ship',
        };
      }),
    );
  }
}

export { ListShipSalesBusinesslogic };
