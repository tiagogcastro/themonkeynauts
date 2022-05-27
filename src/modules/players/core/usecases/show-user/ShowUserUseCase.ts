import { IPlayersRepository } from '../../repositories/IPlayersRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { Player } from '@prisma/client';

type ShowPlayerRequestDTO = {
  nickname?: string;
  player_id?: string;
}
type Response = { 
  player: Player;
}
class ShowPlayerBusinessLogic {
  constructor(
    private playersRepository: IPlayersRepository,
  ) {}

  async execute({
    nickname,
    player_id
  }: ShowPlayerRequestDTO): Promise<Response> {
    let player: Player | null = null;

    if (player_id) {
      player = await this.playersRepository.findById(
        player_id,
      );
    } else if (nickname) {
      player = await this.playersRepository.findByNickname(
        nickname,
      );
    } 

    if (!player || player.role === 'admin' && !player_id) {
      throw new AppError('Could not show player', 401);
    }

    return {
      player
    };
  }
}

export { ShowPlayerBusinessLogic };
