export class InvalidOwnerError extends Error {
  constructor() {
    super('Only owner can access here');

    this.name = 'InvalidOwnerError';
  }
}
