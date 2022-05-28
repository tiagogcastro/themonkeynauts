import { Player } from '@modules/players/domain/entities/player';

export interface ITokenProvider {
  generate(player: Player): string;
  verify(token: string): void;
}
