import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type CrewPropsOmittedCommons = {
  shipId: string;
  monkeynautId: string;
};

type CrewProps = CrewPropsOmittedCommons & Commons;

type CrewCommons = Partial<
  {
    id: string;
  } & Commons
>;

export interface ICrew extends CrewProps {
  id: string;
}

export class Crew implements ICrew {
  private _id: string;

  private _props: CrewProps;

  get crew(): ICrew {
    return {
      id: this._id,
      monkeynautId: this._props.monkeynautId,
      shipId: this._props.shipId,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<CrewProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get shipId(): string {
    return this._props.shipId;
  }

  get monkeynautId(): string {
    return this._props.monkeynautId;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(props: CrewPropsOmittedCommons, commons?: CrewCommons) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
