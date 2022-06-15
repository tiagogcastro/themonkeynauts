import { Commons } from '@shared/types/commons';
import { Maybe } from '@shared/types/maybe';
import crypto from 'node:crypto';
import { SaleCrypto } from '../enums/sale-crypto';

export type MonkeynautSalePropsOmittedCommons = {
  private: number;
  sergeant: number;
  captain: number;
  major: number;
  crypto: SaleCrypto;
  price: number;
  startDate: Date;
  endDate: Maybe<Date>;
  quantity: number;
  totalUnitsSold: number;
  currentQuantityAvailable: number;
  active: boolean;
};

type MonkeynautSaleProps = MonkeynautSalePropsOmittedCommons & Commons;

export interface IMonkeynautSale extends MonkeynautSaleProps {
  id: string;
}

type MonkeynautSaleCommons = Partial<
  {
    id: string;
  } & Commons
>;

export class MonkeynautSale implements IMonkeynautSale {
  private _id: string;

  private _props: MonkeynautSaleProps;

  get monkeynautSale(): IMonkeynautSale {
    return {
      id: this._id,
      private: this._props.private,
      sergeant: this._props.sergeant,
      captain: this._props.captain,
      major: this._props.major,
      crypto: this._props.crypto,
      price: this._props.price,
      startDate: this._props.startDate,
      endDate: this._props.endDate,
      quantity: this._props.quantity,
      totalUnitsSold: this._props.totalUnitsSold,
      currentQuantityAvailable: this._props.currentQuantityAvailable,
      active: this._props.active,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<MonkeynautSaleProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get private(): number {
    return this._props.private;
  }

  get sergeant(): number {
    return this._props.sergeant;
  }

  get captain(): number {
    return this._props.captain;
  }

  get major(): number {
    return this._props.major;
  }

  get crypto(): SaleCrypto {
    return this._props.crypto;
  }

  get price(): number {
    return this._props.price;
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

  get currentQuantityAvailable(): number {
    return this._props.currentQuantityAvailable;
  }

  get totalUnitsSold(): number {
    return this._props.totalUnitsSold;
  }

  get active(): boolean {
    return this._props.active;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(
    props: MonkeynautSalePropsOmittedCommons,
    commons?: MonkeynautSaleCommons,
  ) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
