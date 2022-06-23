import { Commons } from '@shared/types/commons';
import { Maybe } from '@shared/core/logic/maybe';
import crypto from 'node:crypto';
import { PackType } from '../enums/pack-type';
import { SaleCrypto } from '../enums/sale-crypto';

export type PackSalePropsOmittedCommons = {
  type: PackType;
  crypto: SaleCrypto;
  price: number;
  startDate: Date;
  endDate: Maybe<Date>;
  quantity: number;
  totalUnitsSold: number;
  currentQuantityAvailable: number;
  active: boolean;
};

type PackSaleProps = PackSalePropsOmittedCommons & Commons;

export interface IPackSale extends PackSaleProps {
  id: string;
}

type PackSaleCommons = Partial<
  {
    id: string;
  } & Commons
>;

export class PackSale implements IPackSale {
  private _id: string;

  private _props: PackSaleProps;

  get packSale(): IPackSale {
    return {
      id: this._id,
      type: this._props.type,
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

  set assign(props: Partial<PackSaleProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get type(): PackType {
    return this._props.type;
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

  constructor(props: PackSalePropsOmittedCommons, commons?: PackSaleCommons) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
