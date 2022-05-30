import crypto from 'node:crypto';
import { Commons } from '@shared/types/commons';
import { Maybe } from '@shared/types/maybe';
import { PlayerRole } from '../enums/player-role';

type PlayerPropsOmittedCommons = {
  nickname: string;
  email: string;
  password: string;
  wallet: Maybe<string>;
  role: PlayerRole;
  hasAsteroid: boolean;
  canBountyHunt: boolean;
  enabled: boolean;
};

type PlayerProps = PlayerPropsOmittedCommons & Commons;

type PlayerCommons = Partial<
  {
    id: string;
  } & Commons
>;

export interface IPlayer extends PlayerProps {
  id: string;
}

export class Player implements IPlayer {
  private _id: string;

  private _props: PlayerProps;

  get player(): IPlayer {
    return {
      id: this._id,
      email: this._props.email,
      nickname: this._props.nickname,
      password: this._props.password,
      wallet: this._props.wallet,
      role: this._props.role,
      hasAsteroid: this._props.hasAsteroid,
      canBountyHunt: this._props.canBountyHunt,
      enabled: this._props.enabled,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<PlayerProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get nickname(): string {
    return this._props.nickname;
  }

  get email(): string {
    return this._props.email;
  }

  get password(): string {
    return this._props.password;
  }

  get wallet(): Maybe<string> {
    return this._props.wallet;
  }

  get role(): PlayerRole {
    return this._props.role;
  }

  get hasAsteroid(): boolean {
    return this._props.hasAsteroid;
  }

  get canBountyHunt(): boolean {
    return this._props.canBountyHunt;
  }

  get enabled(): boolean {
    return this._props.enabled;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(props: PlayerPropsOmittedCommons, commons?: PlayerCommons) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
