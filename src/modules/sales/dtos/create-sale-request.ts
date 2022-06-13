import { CreateMonkeynautSaleBusinessLogic } from '../core/business-logic/create-monkeynaut-sale';
import { CreatePackSaleBusinessLogic } from '../core/business-logic/create-pack-sale';
import { CreateShipSaleBusinessLogic } from '../core/business-logic/create-ship-sale';
import { SaleCrypto } from '../domain/enums/sale-crypto';
import { SaleType } from '../domain/enums/sale-type';

export type MonkeynautSaleUniqueProps = {
  private: number;
  sargeant: number;
  captain: number;
  major: number;
};

export type ShipSaleUniqueProps = {
  rank_b: number;
  rank_a: number;
  rank_s: number;
};

export type PackSaleUniqueProps = {
  basic: number;
  advanced: number;
  expert: number;
};

export type SaleCommons = {
  crypto: SaleCrypto;
  price: number;
  startDate: Date;
  endDate?: Date;
  quantity: number;
  totalUnitsSold: number;
};

type CreateSaleRequestDTO = SaleCommons & {
  type: SaleType;
  sale:
    | CreateMonkeynautSaleBusinessLogic
    | CreateShipSaleBusinessLogic
    | CreatePackSaleBusinessLogic;
  saleMonkeynaut?: MonkeynautSaleUniqueProps;
  saleShip?: ShipSaleUniqueProps;
  salePack?: PackSaleUniqueProps;
};

export { CreateSaleRequestDTO };
