import { IPackSale } from '@modules/sales/domain/entities/pack-sale';
import { Either, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { IPackSalesRepository } from '../../domain/repositories/pack-sales-repositories';

export type SaleAction = 'actived' | 'withoutException' | 'notActived';

export type ListPackSalesRequestDTO = {
  sales?: SaleAction;
};

type ListPackSalesResponse = Either<Error, IPackSale[]>;

@injectable()
class ListPackSalesBusinesslogic {
  constructor(
    @inject('PackSalesRepository')
    private packSalesRepository: IPackSalesRepository,
  ) {}

  async execute(data: ListPackSalesRequestDTO): Promise<ListPackSalesResponse> {
    let packSales: IPackSale[] = [];

    switch (data?.sales) {
      case 'actived':
        packSales = await this.packSalesRepository.listManyPacks();
        break;
      case 'withoutException':
        packSales =
          await this.packSalesRepository.listManyPacksWithoutException();
        break;
      case 'notActived':
        packSales = await this.packSalesRepository.listManyPacksNotActived();
        break;
      default:
        break;
    }

    return right(
      packSales.map(sale => {
        return {
          ...sale,
          saleType: 'Pack',
        };
      }),
    );
  }
}

export { ListPackSalesBusinesslogic };
