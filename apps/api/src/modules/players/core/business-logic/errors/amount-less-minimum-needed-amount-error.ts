export class AmountLessMinimumNeededAmountError extends Error {
  constructor() {
    super('Amount less than the minimum required amount to withdraw');

    this.name = 'AmountLessMinimumNeededAmountError';
  }
}
