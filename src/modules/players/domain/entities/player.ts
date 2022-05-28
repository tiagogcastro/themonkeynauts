import { Maybe } from '@shared/types/maybe';
import crypto from 'node:crypto';
import { PlayerRole } from '../enums/player-role';

export class Player {
  id: string;

  nickname: string;

  email: string;

  password: string;

  wallet: Maybe<string>;

  role: PlayerRole;

  hasAsteroid: boolean;

  canBountyHunt: boolean;

  enabled: boolean;

  createdAt: Date;

  updatedAt: Date;

  constructor(props: Omit<Player, 'id'>, id?: string) {
    this.id = id ?? crypto.randomUUID();

    Object.assign(this, props);
  }
}
