export type CreateWalletParams = {
  body: {
    name: string;
    address: string | undefined;
  }
}