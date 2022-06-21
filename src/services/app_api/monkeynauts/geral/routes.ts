import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

import {
  GetMonkeynauts,
} from './response';

export const geral = {
  // create: (data: CreateShipsParams): Promise<AxiosResponse<CreateShipsResponse>> => {
  //   return baseApi.post('/ships', data);
  // },
  getMonkeynauts: (data?: any): Promise<AxiosResponse<GetMonkeynauts>> => {
    return baseApi.get('/monkeynauts/list', ...data);
  },
}