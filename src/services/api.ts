import axios from 'axios';

import {
  user,
  ships,
  monkeynauts,
  wallet,

  UserType,
  ShipType,
  MonkeynautType,
  WalletType
} from './app_api';

export const monkeynautsApiToken = '@monkeynauts:token@';

export const baseApi = axios.create({
  baseURL: 'https://api.themonkeynauts.com/api/',
  headers: {
    'Content-type': 'application/json',
  }
});

export const api = {
  user,
  ships,
  monkeynauts,
  wallet,
};

export {
  UserType,
  ShipType,
  MonkeynautType,
  WalletType
};