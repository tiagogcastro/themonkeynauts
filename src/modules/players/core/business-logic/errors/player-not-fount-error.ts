export class PlayerNotFoundError extends Error {
  constructor() {
    super('Player does not exist');

    this.name = 'PlayerNotFoundError';
  }
}
