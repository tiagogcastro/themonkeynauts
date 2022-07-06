export class ResourceNotFoundError extends Error {
  constructor() {
    super('Player resources not created');

    this.name = 'ResourceNotFoundError';
  }
}
