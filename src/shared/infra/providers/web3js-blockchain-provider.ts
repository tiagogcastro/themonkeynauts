import { Transaction } from '@modules/logs/domain/entities/transaction';
import { ITransactionsRepository } from '@modules/logs/domain/repositories/transactions-repository';
import {
  ConfirmTransactionDTO,
  IBlockchainProvider,
} from '@shared/domain/providers/blockchain-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import Web3 from 'web3';
import { ethToWei } from '../helpers/eth-to-wei';

@injectable()
export class Web3jsBlockchainProvider implements IBlockchainProvider {
  private web3: Web3;

  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        process.env.BLOCKCHAIN_PROVIDER_URL || 'http://localhost:8545',
      ),
    );
  }

  async confirmTransaction({
    tx_hash,
    amount,
    from,
  }: ConfirmTransactionDTO): Promise<boolean> {
    const checkIfTheTransactionHasAlreadyBeenCarriedOut =
      await this.transactionsRepository.findByTxHash(tx_hash);

    if (checkIfTheTransactionHasAlreadyBeenCarriedOut) {
      throw new AppError('This transaction has already been carried out', 400);
    }

    try {
      const transaction = await this.web3.eth.getTransaction(tx_hash);

      if (!ethToWei(amount).equals(transaction.value)) {
        throw new AppError(
          'The transaction value is not the same as the one sent',
          400,
        );
      }

      const currentBlock = await this.web3.eth.getBlockNumber();

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

      if (!transaction.blockNumber) {
        throw new AppError('The transaction does not have a block number', 400);
      }

      if (currentBlock - transaction.blockNumber < 10) {
        throw new AppError('The transaction is not mined yet', 400);
      }

      const { transaction: _transaction } = new Transaction({
        txHash: transaction.hash,
        wallet: transaction.from,
      });

      await this.transactionsRepository.create(_transaction);

      return true;
    } catch {
      throw new AppError('The transaction could not be confirmed', 400);
    }
  }
}
