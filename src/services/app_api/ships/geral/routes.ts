import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

import {
  AddMonkeyToShipParams,
  DeleteMonkeynautFromShipParams
} from './params';

import {
  GetShip,
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
}