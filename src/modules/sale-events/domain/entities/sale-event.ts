import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type SaleEventPropsOmittedCommons = {
  crypto: string;
  price: number;
  startDate: Date;
  endDate: Date;
  quantity: number;
  totalUnitsSold: number;
  active: boolean;
};

type SaleEventProps = SaleEventPropsOmittedCommons & Commons;

export interface ISaleEvent extends SaleEventProps {
  id: string;
}

type SaleEventCommons = Partial<
  {
    id: string;
  } & Commons
>;

export class SaleEvent implements ISaleEvent {
  private _id: string;

  private _props: SaleEventProps;

  get saleEvent(): ISaleEvent {
    return {
      id: this._id,
      crypto: this._props.crypto,
      price: this._props.price,
      startDate: this._props.startDate,
      endDate: this._props.endDate,
      quantity: this._props.quantity,
      totalUnitsSold: this._props.totalUnitsSold,
      active: this._props.active,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    } as ISaleEvent;
  }

  set assign(props: Partial<SaleEventProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get crypto(): string {
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

  get active(): boolean {
    return this._props.active;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(props: SaleEventPropsOmittedCommons, commons?: SaleEventCommons) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
