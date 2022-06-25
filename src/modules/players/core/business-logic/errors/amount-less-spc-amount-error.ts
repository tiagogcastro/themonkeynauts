export class AmountLessSPCAmountError extends Error {
  constructor() {
    super('The amount shipped is less than the amount of spc you own');

    this.name = 'AmountLessSPCAmountError';
  }
}
