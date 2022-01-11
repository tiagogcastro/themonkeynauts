import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

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
}