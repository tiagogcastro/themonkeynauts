export class AnotherPlayerWalletError extends Error {
  constructor() {
    super(`You are trying to make a transaction with another player's wallet`);

    this.name = 'AnotherPlayerWalletError';
  }
}
