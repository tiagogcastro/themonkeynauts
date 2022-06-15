import { MonkeynautSaleUniqueProps, SaleCommons } from './create-sale-request';

type UpdateMonkeynautSaleRequestDTO = Partial<SaleCommons> & {
  saleMonkeynaut?: Partial<MonkeynautSaleUniqueProps> & {
    saleMonkeynautId: string;
  };
};

export { UpdateMonkeynautSaleRequestDTO };
