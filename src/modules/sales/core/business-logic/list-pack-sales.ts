import { IPackSale } from '@modules/sales/domain/entities/pack-sale';
import { inject, injectable } from 'tsyringe';
import { IPackSalesRepository } from '../../domain/repositories/pack-sales-repositories';

export type SaleAction = 'actived' | 'withoutException' | 'notActived';

type Request = {
  sales?: SaleAction;
};

@injectable()
class ListPackSalesBusinesslogic {
  constructor(
    @inject('PackSalesRepository')
    private packSalesRepository: IPackSalesRepository,
  ) {}

  async execute(data: Request): Promise<IPackSale[]> {
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

    return packSales.map(sale => {
      return {
        ...sale,
        type: 'Pack',
      };
    });
  }
}

export { ListPackSalesBusinesslogic };
