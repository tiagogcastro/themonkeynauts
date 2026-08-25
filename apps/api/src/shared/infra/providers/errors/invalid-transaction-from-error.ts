export class InvalidTransactionFromError extends Error {
  constructor() {
    super(`The transaction could not be confirmed`);

    this.name = 'InvalidTransactionFromError';
  }
}
