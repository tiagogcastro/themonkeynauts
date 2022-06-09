import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type MonkeynautSalePropsOmittedCommons = {
  private: number;
  sargeant: number;
  captain: number;
  major: number;
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
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    } as IMonkeynautSale;
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
