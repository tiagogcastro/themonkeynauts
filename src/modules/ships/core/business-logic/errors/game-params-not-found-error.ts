export class GameParamsNotFoundError extends Error {
  constructor() {
    super('Game Params not found');

    this.name = 'GameParamsNotFoundError';
  }
}
