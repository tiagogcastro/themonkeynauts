/* eslint-disable no-await-in-loop */
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
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
  WaitTransactionErrors,
  WaitTxReceiptErrors,
} from '@shared/domain/providers/blockchain-provider';
import { delay } from '@shared/helpers/delay';
import { BigNumber, ethers } from 'ethers';
import { inject, injectable } from 'tsyringe';
import Web3 from 'web3';
import { SignedTransaction } from 'web3-core';
import { InvalidCryptoError } from './errors';
import { AnotherTransactionRecipientError } from './errors/another-transaction-recipient-error';
import { AnotherTransactionSenderError } from './errors/another-transaction-sender-error';
import { GenerateTxSignatureError } from './errors/generate-tx-signature-error';
import { InvalidAmountError } from './errors/invalid-amount-error';
import { InvalidPrivateKeyError } from './errors/invalid-private-key-error';
import { InvalidTransactionFromError } from './errors/invalid-transaction-from-error';
import { InvalidTransactionToError } from './errors/invalid-transaction-to-error';
import { MakeTxError } from './errors/make-tx-error';
import { TransactionCarriedOutError } from './errors/transaction-carried-out-error';
import { WaitTransactionError } from './errors/wait-transaction-error';
import { WaitTxReceiptError } from './errors/wait-tx-receipt-error';

type WaitTransactionReceiptResponse = Either<
  WaitTxReceiptErrors,
  ethers.providers.TransactionReceipt
>;

type WaitTransactionResponse = Either<
  WaitTransactionErrors,
  ethers.providers.TransactionResponse
>;
const cryptos: Record<SaleCrypto, string> = {
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase(),
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56'.toLowerCase(),
  SPC: process.env.SMART_CONTRACT?.toLowerCase() as string,
};

@injectable()
export class Web3jsBlockchainProvider implements IBlockchainProvider {
  private web3: Web3;

  private ethersProvider: ethers.providers.JsonRpcProvider;

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
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.BLOCKCHAIN_PROVIDER_URL || 'http://localhost:8545',
    );

    if (process.env.SMART_CONTRACT) {
      this.ethersProvider = provider;
    }
  }

  async sendTransaction({
    from,
    to,
    amount,
    privateKey,
  }: SendTransactionDTO): Promise<SendTransactionResponse> {
    const walletFrom = (from || process.env.SALES_WALLET)?.toLowerCase();
    const walletTo = (to || process.env.SALES_WALLET)?.toLowerCase();

    let signedTransaction: SignedTransaction;

    if (!privateKey && !process.env.WALLET_PRIVATE_KEY) {
      return left(new InvalidPrivateKeyError());
    }

    try {
      signedTransaction = await this.web3.eth.accounts.signTransaction(
        {
          to: walletTo,
          from: walletFrom,
          value: this.web3.utils.toWei(String(amount), 'ether'),
          gas: '210000',
        },
        privateKey || (process.env.WALLET_PRIVATE_KEY as string),
      );

      if (!signedTransaction.rawTransaction) {
        return left(new GenerateTxSignatureError());
      }
    } catch (error) {
      console.log({ error });
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
    try {
      for (let attempt = 1; attempt <= 60; attempt++) {
        const obtainedTransactionReceipt =
          await this.ethersProvider.getTransactionReceipt(txHash);

        if (obtainedTransactionReceipt)
          return right(obtainedTransactionReceipt);

        await delay(10 * 1000);
      }

      throw new Error();
    } catch (error) {
      console.log({ error });
      return left(new WaitTxReceiptError());
    }
  }

  async waitTransaction(txHash: string): Promise<WaitTransactionResponse> {
    try {
      for (let attempt = 1; attempt <= 60; attempt++) {
        const obtainedTransaction = await this.ethersProvider.getTransaction(
          txHash,
        );

        if (obtainedTransaction) return right(obtainedTransaction);

        await delay(10 * 1000);
      }

      throw new Error();
    } catch {
      return left(new WaitTransactionError());
    }
  }
  // async transfer({
  //   amount,
  //   recipient,
  // }: TransferFromDTO): Promise<TransferFromResponse> {
  //   try {
  //     const transaction = await this.signedContract.transfer(
  //       recipient,
  //       this.web3.utils.toWei(String(amount)),
  //     );

  //     await transaction.wait();

  //     return right(null);
  //   } catch (error) {
  //     console.log({ error });
  //     return left(new MakeTxError());
  //   }
  // }
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

    const waitTransactionResult = await this.waitTransaction(txHash);
    const waitTransactionReceiptResult = await this.waitTransactionReceipt(
      txHash,
    );

    if (waitTransactionResult.isLeft()) {
      const error = waitTransactionResult.value;

      return left(error);
    }
    if (waitTransactionReceiptResult.isLeft()) {
      const error = waitTransactionReceiptResult.value;

      return left(error);
    }
    const transaction = waitTransactionResult.value;
    const transactionReceipt = waitTransactionReceiptResult.value;

    console.log({ transaction });
    console.log({ transactionReceipt });

    // const contract = new ethersProvider.Contract(
    //   cryptos[crypto],
    //   abis[crypto],
    //   this.ethersProvider,
    // );

    // const eventFilter = contract.filters.Transfer(walletFrom);
    // console.log({ eventFilter });

    // this.ethersProvider.on(eventFilter, log => {
    //   console.log('filter', log);
    // });

    await transaction.wait();

    if (amount) {
      const amountToWei = this.web3.utils.toWei(String(amount));

      if (crypto === SaleCrypto.BNB && !transaction.value.eq(amountToWei)) {
        return left(new InvalidAmountError());
      }
    }

    const transactionTo = transaction.to?.toLowerCase();

    if (!transactionTo) {
      return left(new InvalidTransactionToError());
    }

    let txCrypto: Maybe<SaleCrypto> = null;

    if (transactionReceipt.logs.length === 0 && crypto === SaleCrypto.BNB) {
      txCrypto = SaleCrypto.BNB;
    } else {
      const log = transactionReceipt.logs.find(
        findLog => findLog.transactionHash === txHash,
      );
      if (!log) {
        return left(new InvalidCryptoError());
      }

      console.log({ log });
      console.log({
        amount: BigNumber.from(log.data).toNumber() / 10 ** 18,
      });

      if (amount) {
        const cryptoAmount = BigNumber.from(log.data).toNumber() / 10 ** 18;

        if (amount !== cryptoAmount) {
          return left(new InvalidAmountError());
        }
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

    console.log({ txCrypto });

    const transactionFrom = transaction.from.toLowerCase();

    if (crypto !== SaleCrypto.BNB) {
      walletTo = cryptos[crypto].toLowerCase();
    }

    if (transactionTo !== walletTo) {
      return left(new AnotherTransactionRecipientError());
    }

    if (transactionFrom !== walletFrom) {
      return left(new AnotherTransactionSenderError());
    }

    return right({
      amount: Number(
        this.web3.utils.fromWei(transaction.value.toString(), 'ether'),
      ),
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

    const waitTransactionResult = await this.waitTransaction(txHash);

    if (waitTransactionResult.isLeft()) {
      const error = waitTransactionResult.value;

      return left(error);
    }

    const waitTransactionReceiptResult = await this.waitTransactionReceipt(
      txHash,
    );

    if (waitTransactionReceiptResult.isLeft()) {
      const error = waitTransactionReceiptResult.value;

      return left(error);
    }

    const transaction = waitTransactionResult.value;
    const transactionReceipt = waitTransactionReceiptResult.value;

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
      amount: Number(
        this.web3.utils.fromWei(transaction.value.toString(), 'ether'),
      ),
    });
  }
}
