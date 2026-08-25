import { PackSaleUniqueProps, SaleCommons } from './create-sale-request';

type CreatePackSaleRequestDTO = SaleCommons &
  PackSaleUniqueProps & {
    adminId: string;
  };

export { CreatePackSaleRequestDTO };
