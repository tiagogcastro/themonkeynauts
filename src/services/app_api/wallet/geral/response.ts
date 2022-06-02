export type Wallet = {
  id: string;
  address: string;
  name: string;
  balance: number;
};

export type SaveWalletResponse = {
  wallet: Wallet;
}
