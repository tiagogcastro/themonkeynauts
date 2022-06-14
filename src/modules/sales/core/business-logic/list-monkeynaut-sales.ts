import { IMonkeynautSale } from '@modules/sales/domain/entities/monkeynaut-sale';
import { inject, injectable } from 'tsyringe';
import { IMonkeynautSalesRepository } from '../../domain/repositories/monkeynaut-sales-repositories';

@injectable()
class ListMonkeynautSalesBusinesslogic {
  constructor(
    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,
  ) {}

  async execute(): Promise<IMonkeynautSale[]> {
    const monkeynautSales =
      await this.monkeynautSalesRepository.listManyMonkeynauts();

    return monkeynautSales.map(sale => {
      return {
        ...sale,
        type: 'Monkeynaut',
      };
    });
  }
}

export { ListMonkeynautSalesBusinesslogic };
