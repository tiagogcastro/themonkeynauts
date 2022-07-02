export class InvalidGameVersionError extends Error {
  constructor() {
    super('Your version is incompatible');

    this.name = 'InvalidGameVersionError';
  }
}
