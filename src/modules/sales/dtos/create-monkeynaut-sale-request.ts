import { MonkeynautSaleUniqueProps, SaleCommons } from './create-sale-request';

type CreateMonkeynautSaleRequestDTO = SaleCommons &
  MonkeynautSaleUniqueProps & {
    adminId: string;
  };

export { CreateMonkeynautSaleRequestDTO };
