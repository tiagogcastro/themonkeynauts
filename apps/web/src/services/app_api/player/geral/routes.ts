import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

import {
  AppLoginParams, 
  AppRegisterParams,
} from './params';

import {
  AppLoginResponse, 
  AppRegisterResponse,
  Data,
  GetPlayer,
} from './response';

export const geral = {
  register: (data: AppRegisterParams): Promise<AxiosResponse<Data<AppRegisterResponse>>> => {
    return baseApi.post('/players/create', data);
  },
  getPlayer: (): Promise<AxiosResponse<Data<GetPlayer>>> => {
    return baseApi.get('/players/show');
  },
  authenticate: {
    app_login: (data: AppLoginParams): Promise<AxiosResponse<Data<AppLoginResponse>>> => {
      return baseApi.post('/auth/app', data);
    },
  }
}