import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

import {
  AddMonkeyToShipParams,
  DeleteMonkeynautFromShipParams,
  GetUniqueShipParams
} from './params';

import {
  GetShip,
  GetUniqueShip,
} from './response';

export const geral = {
  // create: (data: CreateShipsParams): Promise<AxiosResponse<CreateShipsResponse>> => {
  //   return baseApi.post('/ships', data);
  // },
  getShips: (): Promise<AxiosResponse<GetShip>> => {
    return baseApi.get('/ships');
  },
  addMonkeynautToShip: (data: AddMonkeyToShipParams): Promise<AxiosResponse<{}>> => {
    return baseApi.post(`/ships/${data.params.ship_id}/monkeynauts`, data.body);
  },
  deleteMonkeynautFromShip: (data: DeleteMonkeynautFromShipParams): Promise<AxiosResponse<{}>> => {
    return baseApi.delete(`/ships/${data.params.ship_id}/monkeynauts/${data.params.monkeynaut_id}`);
  },
  getUnique: (data: GetUniqueShipParams): Promise<AxiosResponse<GetUniqueShip>> => {
    return baseApi.get(`/ships/${data.path.ship_id}`);
  }
}