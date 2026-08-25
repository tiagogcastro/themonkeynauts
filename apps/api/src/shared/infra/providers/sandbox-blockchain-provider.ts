/* eslint-disable no-await-in-loop */
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { Either, left, right } from '@shared/core/logic/either';
import {
  ConfirmTransactionDTO,
  ConfirmTransactionResponse,
  ConfirmTransactionWithTxhashOnlyResponse,
  IBlockchainProvider,
  SendTransactionDTO,
  SendTransactionResponse,
  TransferDTO,
  TransferResponse,
} from '@shared/domain/providers/blockchain-provider';
import { randomBytes } from 'node:crypto';
import { inject, injectable } from 'tsyringe';
import { TransactionCarriedOutError } from './errors/transaction-carried-out-error';
import { InvalidAmountError } from './errors/invalid-amount-error';
import { InvalidTransactionFromError } from './errors/invalid-transaction-from-error';

const SANDBOX_DEFAULT_DEPOSIT_AMOUNT = 100;

/**
 * Offline blockchain provider used for local development and demos.
 * No real chain calls are made - currency is fictitious and transactions
 * only need to be unique (replay is still blocked through the logs table).
 */
@injectable()
export class SandboxBlockchainProvider implements IBlockchainProvider {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async confirmTransaction({
    txHash,
    amount,
    from,
  }: ConfirmTransactionDTO): Promise<ConfirmTransactionResponse> {
    const alreadyUsed = await this.logsRepository.findByTxHash(txHash);

    if (alreadyUsed) {
      return left(new TransactionCarriedOutError());
    }

    if (from === undefined) {
      return left(new InvalidTransactionFromError());
    }

    if (amount !== undefined && amount <= 0) {
      return left(new InvalidAmountError());
    }

    return right({
      amount: amount ?? SANDBOX_DEFAULT_DEPOSIT_AMOUNT,
    });
  }

  async confirmTransactionWithTxhashOnly(
    txHash: string,
  ): Promise<ConfirmTransactionWithTxhashOnlyResponse> {
    const alreadyUsed = await this.logsRepository.findByTxHash(txHash);

    if (alreadyUsed) {
      return left(new TransactionCarriedOutError());
    }

    return right({
      walletFrom: process.env.SALES_WALLET || '0x0000000000000000000000000000000000000000',
      amount: SANDBOX_DEFAULT_DEPOSIT_AMOUNT,
    });
  }

  async transfer(_: TransferDTO): Promise<TransferResponse> {
    return right(null);
  }

  async sendTransaction(_: SendTransactionDTO): Promise<SendTransactionResponse> {
    const transactionHash = `0x${randomBytes(32).toString('hex')}`;

    return right({ transactionHash });
  }
}
