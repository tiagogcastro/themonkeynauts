import { Player } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';

type SaveWalletRequestDTO = {
  wallet: string;
  player_id: string;
};
@injectable()
class SaveWalletBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute({ player_id, wallet }: SaveWalletRequestDTO): Promise<Player> {
    const player = await this.playersRepository.findById(player_id);

    if (!player) {
      throw new AppError('Player does not exist', 401);
    }

    player.wallet = wallet;

    await this.playersRepository.save(player);

    return player;
  }
}

export { SaveWalletBusinessLogic };
