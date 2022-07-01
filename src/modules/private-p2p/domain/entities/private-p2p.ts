import { Commons } from '@shared/types/commons';
import { Maybe } from '@shared/core/logic/maybe';
import crypto from 'node:crypto';

type PrivateSaleP2PPropsOmittedCommons = {
  email: string;
  txHash: string;
  wallet: string;
  bnbAmount: number;
};

type PrivateSaleP2PProps = PrivateSaleP2PPropsOmittedCommons & Commons;

export interface IPrivateSaleP2P extends PrivateSaleP2PProps {
  id: string;
}

type PrivateSaleP2PCommons = Partial<
  {
    id: string;
  } & Commons
>;

export class PrivateSaleP2P implements IPrivateSaleP2P {
  private _id: string;

  private _props: PrivateSaleP2PProps;

  get privateSaleP2P(): IPrivateSaleP2P {
    return {
      id: this._id,
      email: this._props.email,
      wallet: this._props.wallet,
      txHash: this._props.txHash,
      bnbAmount: this._props.bnbAmount,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<PrivateSaleP2PProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._props.email;
  }

  get wallet(): string {
    return this._props.wallet;
  }

  get bnbAmount(): number {
    return this._props.bnbAmount;
  }

  get txHash(): string {
    return this._props.txHash;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(
    props: PrivateSaleP2PPropsOmittedCommons,
    commons?: PrivateSaleP2PCommons,
  ) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
