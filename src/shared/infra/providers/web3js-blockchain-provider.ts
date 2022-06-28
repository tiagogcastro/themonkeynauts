import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Either, left, right } from '@shared/core/logic/either';
import {
  ConfirmTransactionDTO,
  ConfirmTransactionResponse,
  IBlockchainProvider,
  SendTransactionDTO,
  SendTransactionResponse,
} from '@shared/domain/providers/blockchain-provider';
import { retry } from '@shared/helpers/retry';
import { inject, injectable } from 'tsyringe';
import Web3 from 'web3';
import { SignedTransaction, Transaction, TransactionReceipt } from 'web3-core';
import Tx from '@ethereumjs/tx';
import Common from '@ethereumjs/common';
import { AnotherPlayerWalletError } from './errors/another-player-wallet-error';
import { AnotherTransactionRecipientError } from './errors/another-transaction-recipient-error';
import { AnotherTransactionSenderError } from './errors/another-transaction-sender-error';
import { GenerateTxSignatureError } from './errors/generate-tx-signature-error';
import { InvalidAmountError } from './errors/invalid-amount-error';
import { InvalidTransactionToError } from './errors/invalid-transaction-to-error';
import { InvalidWalletError } from './errors/invalid-wallet-error';
import { MakeTxError } from './errors/make-tx-error';
import { TransactionCarriedOutError } from './errors/transaction-carried-out-error';
import { WaitTransactionError } from './errors/wait-transaction-error';
import { WaitTxReceiptError } from './errors/wait-tx-receipt-error';
import { InvalidTransactionFromError } from './errors/invalid-transaction-from-error';
import { InvalidPrivateKeyError } from './errors/invalid-private-key-error';

type WaitTransactionReceiptResponse = Either<
  WaitTxReceiptError,
  TransactionReceipt
>;
type WaitTransactionResponse = Either<WaitTransactionError, Transaction>;
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

  async sendTransaction({
    from,
    to,
    contract,
    amount,
    privateKey,
  }: SendTransactionDTO): Promise<SendTransactionResponse> {
    const walletFrom = (from || process.env.SALES_WALLET)?.toLowerCase();
    const walletTo = (to || process.env.SALES_WALLET)?.toLowerCase();

    let signedTransaction: SignedTransaction;

    if (privateKey && process.env.WALLET_PRIVATE_KEY) {
      return left(new InvalidPrivateKeyError());
    }

    try {
      signedTransaction = await this.web3.eth.accounts.signTransaction(
        {
          to: walletTo,
          from: walletFrom,
          data: contract,
          value: this.web3.utils.toWei(String(amount), 'ether'),
          gas: '210000',
        },
        privateKey || (process.env.WALLET_PRIVATE_KEY as string),
      );

      if (!signedTransaction.rawTransaction) {
        return left(new GenerateTxSignatureError());
      }
    } catch (error) {
      console.log(error);
      return left(new GenerateTxSignatureError());
    }

    try {
      const transactionReceipt = await this.web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction,
      );

      return right({
        transactionHash: transactionReceipt.transactionHash,
      });
    } catch (error) {
      console.log(error);
      return left(new MakeTxError());
    }
  }

  async waitTransactionReceipt(
    txHash: string,
  ): Promise<WaitTransactionReceiptResponse> {
    const RETRY = true;

    try {
      const transactionReceipt = await new Promise<TransactionReceipt>(
        async resolve => {
          await retry(async () => {
            const obtainedTransactionReceipt =
              await this.web3.eth.getTransactionReceipt(txHash);

            if (
              !obtainedTransactionReceipt ||
              !obtainedTransactionReceipt.status
            ) {
              return RETRY;
            }

            resolve(obtainedTransactionReceipt);

            return !RETRY;
          }, 500);
        },
      );

      return right(transactionReceipt);
    } catch {
      return left(new WaitTxReceiptError());
    }
  }

  async waitTransaction(txHash: string): Promise<WaitTransactionResponse> {
    const RETRY = true;

    try {
      const transaction = await new Promise<Transaction>(async resolve => {
        await retry(async () => {
          const obtainedTransaction = await this.web3.eth.getTransaction(
            txHash,
          );

          if (!obtainedTransaction) {
            return RETRY;
          }

          resolve(obtainedTransaction);

          return !RETRY;
        }, 500);
      });

      return right(transaction);
    } catch {
      return left(new WaitTransactionError());
    }
  }

  async confirmTransaction({
    txHash,
    amount,
    playerId,
    to,
    from,
  }: ConfirmTransactionDTO): Promise<ConfirmTransactionResponse> {
    const checkIfTheTransactionHasAlreadyBeenCarriedOut =
      await this.logsRepository.findByTxHash(txHash);

    if (checkIfTheTransactionHasAlreadyBeenCarriedOut) {
      return left(new TransactionCarriedOutError());
    }

    const walletFrom = (from || process.env.SALES_WALLET)?.toLowerCase();
    const walletTo = (to || process.env.SALES_WALLET)?.toLowerCase();

    if (!walletFrom) {
      return left(new InvalidTransactionFromError());
    }

    if (!walletTo) {
      return left(new InvalidTransactionToError());
    }

    const player = await this.playersRepository.findByWallet(
      from || walletFrom,
    );

    if (!player) {
      return left(new InvalidWalletError());
    }

    if (playerId !== player.id) {
      return left(new AnotherPlayerWalletError());
    }

    const waitTransactionReceiptResult = await this.waitTransactionReceipt(
      txHash,
    );

    if (waitTransactionReceiptResult.isLeft()) {
      const error = waitTransactionReceiptResult.value;

      return left(error);
    }

    const transactionReceipt = waitTransactionReceiptResult.value;

    const waitTransactionResult = await this.waitTransaction(txHash);

    if (waitTransactionResult.isLeft()) {
      const error = waitTransactionResult.value;

      return left(error);
    }

    const transaction = waitTransactionResult.value;

    console.log(transaction);
    console.log(transactionReceipt);

    if (amount) {
      const amountToWei = this.web3.utils.toWei(String(amount), 'ether');

      if (amountToWei !== transaction.value) {
        return left(new InvalidAmountError());
      }
    }

    const transactionTo = transaction.to?.toLowerCase();

    if (!transactionTo) {
      return left(new InvalidTransactionToError());
    }

    const transactionFrom = transaction.from.toLowerCase();

    if (transactionTo !== walletTo) {
      return left(new AnotherTransactionRecipientError());
    }

    if (transactionFrom !== walletFrom) {
      return left(new AnotherTransactionSenderError());
    }

    return right({
      amount: Number(this.web3.utils.fromWei(transaction.value, 'ether')),
    });
  }
}
