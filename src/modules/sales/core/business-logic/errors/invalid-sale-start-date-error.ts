export class InvalidSaleStartDateError extends Error {
  constructor(saleName: string) {
    super(`The ${saleName} sale hasn't started yet`);

    this.name = 'InvalidSaleStartDateError';
  }
}
