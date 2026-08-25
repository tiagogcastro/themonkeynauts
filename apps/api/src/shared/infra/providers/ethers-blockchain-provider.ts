/* eslint-disable no-await-in-loop */
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { SaleCrypto } from '@modules/sales/domain/enums/sale-crypto';
import { Either, left, right } from '@shared/core/logic/either';
import { Maybe } from '@shared/core/logic/maybe';
import {
  ConfirmTransactionDTO,
  ConfirmTransactionResponse,
  ConfirmTransactionWithTxhashOnlyResponse,
  IBlockchainProvider,
  SendTransactionDTO,
  SendTransactionResponse,
  TransferDTO,
  TransferResponse,
  WaitTransactionErrors,
  WaitTxReceiptErrors,
} from '@shared/domain/providers/blockchain-provider';
import { delay } from '@shared/helpers/delay';
import {
  Contract,
  JsonRpcProvider,
  TransactionReceipt,
  TransactionResponse,
  Wallet,
  formatEther,
  parseEther,
  toBigInt,
} from 'ethers';
import { inject, injectable } from 'tsyringe';
import { abis } from '../abi/sale-crypto';
import { InvalidCryptoError } from './errors';
import { AnotherTransactionRecipientError } from './errors/another-transaction-recipient-error';
import { AnotherTransactionSenderError } from './errors/another-transaction-sender-error';
import { InvalidAmountError } from './errors/invalid-amount-error';
import { InvalidPrivateKeyError } from './errors/invalid-private-key-error';
import { InvalidTransactionFromError } from './errors/invalid-transaction-from-error';
import { InvalidTransactionToError } from './errors/invalid-transaction-to-error';
import { MakeTxError } from './errors/make-tx-error';
import { TransactionCarriedOutError } from './errors/transaction-carried-out-error';
import { WaitTransactionError } from './errors/wait-transaction-error';
import { WaitTxReceiptError } from './errors/wait-tx-receipt-error';

const DEFAULT_BSC_RPC_URL = 'https://bsc-dataseed.binance.org';

// bounded wait: at most TX_WAIT_ATTEMPTS x TX_WAIT_DELAY_MS (default ~30s)
const TX_WAIT_ATTEMPTS = Number(process.env.TX_WAIT_ATTEMPTS || 15);
const TX_WAIT_DELAY_MS = Number(process.env.TX_WAIT_DELAY_MS || 2000);

type WaitTransactionReceiptResponse = Either<
  WaitTxReceiptErrors,
  TransactionReceipt
>;

type WaitTransactionResponse = Either<
  WaitTransactionErrors,
  TransactionResponse
>;

const cryptos: Record<SaleCrypto, string> = {
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase(),
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'.toLowerCase(),
  SPC: process.env.SMART_CONTRACT?.toLowerCase() as string,
};

@injectable()
export class EthersBlockchainProvider implements IBlockchainProvider {
  private provider: JsonRpcProvider;

  private signedContract?: Contract;

  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {
    this.provider = new JsonRpcProvider(
      process.env.BSC_RPC_URL || DEFAULT_BSC_RPC_URL,
    );

    if (process.env.SMART_CONTRACT && process.env.SALES_PRIVATE_KEY) {
      const signer = new Wallet(
        process.env.SALES_PRIVATE_KEY,
        this.provider,
      );

      this.signedContract = new Contract(
        process.env.SMART_CONTRACT,
        abis.SPC,
        signer,
      );
    }
  }

