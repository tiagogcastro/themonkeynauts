export type Player = {
  id: string;
  email: string;
  nickname: string;
  role: string;
  id_short: string | undefined;

  isBanned: boolean;
  isEnabled: boolean;
  activeShipId: string;

  hasAsteroid: string;
  canBountyHunt: boolean;

  wallet: string;
}

export type Resource = {
  id: string;
  playerId: string;
  spc: number;
  gold: number;
  iron: number;
  copper: number;
  scrap: number;
  science: number;
}

export type GetPlayer = {
  player: Player;
  resource: Resource;
}

export type AppRegisterResponse = {
  player: Player;
  token: {
    payload: string
  };
}

export type AppLoginResponse = {
  token: {
    payload: string
  };
}