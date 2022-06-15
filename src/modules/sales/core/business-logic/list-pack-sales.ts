import { IPackSale } from '@modules/sales/domain/entities/pack-sale';
import { inject, injectable } from 'tsyringe';
import { IPackSalesRepository } from '../../domain/repositories/pack-sales-repositories';

type Request = {
  listWithoutException?: boolean;
};

@injectable()
class ListPackSalesBusinesslogic {
  constructor(
    @inject('PackSalesRepository')
    private packSalesRepository: IPackSalesRepository,
  ) {}

  async execute(data: Request): Promise<IPackSale[]> {
    let packSales: IPackSale[] = [];

    if (data?.listWithoutException) {
      packSales =
        await this.packSalesRepository.listManyPacksWithoutException();
    } else {
      packSales = await this.packSalesRepository.listManyPacks();
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
