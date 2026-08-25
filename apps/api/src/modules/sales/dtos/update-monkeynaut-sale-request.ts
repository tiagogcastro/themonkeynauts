import {
  MonkeynautSaleUniqueProps,
  PackSaleUniqueProps,
  SaleCommons,
  ShipSaleUniqueProps,
} from './create-sale-request';

type UpdateMonkeynautSaleRequestDTO = Partial<SaleCommons> & {
  saleShip?: Partial<ShipSaleUniqueProps> & {
    saleShipId: string;
  };
  salePack?: Partial<PackSaleUniqueProps> & {
    salePackId: string;
  };
  saleMonkeynaut?: Partial<MonkeynautSaleUniqueProps> & {
    saleMonkeynautId: string;
  };
};

export { UpdateMonkeynautSaleRequestDTO };
