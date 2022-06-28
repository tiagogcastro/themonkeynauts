export class TransactionCarriedOutError extends Error {
  constructor() {
    super(`This transaction has already been carried out`);

    this.name = 'TransactionCarriedOutError';
  }
}
