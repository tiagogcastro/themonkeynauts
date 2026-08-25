import { balanceConfig } from '@config/balance';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Either, right } from '@shared/core/logic/either';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IPrivateSalesRepository } from '../../domain/repositories/private-sales-repositories';

type ShowPlayerBNBBalanceResponse = Either<
  Error,
  {
    player_balance: {
      bnbAmount_spent: number;
      bnbAmount_spent_max: number;
      wallet: string;
    };
  }
>;

@injectable()
class ShowPlayerBNBBalanceBusinessLogic {
  constructor(
    @inject('PrivateSalesRepository')
    private privateSalesRepository: IPrivateSalesRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute(playerId: string): Promise<ShowPlayerBNBBalanceResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      throw new AppError('Player does not exist', 401);
    }

    if (!player.wallet) {
      throw new AppError('Player does not have a wallet', 400);
    }

    const privateSales =
      await this.privateSalesRepository.listAllPrivateSalesFromPlayer(playerId);

    const bnbAmountLimit = balanceConfig.bnbAmountMax;

    const bnbAmountTotal = privateSales.reduce(
      (accumulator, currentPrivateSale) =>
        accumulator + currentPrivateSale.bnbAmount,
      0,
    );

    return right({
      player_balance: {
        bnbAmount_spent: bnbAmountTotal,
        bnbAmount_spent_max: bnbAmountLimit,
        wallet: player.wallet,
      },
    });
  }
}

export { ShowPlayerBNBBalanceBusinessLogic };
