export class WaitTxReceiptError extends Error {
  constructor() {
    super(`Could not wait to get transaction receipt`);

    this.name = 'WaitTxReceiptError';
  }
}
