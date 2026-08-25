export class InvalidSaleEndDateError extends Error {
  constructor(saleName: string) {
    super(`The ${saleName} sale has ended`);

    this.name = 'InvalidSaleEndDateError';
  }
}
