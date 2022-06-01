type ConfirmTransactionDTO = {
  from: string;
  amount: number;
  tx_hash: string;
};

type SendTransactionDTO = {
  from: string;
  amount: number;
  player_id: string;
  tx_hash: string;
};

interface IBlockchainProvider {
  waitTransaction(tx_hash: string): Promise<void>;
  confirmTransaction(data: ConfirmTransactionDTO): Promise<void>;
  sendTransaction(data: SendTransactionDTO): Promise<void>;
}

export { IBlockchainProvider, ConfirmTransactionDTO, SendTransactionDTO };
