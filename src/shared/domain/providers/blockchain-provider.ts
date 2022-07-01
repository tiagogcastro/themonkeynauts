import { Either } from '@shared/core/logic/either';
import { AnotherPlayerWalletError } from '@shared/infra/providers/errors/another-player-wallet-error';
import { AnotherTransactionRecipientError } from '@shared/infra/providers/errors/another-transaction-recipient-error';
import { AnotherTransactionSenderError } from '@shared/infra/providers/errors/another-transaction-sender-error';
import { GenerateTxSignatureError } from '@shared/infra/providers/errors/generate-tx-signature-error';
import { InvalidAmountError } from '@shared/infra/providers/errors/invalid-amount-error';
import { InvalidPrivateKeyError } from '@shared/infra/providers/errors/invalid-private-key-error';
import { InvalidTransactionFromError } from '@shared/infra/providers/errors/invalid-transaction-from-error';
import { InvalidTransactionToError } from '@shared/infra/providers/errors/invalid-transaction-to-error';
import { InvalidWalletError } from '@shared/infra/providers/errors/invalid-wallet-error';
import { MakeTxError } from '@shared/infra/providers/errors/make-tx-error';
import { TransactionCarriedOutError } from '@shared/infra/providers/errors/transaction-carried-out-error';
import { WaitTransactionError } from '@shared/infra/providers/errors/wait-transaction-error';
import { WaitTxReceiptError } from '@shared/infra/providers/errors/wait-tx-receipt-error';

type ConfirmTransactionDTO = {
  from?: string;
  to?: string;
  playerId: string;
  amount?: number;
  txHash: string;
};

type SendTransactionDTO = {
  from?: string;
  to?: string;
  privateKey?: string;
  contract?: string;
  amount: number;
};

export type ConfirmTransactionErrors =
  | AnotherTransactionSenderError
  | AnotherPlayerWalletError
  | AnotherTransactionRecipientError
  | AnotherTransactionSenderError
  | TransactionCarriedOutError
  | InvalidWalletError
  | InvalidAmountError
  | InvalidTransactionToError
  | InvalidPrivateKeyError
  | InvalidTransactionFromError
  | WaitTxReceiptError
  | WaitTransactionError;

export type SendTransactionErrors = GenerateTxSignatureError | MakeTxError;

export type ConfirmTransactionResponse = Either<
  ConfirmTransactionErrors,
  {
    amount: number;
  }
>;

export type SendTransactionResponse = Either<
  SendTransactionErrors,
  {
    transactionHash: string;
  }
>;

export type WaitTransactionErrors = WaitTransactionError;

export type WaitTxReceiptErrors = WaitTxReceiptError;

export type ConfirmTransactionWithTxhashOnlyResponse = Either<
  TransactionCarriedOutError | WaitTransactionErrors | WaitTxReceiptErrors,
  {
    walletFrom: string;
  }
>;
interface IBlockchainProvider {
  confirmTransaction(
    data: ConfirmTransactionDTO,
  ): Promise<ConfirmTransactionResponse>;
  confirmTransactionWithTxhashOnly(
    txHash: string,
  ): Promise<ConfirmTransactionWithTxhashOnlyResponse>;
  sendTransaction(data: SendTransactionDTO): Promise<SendTransactionResponse>;
}

export { IBlockchainProvider, ConfirmTransactionDTO, SendTransactionDTO };
