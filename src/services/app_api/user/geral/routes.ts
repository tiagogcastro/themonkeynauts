import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

import {
  AppLoginParams, 
  AppRegisterParams,
} from './params';

import {
  AppLoginResponse, 
  AppRegisterResponse,
  GetUser,
} from './response';

export const geral = {
  register: (data: AppRegisterParams): Promise<AxiosResponse<AppRegisterResponse>> => {
    return baseApi.post('/players', data);
  },
  getUser: (): Promise<AxiosResponse<GetUser | null>> => {
    return baseApi.get('/authentication');
  },
  authenticate: {
    app_login: (data: AppLoginParams): Promise<AxiosResponse<AppLoginResponse>> => {
      return baseApi.post('/authentication', data);
    },
  }
}