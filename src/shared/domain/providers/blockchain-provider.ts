type ConfirmTransactionDTO = {
  from: string;
  amount: number;
  txHash: string;
};

type SendTransactionDTO = {
  from: string;
  amount: number;
  playerId: string;
  txHash: string;
};

interface IBlockchainProvider {
  confirmTransaction(data: ConfirmTransactionDTO): Promise<void>;
  sendTransaction(data: SendTransactionDTO): Promise<void>;
}

export { IBlockchainProvider, ConfirmTransactionDTO, SendTransactionDTO };
