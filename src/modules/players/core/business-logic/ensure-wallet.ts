import { inject, injectable } from 'tsyringe';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Either, left, right } from '@shared/core/logic/either';
import { PlayerNotFoundError } from './errors/player-not-fount-error';
import { PlayerWithoutWalletError } from './errors/player-without-wallet-error';

export type EnsureWalletRequestDTO = {
  playerId: string;
};

type EnsureWalletResponse = Either<
  PlayerNotFoundError | PlayerWithoutWalletError,
  null
>;

@injectable()
export class EnsureWalletBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute({
    playerId,
  }: EnsureWalletRequestDTO): Promise<EnsureWalletResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const hasWallet = await this.playersRepository.hasWallet(playerId);

    if (!hasWallet) {
      return left(new PlayerWithoutWalletError());
    }

    return right(null);
  }
}
