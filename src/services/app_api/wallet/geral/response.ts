export type Wallet = {
  id: string;
  address: string;
  name: string;
  balance: number;
};

export type CreateWalletResponse = {
  wallet: Wallet;
}
