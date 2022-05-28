import crypto from 'node:crypto';

export class PlayerToken {
  id: string;

  playerId: string;

  token: string;

  updatedAt: Date;

  createdAt: Date;

  constructor(props: Omit<PlayerToken, 'id'>, id?: string) {
    this.id = id ?? crypto.randomUUID();

    Object.assign(this, props);
  }
}
