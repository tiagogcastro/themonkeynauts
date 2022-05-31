type ConfirmTransactionDTO = {
  from: string;
  amount: number;
  tx_hash: string;
};

interface IBlockchainProvider {
  confirmTransaction(data: ConfirmTransactionDTO): Promise<boolean>;
}

export { IBlockchainProvider, ConfirmTransactionDTO };
