export class SaleNotFoundError extends Error {
  constructor(saleName: string) {
    super(`${saleName} sale not found`);

    this.name = 'SaleNotFoundError';
  }
}
