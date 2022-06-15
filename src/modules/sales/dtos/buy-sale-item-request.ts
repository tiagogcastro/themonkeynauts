import { Maybe } from '@shared/types/maybe';

type BuySaleItemRequestDTO = {
  playerId: string;
  packSaleId: Maybe<string>;
  monkeynautSaleId: Maybe<string>;
  shipSaleId: Maybe<string>;
  wallet: string;
  txHash: string;
};

export { BuySaleItemRequestDTO };
