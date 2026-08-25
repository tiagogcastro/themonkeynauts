export class InvalidTransactionToError extends Error {
  constructor() {
    super(`The transaction could not be confirmed`);

    this.name = 'InvalidTransactionToError';
  }
}
