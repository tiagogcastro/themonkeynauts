import { Wallet } from '../../wallet/types'

export type Player = {
  id: string;
  email: string;
  nickname: string;
  roles: string[];
  id_short: string | undefined;

  wallet: Wallet
}

export type GetPlayer = {
  player: Player;
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