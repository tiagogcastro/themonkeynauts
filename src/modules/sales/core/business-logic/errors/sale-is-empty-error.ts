export class SaleIsEmptyError extends Error {
  constructor(saleName: string) {
    super(`${saleName} sale is empty`);

    this.name = 'SaleIsEmptyError';
  }
}
