export class InvalidGameClientVersionError extends Error {
  constructor() {
    super('Game client version is required on creation');

    this.name = 'InvalidGameClientVersionError';
  }
}
