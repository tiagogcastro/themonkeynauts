import axios from 'axios';

import {
  user,
  ships,
  monkeynauts,

  UserType,
  ShipType,
  MonkeynautType,
} from './app_api';

export const monkeynautsApiToken = '@monkeynauts:token@';

export const baseApi = axios.create({
  baseURL: 'https://api.themonkeynauts.com/api/',
});

export const api = {
  user,
  ships,
  monkeynauts
};

export {
  UserType,
  ShipType,
  MonkeynautType
};