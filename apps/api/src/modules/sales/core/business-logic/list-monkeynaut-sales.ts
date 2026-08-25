import { IMonkeynautSale } from '@modules/sales/domain/entities/monkeynaut-sale';
import { Either, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { IMonkeynautSalesRepository } from '../../domain/repositories/monkeynaut-sales-repositories';

export type SaleAction = 'actived' | 'withoutException' | 'notActived';

export type ListMonkeynautSalesRequestDTO = {
  sales?: SaleAction;
};

type ListMonkeynautSalesResponse = Either<Error, IMonkeynautSale[]>;
@injectable()
class ListMonkeynautSalesBusinesslogic {
  constructor(
    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,
  ) {}

  async execute(
    data?: ListMonkeynautSalesRequestDTO,
  ): Promise<ListMonkeynautSalesResponse> {
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

    return right(
      monkeynautSales.map(sale => {
        return {
          ...sale,
          saleType: 'Monkeynaut',
        };
      }),
    );
  }
}

export { ListMonkeynautSalesBusinesslogic };
