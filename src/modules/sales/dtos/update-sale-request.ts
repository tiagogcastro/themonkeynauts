import { UpdateMonkeynautSaleBusinessLogic } from '../core/business-logic/update-monkeynaut-sale';
import { UpdatePackSaleBusinessLogic } from '../core/business-logic/update-pack-sale';
import { UpdateShipSaleBusinessLogic } from '../core/business-logic/update-ship-sale';
import { SaleType } from '../domain/enums/sale-type';
import {
  MonkeynautSaleUniqueProps,
  PackSaleUniqueProps,
  SaleCommons,
  ShipSaleUniqueProps,
} from './create-sale-request';

type UpdateSaleRequestDTO = SaleCommons & {
  type: SaleType;
  sale:
    | UpdateMonkeynautSaleBusinessLogic
    | UpdateShipSaleBusinessLogic
    | UpdatePackSaleBusinessLogic;
  saleMonkeynaut?: Partial<MonkeynautSaleUniqueProps> & {
    saleMonkeynautId: string;
  };
  saleShip?: Partial<ShipSaleUniqueProps> & {
    saleShipId: string;
  };
  salePack?: Partial<PackSaleUniqueProps> & {
    salePackId: string;
  };
};

export { UpdateSaleRequestDTO };
