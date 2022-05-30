import crypto from 'node:crypto';

import { Commons } from '@shared/types/commons';

type PlayerAuthPropsOmittedCommons = {
  playerId: string;
  isLogged: boolean;
  isValidToken: boolean;
  payload: string;
  expireIn: Date;
};

type PlayerAuthProps = PlayerAuthPropsOmittedCommons & Commons;

type PlayerAuthCommons = Partial<
  {
    id: string;
  } & Commons
>;

export interface IPlayerAuth extends PlayerAuthProps {
  id: string;
}

export class PlayerAuth implements IPlayerAuth {
  private _id: string;

  private _props: PlayerAuthProps;

  get playerAuth(): IPlayerAuth {
    return {
      id: this._id,
      playerId: this._props.playerId,
      isLogged: this._props.isLogged,
      isValidToken: this._props.isValidToken,
      payload: this._props.payload,
      expireIn: this._props.expireIn,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<PlayerAuthProps>) {
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

  get isLogged(): boolean {
    return this._props.isLogged;
  }

  get isValidToken(): boolean {
    return this._props.isValidToken;
  }

  get payload(): string {
    return this._props.payload;
  }

  get expireIn(): Date {
    return this._props.expireIn;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(
    props: PlayerAuthPropsOmittedCommons,
    commons?: PlayerAuthCommons,
  ) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
