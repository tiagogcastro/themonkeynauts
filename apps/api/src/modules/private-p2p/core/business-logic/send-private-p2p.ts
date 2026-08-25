import { Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { PlayerNotFoundError } from '@modules/players/core/business-logic/errors/player-not-fount-error';
import { PlayerWithoutWalletError } from '@modules/players/core/business-logic/errors/player-without-wallet-error';
import {
  IPrivateSaleP2P,
  PrivateSaleP2P,
} from '@modules/private-p2p/domain/entities/private-p2p';
import { IPrivateSaleP2PRepository } from '@modules/private-p2p/domain/repositories/private-p2p-repositories';
import { Either, left, right } from '@shared/core/logic/either';
import { IBlockchainProvider } from '@shared/domain/providers/blockchain-provider';
import { inject, injectable } from 'tsyringe';

export type SendPrivateSaleP2PRequestDTO = {
  email: string;
  txHash: string;
  playerId: string;
};

type SendPrivateSaleP2PResponse = Either<
  PlayerWithoutWalletError | PlayerNotFoundError,
  {
    privateSaleP2P: IPrivateSaleP2P;
  }
>;
@injectable()
export class SendPrivateSaleP2PBusinessLogic {
  constructor(
    @inject('PrivateSaleP2PRepository')
    private privateSaleP2PRepository: IPrivateSaleP2PRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  async execute({
    email,
    txHash,
    playerId,
  }: SendPrivateSaleP2PRequestDTO): Promise<SendPrivateSaleP2PResponse> {
    const confirmTransactionResult =
      await this.blockchainProvider.confirmTransactionWithTxhashOnly(txHash);

    if (confirmTransactionResult.isLeft()) {
      return left(confirmTransactionResult.value);
    }

    const { privateSaleP2P } = new PrivateSaleP2P({
      email,
      txHash,
      bnbAmount: confirmTransactionResult.value.amount,
      wallet: confirmTransactionResult.value.walletFrom,
    });

    await this.privateSaleP2PRepository.create(privateSaleP2P);

    const { log } = new Log({
      action: `Sent txhash to ${email}`,
      playerId,
      txHash,
    });

    await this.logsRepository.create(log);

    return right({
      privateSaleP2P,
    });
  }
}
