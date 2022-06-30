export class CannotConsumeFuelError extends Error {
  constructor() {
    super('You cannot consume more fuel than you have');

    this.name = 'CannotConsumeFuelError';
  }
}
