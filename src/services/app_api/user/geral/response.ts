import { Wallet } from '../../wallet/types'

export type User = {
  id: string;
  email: string;
  nickname: string;
  roles: string[];
  id_short: string | undefined;

  wallet: Wallet
}

export type GetUser = {
  user: User;
}

export type AppRegisterResponse = {
  player: User;
  token: string;
}

export type AppLoginResponse = {
  token: string;
}