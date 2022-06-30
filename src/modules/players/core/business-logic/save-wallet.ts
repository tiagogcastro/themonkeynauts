import { IPlayer } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Either, right } from '@shared/core/logic/either';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';

export type SaveWalletRequestDTO = {
  wallet: string;
  playerId: string;
};

type SaveWalletResponse = Either<
  Error,
  {
    player: IPlayer;
  }
>;

@injectable()
class SaveWalletBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute({
    playerId,
    wallet,
  }: SaveWalletRequestDTO): Promise<SaveWalletResponse> {
    const player = await this.playersRepository.findById(playerId);

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

    return right({ player });
  }
}

export { SaveWalletBusinessLogic };
