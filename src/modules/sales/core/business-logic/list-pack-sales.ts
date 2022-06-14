import { IPackSale } from '@modules/sales/domain/entities/pack-sale';
import { inject, injectable } from 'tsyringe';
import { IPackSalesRepository } from '../../domain/repositories/pack-sales-repositories';

@injectable()
class ListPackSalesBusinesslogic {
  constructor(
    @inject('PackSalesRepository')
    private packSalesRepository: IPackSalesRepository,
  ) {}

  async execute(): Promise<IPackSale[]> {
    const packSales = await this.packSalesRepository.listManyPacks();

    return packSales.map(sale => {
      return {
        ...sale,
        type: 'Pack',
      };
    });
  }
}

export { ListPackSalesBusinesslogic };
