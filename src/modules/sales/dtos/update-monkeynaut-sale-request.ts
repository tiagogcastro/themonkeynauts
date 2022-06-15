import {
  MonkeynautSaleUniqueProps,
  PackSaleUniqueProps,
  SaleCommons,
  ShipSaleUniqueProps,
} from './create-sale-request';

type UpdateMonkeynautSaleRequestDTO = Partial<SaleCommons> & {
  saleMonkeynaut?: Partial<MonkeynautSaleUniqueProps> & {
    saleMonkeynautId: string;
  };
  saleShip?: Partial<ShipSaleUniqueProps> & {
    saleShipId: string;
  };
  salePack?: Partial<PackSaleUniqueProps> & {
    salePackId: string;
  };
  active?: boolean;
  currentQuantityAvailable?: number;
};

export { UpdateMonkeynautSaleRequestDTO };
