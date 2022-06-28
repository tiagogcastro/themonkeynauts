export class InvalidAmountError extends Error {
  constructor() {
    super(`The transaction value is not the same as the one sent`);

    this.name = 'InvalidAmountError';
  }
}
