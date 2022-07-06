export class DontEnoughSpcAmountError extends Error {
  constructor() {
    super("You don't have enough spc amount");

    this.name = 'DontEnoughSpcAmountError';
  }
}
