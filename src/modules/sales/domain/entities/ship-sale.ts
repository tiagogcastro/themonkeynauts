import { Commons } from '@shared/types/commons';
import { Maybe } from '@shared/types/maybe';
import crypto from 'node:crypto';
import { SaleCrypto } from '../enums/sale-crypto';

export type ShipSalePropsOmittedCommons = {
  rank_b: number;
  rank_a: number;
  rank_s: number;
  crypto: SaleCrypto;
  price: number;
  startDate: Date;
  endDate: Maybe<Date>;
  quantity: number;
  totalUnitsSold: number;
  currentQuantityAvailable: number;
  active: boolean;
};

type ShipSaleProps = ShipSalePropsOmittedCommons & Commons;

export interface IShipSale extends ShipSaleProps {
  id: string;
}

type ShipSaleCommons = Partial<
  {
    id: string;
  } & Commons
>;

export class ShipSale implements IShipSale {
  private _id: string;

  private _props: ShipSaleProps;

  get shipSale(): IShipSale {
    return {
      id: this._id,
      rank_b: this._props.rank_b,
      rank_a: this._props.rank_a,
      rank_s: this._props.rank_s,
      crypto: this._props.crypto,
      price: this._props.price,
      startDate: this._props.startDate,
      endDate: this._props.endDate,
      quantity: this._props.quantity,
      totalUnitsSold: this._props.totalUnitsSold,
      active: this._props.active,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
      currentQuantityAvailable: this._props.currentQuantityAvailable,
    };
  }

  set assign(props: Partial<ShipSaleProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get rank_b(): number {
    return this._props.rank_b;
  }

  get rank_a(): number {
    return this._props.rank_a;
  }

  get rank_s(): number {
    return this._props.rank_s;
  }

  get crypto(): SaleCrypto {
    return this._props.crypto;
  }

  get price(): number {
    return this._props.price;
  }

  get active(): boolean {
    return this._props.active;
  }

  get startDate(): Date {
    return this._props.startDate;
  }

  get endDate(): Maybe<Date> {
    return this._props.endDate;
  }

  get quantity(): number {
    return this._props.quantity;
  }

  get totalUnitsSold(): number {
    return this._props.totalUnitsSold;
  }

  get currentQuantityAvailable(): number {
    return this._props.currentQuantityAvailable;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(props: ShipSalePropsOmittedCommons, commons?: ShipSaleCommons) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
