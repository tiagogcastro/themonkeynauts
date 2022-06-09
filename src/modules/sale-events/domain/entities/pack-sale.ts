import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type PackSalePropsOmittedCommons = {
  asic: number;
  advanced: number;
  expert: number;
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
      asic: this._props.asic,
      advanced: this._props.advanced,
      expert: this._props.expert,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    } as IPackSale;
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

  get asic(): number {
    return this._props.asic;
  }

  get advanced(): number {
    return this._props.advanced;
  }

  get expert(): number {
    return this._props.expert;
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
