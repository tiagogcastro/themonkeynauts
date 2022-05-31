import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type TransactionPropsOmittedCommons = {
  wallet: string;
  txHash: string;
};

type TransactionProps = TransactionPropsOmittedCommons & Commons;

export interface ITransaction extends TransactionProps {
  id: string;
}

type TransactionCommons = Partial<
  {
    id: string;
  } & Commons
>;

export class Transaction implements ITransaction {
  private _id: string;

  private _props: TransactionProps;

  get transaction(): ITransaction {
    return {
      id: this._id,
      wallet: this._props.wallet,
      txHash: this._props.txHash,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    } as ITransaction;
  }

  set assign(props: Partial<TransactionProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get wallet(): string {
    return this._props.wallet;
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
    props: TransactionPropsOmittedCommons,
    commons?: TransactionCommons,
  ) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
