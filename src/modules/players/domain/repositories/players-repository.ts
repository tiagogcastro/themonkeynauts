import { CreatePlayerRequestDTO } from '@modules/players/core/dtos/create-player-request';
import { Player } from '@modules/players/domain/entities/player';

interface IPlayersRepository {
  findByEmail(
    email: string,
  ): Promise<Player | null>;
  findById(
    id: string,
  ): Promise<(Player) | null | null>;
  findByNickname(
    nickname: string,
    enabled?: boolean,
  ): Promise<Player | null>;
  create(data: CreatePlayerRequestDTO): Promise<Player>;
  save(player: Player): Promise<Player>;
  findPlayers(enabled?: boolean): Promise<Player[]>;
}
export { IPlayersRepository };
