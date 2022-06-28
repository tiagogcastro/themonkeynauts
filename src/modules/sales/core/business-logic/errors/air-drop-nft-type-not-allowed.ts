export class AirDropNftTypeNotAllowed extends Error {
  constructor() {
    super('Air drop nft type not allowed');

    this.name = 'AirDropNftTypeNotAllowed';
  }
}
