import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';
import { SaleEventCrypto } from '../enums/sale-event-crypto';

type MonkeynautSalePropsOmittedCommons = {
  private: number;
  sargeant: number;
  captain: number;
  major: number;
  crypto: SaleEventCrypto;
  price: number;
  startDate: Date;
  endDate: Date;
  quantity: number;
  totalUnitsSold: number;
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
      sargeant: this._props.sargeant,
      captain: this._props.captain,
      major: this._props.major,
      crypto: this._props.crypto,
      price: this._props.price,
      startDate: this._props.startDate,
      endDate: this._props.endDate,
      quantity: this._props.quantity,
      totalUnitsSold: this._props.totalUnitsSold,
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

  get sargeant(): number {
    return this._props.sargeant;
  }

  get captain(): number {
    return this._props.captain;
  }

  get major(): number {
    return this._props.major;
  }

  get crypto(): SaleEventCrypto {
    return this._props.crypto;
  }

  get price(): number {
    return this._props.price;
  }

  get startDate(): Date {
    return this._props.startDate;
  }

  get endDate(): Date {
    return this._props.endDate;
  }

  get quantity(): number {
    return this._props.quantity;
  }

  get totalUnitsSold(): number {
    return this._props.totalUnitsSold;
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
