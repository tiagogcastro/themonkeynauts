import { Commons } from '@shared/types/commons';
import crypto from 'node:crypto';

type PlayerTokenPropsOmittedCommons = {
  playerId: string;
  token: string;
};

type PlayerTokenProps = PlayerTokenPropsOmittedCommons & Commons;

type PlayerTokenCommons = Partial<
  {
    id: string;
  } & Commons
>;

export interface IPlayerToken extends PlayerTokenProps {
  id: string;
}

export class PlayerToken implements IPlayerToken {
  private _id: string;

  private _props: PlayerTokenProps;

  get playerToken(): IPlayerToken {
    return {
      id: this._id,
      playerId: this._props.playerId,
      token: this._props.token,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  get props(): PlayerTokenPropsOmittedCommons {
    return {
      playerId: this._props.playerId,
      token: this._props.token,
    };
  }

  set assign(props: Partial<PlayerTokenProps>) {
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

  get token(): string {
    return this._props.token;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(
    props: PlayerTokenPropsOmittedCommons,
    commons?: PlayerTokenCommons,
  ) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
