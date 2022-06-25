import { Maybe } from '@shared/core/logic/maybe';

export type CreatePrivateSaleRequestDTO = {
  bnbAmount: number;
  playerId: string;
  txHash: string;
  wallet: Maybe<string>;
};
