import { Player } from '@modules/players/domain/entities/player';
import { AsyncMaybe } from '@shared/types/maybe';

interface IPlayersRepository {
  findByEmail(email: string): AsyncMaybe<Player>;
  findById(id: string): AsyncMaybe<Player>;
  findByNickname(nickname: string, enabled?: boolean): AsyncMaybe<Player>;
  create(player: Player): Promise<void>;
  save(player: Player): Promise<void>;
  findPlayers(enabled?: boolean): Promise<Player[]>;
}
export { IPlayersRepository };
