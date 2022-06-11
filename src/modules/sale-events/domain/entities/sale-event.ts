import { SaleEventType } from '@prisma/client';
import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type SaleEventPropsOmittedCommons = {
  active: boolean;
  type: SaleEventType;
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
      active: this._props.active,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
      type: this._props.type,
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

  get active(): boolean {
    return this._props.active;
  }

  get type(): SaleEventType {
    return this._props.type;
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
