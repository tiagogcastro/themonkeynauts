import { IPlayer } from '@modules/players/domain/entities/player';
import { IResource } from '@modules/players/domain/entities/resource';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { Either, left, right } from '@shared/core/logic/either';
import {
  ConfirmTransactionErrors,
  IBlockchainProvider,
  SendTransactionErrors,
} from '@shared/domain/providers/blockchain-provider';
import { inject, injectable } from 'tsyringe';
import { AmountLessMinimumNeededAmountError } from './errors/amount-less-minimum-needed-amount-error';
import { PlayerNotFoundError } from './errors/player-not-fount-error';
import { ResourceNotFoundError } from './errors/resource-not-fount-error';

export type WithdrawTokensRequestDTO = {
  playerId: string;
  amount: number;
};

type WithdrawTokensErrors =
  | PlayerNotFoundError
  | AmountLessMinimumNeededAmountError
  | ResourceNotFoundError;

type WithdrawTokensResponse = Either<
  WithdrawTokensErrors | ConfirmTransactionErrors | SendTransactionErrors,
  IPlayer & {
    resource: IResource;
  }
>;

@injectable()
class WithdrawTokensBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,

    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  async execute({
    playerId,
    amount,
  }: WithdrawTokensRequestDTO): Promise<WithdrawTokensResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const resource = await this.resourcesRepository.findByPlayerId(playerId);

    if (!resource) {
      return left(new ResourceNotFoundError());
    }
    const minimumAmountNeededToWithdraw = 1000;

    if (resource.spc < minimumAmountNeededToWithdraw) {
      return left(new AmountLessMinimumNeededAmountError());
    }

    const transferFromResult = await this.blockchainProvider.transfer({
      amount,
      recipient: player.wallet as string,
    });

    if (transferFromResult.isLeft()) {
      const error = transferFromResult.value;

      return left(error);
    }

    resource.spc -= Math.ceil(amount);

    await this.resourcesRepository.save(resource);

    return right({
      ...player,
      resource,
    });
  }
}

export { WithdrawTokensBusinessLogic };
