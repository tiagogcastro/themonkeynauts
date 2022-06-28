export class MakeTxError extends Error {
  constructor() {
    super(`Error performing transaction`);

    this.name = 'MakeTxError';
  }
}
