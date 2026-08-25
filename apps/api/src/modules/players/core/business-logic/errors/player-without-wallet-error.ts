export class PlayerWithoutWalletError extends Error {
  constructor() {
    super('The player has no wallet');

    this.name = 'PlayerWithoutWalletError';
  }
}
