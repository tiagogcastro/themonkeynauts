import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import {
  ConfirmTransactionDTO,
  IBlockchainProvider,
  SendTransactionDTO,
} from '@shared/domain/providers/blockchain-provider';
import { AppError } from '@shared/errors/app-error';
import { retry } from '@shared/helpers/retry';
import { inject, injectable } from 'tsyringe';
import Web3 from 'web3';
import { Transaction } from 'web3-core';

@injectable()
export class Web3jsBlockchainProvider implements IBlockchainProvider {
  private web3: Web3;

  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        process.env.BLOCKCHAIN_PROVIDER_URL || 'http://localhost:8545',
      ),
    );
  }

  async sendTransaction(_: SendTransactionDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async waitTransaction(txHash: string): Promise<void> {
    const RETRY = true;

    await retry(async () => {
      try {
        const receipt = await this.web3.eth.getTransactionReceipt(txHash);

        if (!receipt || !receipt.status) {
          return RETRY;
        }

        return !RETRY;
      } catch {
        throw new AppError(
          'The get transaction receipt could not be confirmed',
          400,
        );
      }
    }, 500);
  }

  async waitGetTransaction(txHash: string): Promise<Transaction> {
    const RETRY = true;

    try {
      const _transaction = await new Promise<Transaction>(async resolve => {
        await retry(async () => {
          const transaction = await this.web3.eth.getTransaction(txHash);

          if (!transaction) {
            return RETRY;
          }

          resolve(transaction);

          return !RETRY;
        }, 500);
      });

      return _transaction;
    } catch {
      throw new AppError('The get transaction could not be confirmed', 400);
    }
  }

  async confirmTransaction({
    txHash,
    amount,
    playerId,
    from,
  }: ConfirmTransactionDTO): Promise<void> {
    const checkIfTheTransactionHasAlreadyBeenCarriedOut =
      await this.logsRepository.findByTxHash(txHash);

    if (checkIfTheTransactionHasAlreadyBeenCarriedOut) {
      throw new AppError('This transaction has already been carried out', 400);
    }

    const player = await this.playersRepository.findByWallet(from);

    if (!player) {
      throw new AppError(
        'The wallet you entered is not a valid wallet in our database',
        400,
      );
    }

    if (playerId !== player.id) {
      throw new AppError(
        `You are trying to create a private sale with another player's wallet`,
        400,
      );
    }

    await this.waitTransaction(txHash);

    const transaction = await this.waitGetTransaction(txHash);

    if (!transaction) {
      throw new AppError(
        'Transaction return is null, could not commit transaction',
        400,
      );
    }

    const amountToWei = this.web3.utils.toWei(String(amount), 'ether');

    if (amountToWei !== transaction.value) {
      throw new AppError(
        'The transaction value is not the same as the one sent',
        400,
      );
    }

    const transactionTo = transaction.to?.toLowerCase();
    const walletTo = process.env.SALES_WALLET?.toLowerCase();

    if (!transactionTo || !walletTo) {
      throw new AppError('The transaction could not be confirmed', 409);
    }

    const transactionFrom = transaction.from.toLowerCase();
    const walletFrom = from.toLowerCase();

    if (transactionTo !== walletTo) {
      throw new AppError(
        'The transaction destination is not the same as the wallet address',
        400,
      );
    }

    if (transactionFrom !== walletFrom) {
      throw new AppError(
        'The transaction origin is not the same as the user wallet',
        400,
      );
    }
  }
}
