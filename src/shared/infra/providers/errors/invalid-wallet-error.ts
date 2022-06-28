export class InvalidWalletError extends Error {
  constructor() {
    super(`The wallet you entered is not a valid wallet in our database`);

    this.name = 'InvalidWalletError';
  }
}
