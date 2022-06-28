import crypto from 'node:crypto';

import { Commons } from '@shared/types/commons';

type InitBountyHuntTokenPropsOmittedCommons = {
  playerId: string;
  token: string | null;
};

type InitBountyHuntTokenProps = InitBountyHuntTokenPropsOmittedCommons &
  Commons;

type InitBountyHuntTokenCommons = Partial<
  {
    id: string;
  } & Commons
>;

export interface IInitBountyHuntToken extends InitBountyHuntTokenProps {
  id: string;
}

export class InitBountyHuntToken implements IInitBountyHuntToken {
  private _id: string;

  private _props: InitBountyHuntTokenProps;

  get initBountyHuntToken(): IInitBountyHuntToken {
    return {
      id: this._id,
      playerId: this._props.playerId,
      token: this._props.token,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<InitBountyHuntTokenProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get token(): string | null {
    return this._props.token;
  }

  get playerId(): string {
    return this._props.playerId;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(
    props: InitBountyHuntTokenPropsOmittedCommons,
    commons?: InitBountyHuntTokenCommons,
  ) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
