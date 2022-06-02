import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

import {
  AppLoginParams, 
  AppRegisterParams,
} from './params';

import {
  AppLoginResponse, 
  AppRegisterResponse,
  GetPlayer,
} from './response';

export const geral = {
  register: (data: AppRegisterParams): Promise<AxiosResponse<AppRegisterResponse>> => {
    return baseApi.post('/players/create', data);
  },
  getPlayer: (): Promise<AxiosResponse<GetPlayer>> => {
    return baseApi.get('/players/show');
  },
  authenticate: {
    app_login: (data: AppLoginParams): Promise<AxiosResponse<AppLoginResponse>> => {
      return baseApi.post('/auth/app', data);
    },
  }
}