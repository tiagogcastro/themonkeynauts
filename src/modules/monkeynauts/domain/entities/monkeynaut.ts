import { Commons } from '@shared/types/commons';
import { Maybe } from '@shared/core/logic/maybe';
import crypto from 'node:crypto';

type MonkeynautPropsOmittedCommons = {
  ownerId: Maybe<string>;
  playerId: Maybe<string>;
  name: string;
  class: string;
  rank: string;
  bonusValue: number;
  bonusDescription: string;
  maxEnergy: number;
  energy: number;
  avatar: Maybe<string>;
  basePower: number;
  baseSpeed: number;
  baseResistence: number;
  baseHealth: number;
  power: number;
  speed: number;
  resistence: number;
  health: number;
  breedCount: number;
};

type MonkeynautProps = MonkeynautPropsOmittedCommons & Commons;

type MonkeynautCommons = Partial<
  {
    id: string;
  } & Commons
>;

export interface IMonkeynaut extends MonkeynautProps {
  id: string;
}

export class Monkeynaut implements IMonkeynaut {
  private _id: string;

  private _props: MonkeynautProps;

  get monkeynaut(): IMonkeynaut {
    return {
      id: this._id,
      ownerId: this._props.ownerId,
      playerId: this._props.playerId,
      name: this._props.name,
      class: this._props.class,
      rank: this._props.rank,
      bonusValue: this._props.bonusValue,
      bonusDescription: this._props.bonusDescription,
      maxEnergy: this._props.maxEnergy,
      energy: this._props.energy,
      avatar: this._props.avatar,
      basePower: this._props.basePower,
      baseSpeed: this._props.baseSpeed,
      baseResistence: this._props.baseResistence,
      baseHealth: this._props.baseHealth,
      power: this._props.power,
      speed: this._props.speed,
      resistence: this._props.resistence,
      health: this._props.health,
      breedCount: this._props.breedCount,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
    };
  }

  set assign(props: Partial<MonkeynautProps>) {
    this._props = {
      ...this._props,
      ...props,
    };
  }

  get id(): string {
    return this._id;
  }

  get ownerId(): Maybe<string> {
    return this._props.ownerId;
  }

  get playerId(): Maybe<string> {
    return this._props.playerId;
  }

  get name(): string {
    return this._props.name;
  }

  get class(): string {
    return this._props.class;
  }

  get rank(): string {
    return this._props.rank;
  }

  get bonusValue(): number {
    return this._props.bonusValue;
  }

  get bonusDescription(): string {
    return this._props.bonusDescription;
  }

  get maxEnergy(): number {
    return this._props.maxEnergy;
  }

  get energy(): number {
    return this._props.energy;
  }

  get avatar(): Maybe<string> {
    return this._props.avatar;
  }

  get basePower(): number {
    return this._props.basePower;
  }

  get baseSpeed(): number {
    return this._props.baseSpeed;
  }

  get baseResistence(): number {
    return this._props.baseResistence;
  }

  get baseHealth(): number {
    return this._props.baseHealth;
  }

  get power(): number {
    return this._props.power;
  }

  get speed(): number {
    return this._props.speed;
  }

  get resistence(): number {
    return this._props.resistence;
  }

  get health(): number {
    return this._props.health;
  }

  get breedCount(): number {
    return this._props.breedCount;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  constructor(
    props: MonkeynautPropsOmittedCommons,
    commons?: MonkeynautCommons,
  ) {
    this._id = commons?.id || crypto.randomUUID();

    this._props = {
      ...props,
      createdAt: commons?.createdAt || new Date(),
      updatedAt: commons?.updatedAt || new Date(),
    };
  }
}
