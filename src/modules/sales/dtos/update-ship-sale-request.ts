import { SaleCommons, ShipSaleUniqueProps } from './create-sale-request';

type UpdateShipSaleRequestDTO = Partial<SaleCommons> & {
  saleShip?: Partial<ShipSaleUniqueProps> & {
    saleShipId: string;
  };
};

export { UpdateShipSaleRequestDTO };
