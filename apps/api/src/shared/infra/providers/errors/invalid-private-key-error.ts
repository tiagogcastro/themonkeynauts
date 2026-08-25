export class InvalidPrivateKeyError extends Error {
  constructor() {
    super(`Private key not embedded in backend`);

    this.name = 'InvalidPrivateKeyError';
  }
}
