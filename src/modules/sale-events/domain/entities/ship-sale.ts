import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type ShipSalePropsOmittedCommons = {
  b: number;
  a: number;
  s: number;
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
      b: this._props.b,
      a: this._props.a,
      s: this._props.s,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    } as IShipSale;
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

  get b(): number {
    return this._props.b;
  }

  get a(): number {
    return this._props.a;
  }

  get s(): number {
    return this._props.s;
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
