export class WaitTransactionError extends Error {
  constructor() {
    super(`Could not wait for transaction to complete`);

    this.name = 'WaitTransactionError';
  }
}
