import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

import {
  CreateWalletResponse,
} from './response';

import {
  CreateWalletParams,
} from './params';

export const geral = {
  createWallet: (data: CreateWalletParams): Promise<AxiosResponse<CreateWalletResponse>> => {
    return baseApi.post('/wallets', data.body);
  },
}