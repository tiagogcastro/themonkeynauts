import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

import {
  SaveWalletResponse,
} from './response';

import {
  SaveWalletParams,
} from './params';

export const geral = {
  saveWallet: (data: SaveWalletParams): Promise<AxiosResponse<SaveWalletResponse>> => {
    return baseApi.patch('/players/save-wallet', data);
  },
}