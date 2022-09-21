import { Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IPlayer } from '@modules/players/domain/entities/player';
import { IResource } from '@modules/players/domain/entities/resource';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { Either, left, right } from '@shared/core/logic/either';
import {
  ConfirmTransactionErrors,
  IBlockchainProvider,
} from '@shared/domain/providers/blockchain-provider';
import { inject, injectable } from 'tsyringe';
import { PlayerNotFoundError } from './errors/player-not-fount-error';
import { ResourceNotFoundError } from './errors/resource-not-fount-error';

export type DepositTokensRequestDTO = {
  playerId: string;
  amount: number;
  txHash: string;
};

type DepositTokensErrors = PlayerNotFoundError;

type DepositTokensResponse = Either<
  DepositTokensErrors | ConfirmTransactionErrors,
  IPlayer & {
    resource: IResource;
  }
>;

@injectable()
class DepositTokensBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,

    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    playerId,
    txHash,
    amount,
  }: DepositTokensRequestDTO): Promise<DepositTokensResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const resource = await this.resourcesRepository.findByPlayerId(playerId);

    if (!resource) {
      return left(new ResourceNotFoundError());
    }

    const confirmTransactionResult =
      await this.blockchainProvider.confirmTransaction({
        from: player.wallet as string,
        playerId,
        txHash,
      });

    if (confirmTransactionResult.isLeft()) {
      const error = confirmTransactionResult.value;

      return left(error);
    }

    // const { amount } = confirmTransactionResult.value;

    const spcAmount = amount;

    resource.spc += spcAmount;

    await this.resourcesRepository.save(resource);

    const { log } = new Log({
      action: `The player has deposited ${Math.ceil(
        spcAmount,
      )} SPC into his account`,
      playerId: player.id,
      txHash,
    });

    await this.logsRepository.create(log);

    return right({
      ...player,
      resource,
    });
  }
}

export { DepositTokensBusinessLogic };
