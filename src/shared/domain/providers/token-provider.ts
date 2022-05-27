import { IPlayer } from '../../modules/players/domain/entities/IPlayer'

export interface ITokenProvider {
  generate(player: IPlayer): string;
  verify(token: string): void;
}
