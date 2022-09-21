export class InvalidCryptoError extends Error {
  constructor() {
    super(`Don't even try to cheat, transaction hash has invalid token`);

    this.name = 'InvalidCryptoError';
  }
}
