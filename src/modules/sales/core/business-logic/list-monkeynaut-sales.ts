import { IMonkeynautSale } from '@modules/sales/domain/entities/monkeynaut-sale';
import { inject, injectable } from 'tsyringe';
import { IMonkeynautSalesRepository } from '../../domain/repositories/monkeynaut-sales-repositories';

export type SaleAction = 'actived' | 'withoutException' | 'notActived';

type Request = {
  sales?: SaleAction;
};

@injectable()
class ListMonkeynautSalesBusinesslogic {
  constructor(
    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,
  ) {}

  async execute(data?: Request): Promise<IMonkeynautSale[]> {
    let monkeynautSales: IMonkeynautSale[] = [];

    switch (data?.sales) {
      case 'actived':
        monkeynautSales =
          await this.monkeynautSalesRepository.listManyMonkeynauts();
        break;
      case 'withoutException':
        monkeynautSales =
          await this.monkeynautSalesRepository.listManyMonkeynautsWithoutException();
        break;
      case 'notActived':
        monkeynautSales =
          await this.monkeynautSalesRepository.listManyMonkeynautsNotActived();
        break;
      default:
        break;
    }

    return monkeynautSales.map(sale => {
      return {
        ...sale,
        saleType: 'Monkeynaut',
      };
    });
  }
}

export { ListMonkeynautSalesBusinesslogic };
