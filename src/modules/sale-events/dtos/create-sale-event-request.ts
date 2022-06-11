import { SaleEventCrypto } from '../domain/enums/sale-event-crypto';
import { SaleEventType } from '../domain/enums/sale-event-type';

type MonkeynautSaleUniqueProps = {
  private: number;
  sargeant: number;
  captain: number;
  major: number;
};

type ShipSaleUniqueProps = {
  rank_b: number;
  rank_a: number;
  rank_s: number;
};

type PackSaleUniqueProps = {
  basic: number;
  advanced: number;
  expert: number;
};

type CreateSaleEventRequestDTO = {
  type: SaleEventType;
  crypto: SaleEventCrypto;
  price: number;
  startDate: Date;
  endDate: Date;
  quantity: number;
  totalUnitsSold: number;

  saleMonkeynaut?: MonkeynautSaleUniqueProps;
  saleShip?: ShipSaleUniqueProps;
  salePack?: PackSaleUniqueProps;
};

export { CreateSaleEventRequestDTO };
