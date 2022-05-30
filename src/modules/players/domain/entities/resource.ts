import crypto from 'node:crypto';
import { Commons } from '@shared/types/commons';

type ResourcePropsOmittedCommons = {
  playerId: string;
  spc: number;
  gold: number;
  iron: number;
  copper: number;
  scrap: number;
  science: number;
};

type ResourceProps = ResourcePropsOmittedCommons & Commons;

type ResourceCommons = Partial<
  {
    id: string;
  } & Commons
>;

export interface IResource extends ResourceProps {
  id: string;
}

export class Resource implements IResource {
  private _id: string;

  private _props: ResourceProps;

  get resource(): IResource {
    return {
      id: this._id,
      playerId: this._props.playerId,
      spc: this._props.spc,
      gold: this._props.gold,
      iron: this._props.iron,
      copper: this._props.copper,
      scrap: this._props.scrap,
      science: this._props.science,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<ResourceProps>) {
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

  get spc(): number {
    return this._props.spc;
  }

  get gold(): number {
    return this._props.gold;
  }

  get iron(): number {
    return this._props.iron;
  }

  get copper(): number {
    return this._props.copper;
  }

  get scrap(): number {
    return this._props.scrap;
  }

  get science(): number {
    return this._props.science;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(props: ResourcePropsOmittedCommons, commons?: ResourceCommons) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
