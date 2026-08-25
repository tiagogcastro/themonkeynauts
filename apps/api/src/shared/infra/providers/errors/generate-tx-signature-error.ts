export class GenerateTxSignatureError extends Error {
  constructor() {
    super(`Failed to generate transaction signature`);

    this.name = 'GenerateTxSignatureError';
  }
}
