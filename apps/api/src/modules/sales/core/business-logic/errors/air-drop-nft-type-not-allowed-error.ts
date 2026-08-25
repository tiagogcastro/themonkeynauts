export class AirDropNftTypeNotAllowedError extends Error {
  constructor() {
    super('Air drop nft type not allowed');

    this.name = 'AirDropNftTypeNotAllowedError';
  }
}
