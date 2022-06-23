import { IPlayer } from '@modules/players/domain/entities/player';
import { AsyncMaybe } from '@shared/core/logic/maybe';

interface IPlayersRepository {
  findByEmail(email: string): AsyncMaybe<IPlayer>;
  findByWallet(wallet: string): AsyncMaybe<IPlayer>;
  findById(id: string): AsyncMaybe<IPlayer>;
  findByNickname(nickname: string): AsyncMaybe<IPlayer>;
  create(player: IPlayer): Promise<void>;
  save(player: IPlayer): Promise<void>;
  findPlayers(isEnabled?: boolean): Promise<IPlayer[]>;
}
export { IPlayersRepository };
