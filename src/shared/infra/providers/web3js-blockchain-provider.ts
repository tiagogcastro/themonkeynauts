import { IPrivateSalesRepository } from '@modules/private-sales/domain/repositories/private-sales-repositories';
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

import { ethToWei } from '../helpers/eth-to-wei';

@injectable()
export class Web3jsBlockchainProvider implements IBlockchainProvider {
  private web3: Web3;

  constructor(
    @inject('PrivateSalesRepository')
    private privateSalesRepository: IPrivateSalesRepository,
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

  async waitTransaction(tx_hash: string): Promise<void> {
    const RETRY = true;

    await retry(async () => {
      try {
        const receipt = await this.web3.eth.getTransactionReceipt(tx_hash);

        if (!receipt || !receipt.status) {
          return RETRY;
        }

        return !RETRY;
      } catch {
        throw new AppError('The transaction could not be confirmed', 400);
      }
    }, 500);
  }

  async confirmTransaction({
    tx_hash,
    amount,
    from,
  }: ConfirmTransactionDTO): Promise<void> {
    const checkIfTheTransactionHasAlreadyBeenCarriedOut =
      await this.privateSalesRepository.findByTxHash(tx_hash);

    if (checkIfTheTransactionHasAlreadyBeenCarriedOut) {
      throw new AppError('This transaction has already been carried out', 400);
    }

    await this.waitTransaction(tx_hash);

    let transaction: Transaction;

    try {
      transaction = await this.web3.eth.getTransaction(tx_hash);
    } catch {
      throw new AppError('The transaction could not be confirmed', 400);
    }

    const amountToWei = this.web3.utils.toWei(String(amount), 'ether');

    if (amountToWei !== transaction.value) {
      throw new AppError(
        'The transaction value is not the same as the one sent',
        400,
      );
    }

    if (transaction.to !== process.env.WALLET_TO) {
      throw new AppError(
        'The transaction destination is not the same as the wallet address',
        400,
      );
    }

    if (transaction.from !== from) {
      throw new AppError(
        'The transaction origin is not the same as the user wallet',
        400,
      );
    }
  }
}
