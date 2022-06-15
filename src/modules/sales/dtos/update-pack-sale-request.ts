import { SaleCommons, PackSaleUniqueProps } from './create-sale-request';

type UpdatePackSaleRequestDTO = Partial<SaleCommons> & {
  salePack?: Partial<PackSaleUniqueProps> & {
    salePackId: string;
  };
};

export { UpdatePackSaleRequestDTO };
