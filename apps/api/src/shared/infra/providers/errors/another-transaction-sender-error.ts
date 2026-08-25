export class AnotherTransactionSenderError extends Error {
  constructor() {
    super(`The sender of the transaction is not the same as the user's wallet`);

    this.name = 'AnotherTransactionSenderError';
  }
}
