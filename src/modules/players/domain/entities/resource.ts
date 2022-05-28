import crypto from 'node:crypto';

export class Resource {
  id: string;

  playerId: string;

  spc: number;

  gold: number;

  iron: number;

  copper: number;

  scrap: number;

  science: number;

  createdAt: Date;

  updatedAt: Date;

  constructor(props: Omit<Resource, 'id'>, id?: string) {
    this.id = id ?? crypto.randomUUID();

    Object.assign(this, props);
  }
}
