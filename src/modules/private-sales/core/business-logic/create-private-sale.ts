import { balanceConfig } from '@config/balance';
import { Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IPlayer } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import {
  IPrivateSale,
  PrivateSale,
} from '@modules/private-sales/domain/entities/private-sale';
import { CreatePrivateSaleRequestDTO } from '@modules/private-sales/dtos/create-private-sale-request';
import { Either, left, right } from '@shared/core/logic/either';
import { Maybe } from '@shared/core/logic/maybe';
import {
  ConfirmTransactionErrors,
  IBlockchainProvider,
} from '@shared/domain/providers/blockchain-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IPrivateSalesRepository } from '../../domain/repositories/private-sales-repositories';

type CreatePrivateSaleResponse = Either<ConfirmTransactionErrors, IPrivateSale>;
@injectable()
class CreatePrivateSaleBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('PrivateSalesRepository')
    private privateSalesRepository: IPrivateSalesRepository,

    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    playerId,
    txHash,
    bnbAmount,
    wallet,
  }: CreatePrivateSaleRequestDTO): Promise<CreatePrivateSaleResponse> {
    let player: Maybe<IPlayer>;

    if (wallet) {
      player = await this.playersRepository.findByWallet(wallet);
    } else {
      player = await this.playersRepository.findById(playerId);
    }

    if (!player) {
      throw new AppError(
        'Could not create private sale because player does not exist',
        401,
      );
    }

    const privateSales =
      await this.privateSalesRepository.listAllPrivateSales();

    const bnbAmountTotal = privateSales.reduce(
      (accumulator, currentPrivateSale) =>
        accumulator + currentPrivateSale.bnbAmount,
      0,
    );

    if (bnbAmountTotal + bnbAmount > balanceConfig.bnbAmountTotalMax) {
      throw new AppError(
        `The value entered plus transfers already made exceeds the maximum value of ${balanceConfig.bnbAmountTotalMax} BNB`,
        401,
      );
    }

    const privateSalesFromPlayer =
      await this.privateSalesRepository.listAllPrivateSalesFromPlayer(
        player.id,
      );

    const bnbAmountLimit = balanceConfig.bnbAmountMax;

    const bnbAmountFromPlayerTotal = privateSalesFromPlayer.reduce(
      (accumulator, currentPrivateSale) =>
        accumulator + currentPrivateSale.bnbAmount,
      0,
    );

    if (bnbAmountFromPlayerTotal + bnbAmount > bnbAmountLimit) {
      throw new AppError(
        `The player has reached the limit of ${bnbAmountLimit} BNB`,
        400,
      );
    }

    const confirmTransactionResult =
      await this.blockchainProvider.confirmTransaction({
        amount: bnbAmount,
        from: player.wallet as string,
        playerId: player.id,
        txHash,
      });

    if (confirmTransactionResult.isLeft()) {
      const error = confirmTransactionResult.value;

      return left(error);
    }

    const { privateSale } = new PrivateSale({
      playerId: player.id,
      txHash,
      bnbAmount,
      wallet: player.wallet as string,
    });

    await this.privateSalesRepository.create(privateSale);

    const { log } = new Log({
      action: `The player bought SPC in the amount of ${bnbAmount} BNB. PRIVATE_SALE_ID:${privateSale.id}`,
      playerId: player.id,
      txHash,
    });

    await this.logsRepository.create(log);

    return right(privateSale);
  }
}

export { CreatePrivateSaleBusinessLogic };
