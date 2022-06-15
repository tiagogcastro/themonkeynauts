import { IMonkeynautSale } from '@modules/sales/domain/entities/monkeynaut-sale';
import { inject, injectable } from 'tsyringe';
import { IMonkeynautSalesRepository } from '../../domain/repositories/monkeynaut-sales-repositories';

type Request = {
  listWithoutException?: boolean;
};

@injectable()
class ListMonkeynautSalesBusinesslogic {
  constructor(
    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,
  ) {}

  async execute(data?: Request): Promise<IMonkeynautSale[]> {
    let monkeynautSales: IMonkeynautSale[] = [];

    if (data?.listWithoutException) {
      monkeynautSales =
        await this.monkeynautSalesRepository.listManyMonkeynautsWithoutException();
    } else {
      monkeynautSales =
        await this.monkeynautSalesRepository.listManyMonkeynauts();
    }

    return monkeynautSales.map(sale => {
      return {
        ...sale,
        type: 'Monkeynaut',
      };
    });
  }
}

export { ListMonkeynautSalesBusinesslogic };
