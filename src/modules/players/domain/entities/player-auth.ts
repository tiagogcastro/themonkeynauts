import crypto from 'node:crypto';

type Data = {
  playerId: string;
  isLogged: boolean;
  isValidToken: boolean;
  payload?: string;
  expireIn: Date;
}

export class PlayerAuth {
  id: string;

  playerId: string;

  isLogged: boolean;

  isValidToken: boolean;

  payload: string;

  createdAt: Date;
  updatedAt: Date;
  
  expireIn: Date;

  constructor(
    data: Data, 
    ommitedItens?: {
      id?: string,
      createdAt?: Date;
      updatedAt?: Date;
    }
  ) {
    this.id = ommitedItens?.id ?? crypto.randomUUID();
    this.createdAt = ommitedItens?.createdAt ?? new Date();
    this.updatedAt = ommitedItens?.updatedAt ?? new Date();

    Object.assign(this, data);
  }
}
