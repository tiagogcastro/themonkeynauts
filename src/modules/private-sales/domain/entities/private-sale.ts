import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type PrivateSalePropsOmittedCommons = {
  playerId: string;
  wallet: string;
  txHash: string;
  bnbAmount: number;
};

type PrivateSaleProps = PrivateSalePropsOmittedCommons & Commons;

export interface IPrivateSale extends PrivateSaleProps {
  id: string;
}

type PrivateSaleCommons = Partial<
  {
    id: string;
  } & Commons
>;

export class PrivateSale implements IPrivateSale {
  private _id: string;

  private _props: PrivateSaleProps;

  get privateSale(): IPrivateSale {
    return {
      id: this._id,
      playerId: this._props.playerId,
      wallet: this._props.wallet,
      txHash: this._props.txHash,
      bnbAmount: this._props.bnbAmount,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    } as IPrivateSale;
  }

  set assign(props: Partial<PrivateSaleProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get playerId(): string {
    return this._props.playerId;
  }

  get wallet(): string {
    return this._props.wallet;
  }

  get txHash(): string {
    return this._props.txHash;
  }

  get bnbAmount(): number {
    return this._props.bnbAmount;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(
    props: PrivateSalePropsOmittedCommons,
    commons?: PrivateSaleCommons,
  ) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