  async sendTransaction({
    to,
    amount,
  }: SendTransactionDTO): Promise<SendTransactionResponse> {
    if (!process.env.WALLET_PRIVATE_KEY) {
      return left(new InvalidPrivateKeyError());
    }

    try {
      const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY, this.provider);

      const transaction = await wallet.sendTransaction({
        to: to || process.env.SALES_WALLET,
        value: parseEther(String(amount)),
      });

      await transaction.wait();

      return right({ transactionHash: transaction.hash });
    } catch {
      return left(new MakeTxError());
    }
  }

  async waitTransactionReceipt(
    txHash: string,
  ): Promise<WaitTransactionReceiptResponse> {
    for (let attempt = 1; attempt <= TX_WAIT_ATTEMPTS; attempt++) {
      const obtainedTransactionReceipt =
        await this.provider.getTransactionReceipt(txHash);

      if (obtainedTransactionReceipt) {
        return right(obtainedTransactionReceipt);
      }

      await delay(TX_WAIT_DELAY_MS);
    }

    return left(new WaitTxReceiptError());
  }

  async waitTransaction(txHash: string): Promise<WaitTransactionResponse> {
    for (let attempt = 1; attempt <= TX_WAIT_ATTEMPTS; attempt++) {
      const obtainedTransaction = await this.provider.getTransaction(txHash);

      if (obtainedTransaction) {
        return right(obtainedTransaction);
      }

      await delay(TX_WAIT_DELAY_MS);
    }

    return left(new WaitTransactionError());
  }

  async transfer({
    amount,
    recipient,
  }: TransferDTO): Promise<TransferResponse> {
    if (!this.signedContract) {
      return left(new InvalidPrivateKeyError());
    }

    try {
      const transaction = await this.signedContract.transfer(
        recipient,
        parseEther(String(amount)),
      );

      await transaction.wait();

      return right(null);
    } catch {
      return left(new MakeTxError());
    }
  }

  async confirmTransaction({
    txHash,
    amount,
    crypto = SaleCrypto.BNB,
    to,
    from,
  }: ConfirmTransactionDTO): Promise<ConfirmTransactionResponse> {
    const checkIfTheTransactionHasAlreadyBeenCarriedOut =
      await this.logsRepository.findByTxHash(txHash);

    if (checkIfTheTransactionHasAlreadyBeenCarriedOut) {
      return left(new TransactionCarriedOutError());
    }

    const walletFrom = from?.toLowerCase();
    let walletTo = (to || process.env.SALES_WALLET)?.toLowerCase();

    if (!walletFrom) {
      return left(new InvalidTransactionFromError());
    }

    if (!walletTo) {
      return left(new InvalidTransactionToError());
    }

    const transactionResult = await this.waitTransaction(txHash);

    if (transactionResult.isLeft()) {
      return left(transactionResult.value);
    }

    const receiptResult = await this.waitTransactionReceipt(txHash);

    if (receiptResult.isLeft()) {
      return left(receiptResult.value);
    }

    const transaction = transactionResult.value;
    const transactionReceipt = receiptResult.value;

    if (
      amount !== undefined &&
      crypto === SaleCrypto.BNB &&
      transaction.value !== parseEther(String(amount))
    ) {
      return left(new InvalidAmountError());
    }

    const transactionTo = transaction.to?.toLowerCase();

    if (!transactionTo) {
      return left(new InvalidTransactionToError());
    }

    let txCrypto: Maybe<SaleCrypto> = null;
    let cryptoAmount: Maybe<number> = null;

    if (transactionReceipt.logs.length === 0 && crypto === SaleCrypto.BNB) {
      txCrypto = SaleCrypto.BNB;
    } else {
      const log = transactionReceipt.logs.find(
        findLog => findLog.transactionHash === txHash,
      );

      if (!log) {
        return left(new InvalidCryptoError());
      }

      cryptoAmount =
        Number(toBigInt(log.data)) / 10 ** 18;

      if (amount !== undefined && amount !== cryptoAmount) {
        return left(new InvalidAmountError());
      }

      const hasCrypto = Object.entries(cryptos).find(
        ([, cryptoAddress]) => cryptoAddress === log.address.toLowerCase(),
      );

      if (hasCrypto) {
        const [cryptoSymbol] = hasCrypto;

        txCrypto = cryptoSymbol as SaleCrypto;
      }
    }

    if (crypto !== txCrypto) {
      return left(new InvalidCryptoError());
    }

    // for token transfers the transaction target is the token contract itself
    if (crypto !== SaleCrypto.BNB) {
      walletTo = cryptos[crypto]?.toLowerCase();
    }

    if (!walletTo || transactionTo !== walletTo) {
      return left(new AnotherTransactionRecipientError());
    }

    if (transaction.from.toLowerCase() !== walletFrom) {
      return left(new AnotherTransactionSenderError());
    }

    return right({
      amount:
        cryptoAmount !== null && cryptoAmount !== undefined
          ? cryptoAmount
          : Number(formatEther(transaction.value)),
    });
  }

  async confirmTransactionWithTxhashOnly(
    txHash: string,
  ): Promise<ConfirmTransactionWithTxhashOnlyResponse> {
    const checkIfTheTransactionHasAlreadyBeenCarriedOut =
      await this.logsRepository.findByTxHash(txHash);

    if (checkIfTheTransactionHasAlreadyBeenCarriedOut) {
      return left(new TransactionCarriedOutError());
    }

    const transactionResult = await this.waitTransaction(txHash);

    if (transactionResult.isLeft()) {
      return left(transactionResult.value);
    }

    const receiptResult = await this.waitTransactionReceipt(txHash);

    if (receiptResult.isLeft()) {
      return left(receiptResult.value);
    }

    const transaction = transactionResult.value;
    const transactionReceipt = receiptResult.value;

    if (transactionReceipt.logs.length > 0) {
      return left(new InvalidCryptoError());
    }

    const walletFrom = transaction.from.toLowerCase();
    const walletTo = process.env.SALES_WALLET?.toLowerCase();
    const transactionTo = transaction.to?.toLowerCase();

    if (!transactionTo || !walletTo) {
      return left(new InvalidTransactionToError());
    }

    if (transactionTo !== walletTo) {
      return left(new AnotherTransactionRecipientError());
    }

    return right({
      walletFrom,
      amount: Number(formatEther(transaction.value)),
    });
  }
}
