import axios from 'axios';

import {
  player,
  ships,
  monkeynauts,
  wallet,

  PlayerType,
  ShipType,
  MonkeynautType,
  WalletType
} from './app_api';

export const monkeynautsApiToken = '@monkeynauts:token@';

export const baseApi = axios.create({
  baseURL: 'https://the-monkeynauts.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  }
});

export const api = {
  player,
  ships,
  monkeynauts,
  wallet,
};

export {
  PlayerType,
  ShipType,
  MonkeynautType,
  WalletType
};