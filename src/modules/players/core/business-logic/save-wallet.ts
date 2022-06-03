import { IPlayer } from '@modules/players/domain/entities/player';
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

  async execute({ player_id, wallet }: SaveWalletRequestDTO): Promise<IPlayer> {
    const player = await this.playersRepository.findById(player_id);

    if (!player) {
      throw new AppError('Player does not exist', 401);
    }

    if (player.wallet) {
      throw new AppError('Wallet already saved', 400);
    }

    const checkWalletAlreadyExists = await this.playersRepository.findByWallet(
      wallet,
    );

    if (checkWalletAlreadyExists) {
      throw new AppError('Wallet already exists', 400);
    }

    player.wallet = wallet;

    await this.playersRepository.save(player);

    return player;
  }
}

export { SaveWalletBusinessLogic };
