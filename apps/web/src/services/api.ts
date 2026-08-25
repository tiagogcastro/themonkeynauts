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
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
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
