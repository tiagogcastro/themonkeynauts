import { ShipSaleUniqueProps, SaleCommons } from './create-sale-request';

type CreateShipSaleRequestDTO = SaleCommons &
  ShipSaleUniqueProps & {
    adminId: string;
  };

export { CreateShipSaleRequestDTO };
