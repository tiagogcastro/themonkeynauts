/* eslint-disable no-await-in-loop */
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { SaleCrypto } from '@modules/sales/domain/enums/sale-crypto';
import { Either, left, right } from '@shared/core/logic/either';
import {
  ConfirmTransactionDTO,
  ConfirmTransactionResponse,
  ConfirmTransactionWithTxhashOnlyResponse,
  IBlockchainProvider,
  SendTransactionDTO,
  SendTransactionResponse,
  TransferFromDTO,
  TransferFromResponse,
  WaitTransactionErrors,
  WaitTxReceiptErrors,
} from '@shared/domain/providers/blockchain-provider';
import { delay } from '@shared/helpers/delay';
import { ethers } from 'ethers';
import { inject, injectable } from 'tsyringe';
import Web3 from 'web3';
import { SignedTransaction } from 'web3-core';
import { AnotherPlayerWalletError } from './errors/another-player-wallet-error';
import { AnotherTransactionRecipientError } from './errors/another-transaction-recipient-error';
import { AnotherTransactionSenderError } from './errors/another-transaction-sender-error';
import { GenerateTxSignatureError } from './errors/generate-tx-signature-error';
import { InvalidAmountError } from './errors/invalid-amount-error';
import { InvalidPrivateKeyError } from './errors/invalid-private-key-error';
import { InvalidTransactionFromError } from './errors/invalid-transaction-from-error';
import { InvalidTransactionToError } from './errors/invalid-transaction-to-error';
import { InvalidWalletError } from './errors/invalid-wallet-error';
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

const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: '_maxAccountAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_maxTxAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_minAmountToAutoSwap',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'accumulatedToSwapFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'author',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'decimalAmount', type: 'uint256' },
    ],
    name: 'buyBackAndBurnWithDecimals',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'decimalAmount', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
    ],
    name: 'buyBackAndHoldWithDecimals',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'developingWallet',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'enableToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeDevelopingWallet',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeLiquidityWallet',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeMarketingWallet',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeRewardWallet',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFeeTotal',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'isSender', type: 'bool' },
    ],
    name: 'getSpecialWalletFee',
    outputs: [
      { internalType: 'uint256', name: 'marketingFee', type: 'uint256' },
      { internalType: 'uint256', name: 'developingFee', type: 'uint256' },
      { internalType: 'uint256', name: 'liquidityFee', type: 'uint256' },
      { internalType: 'uint256', name: 'rewardFee', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'wallet', type: 'address' },
      { internalType: 'uint8', name: 'typeIndex', type: 'uint8' },
    ],
    name: 'hasPermission',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'isExemptAmountLimit',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'isExemptFee',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'isExemptFeeReceiver',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'isExemptOperatePausedToken',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'isExemptSwapMaker',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'isExemptTxLimit',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'isSpecialFeeWallet',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'isSpecialFeeWalletReceiver',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidityPool',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidityWallet',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'marketingWallet',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'wallet', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        internalType: 'struct MonkeynautsToken.Receivers[]',
        name: 'users',
        type: 'tuple[]',
      },
    ],
    name: 'multiTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pausedSwapFee',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardWallet',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'safeApprove',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'safeTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'safeWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'setDevelopingWallet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'operation', type: 'bool' },
    ],
    name: 'setExemptAmountLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'operation', type: 'bool' },
    ],
    name: 'setExemptFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'operation', type: 'bool' },
    ],
    name: 'setExemptFeeReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'operation', type: 'bool' },
    ],
    name: 'setExemptOperatePausedToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'operation', type: 'bool' },
    ],
    name: 'setExemptSwapMaker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'operation', type: 'bool' },
    ],
    name: 'setExemptTxLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'marketing', type: 'uint256' },
      { internalType: 'uint256', name: 'developing', type: 'uint256' },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      { internalType: 'uint256', name: 'reward', type: 'uint256' },
    ],
    name: 'setFeesOperational',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newPair', type: 'address' }],
    name: 'setLiquidityPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'setLiquidityWallet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'setMarketingWallet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'maxAccountAmount', type: 'uint256' },
    ],
    name: 'setMaxAccountAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxTxAmount', type: 'uint256' }],
    name: 'setMaxTxAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'setMinAmountToAutoSwap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: 'state', type: 'bool' }],
    name: 'setPausedSwapFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'wallet', type: 'address' },
      { internalType: 'uint8', name: 'typeIndex', type: 'uint8' },
      { internalType: 'bool', name: 'state', type: 'bool' },
    ],
    name: 'setPermission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'setRewardWallet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'operation', type: 'bool' },
    ],
    name: 'setSpecialFeeWallet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'operation', type: 'bool' },
    ],
    name: 'setSpecialFeeWalletReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bool', name: 'isSender', type: 'bool' },
      { internalType: 'uint256', name: 'marketing', type: 'uint256' },
      { internalType: 'uint256', name: 'developing', type: 'uint256' },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      { internalType: 'uint256', name: 'reward', type: 'uint256' },
    ],
    name: 'setSpecialWalletFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'setSwapFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'specialFeesByWallet',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'specialFeesByWalletReceiver',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'swapHelperAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'url',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
@injectable()
export class Web3jsBlockchainProvider implements IBlockchainProvider {
  private web3: Web3;

  private ethers: ethers.providers.JsonRpcProvider;

  private signedContract: ethers.Contract;

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
      const signer = new ethers.Wallet(
        process.env.SALES_PRIVATE_KEY as string,
        provider,
      );

      const contract = new ethers.Contract(
        process.env.SMART_CONTRACT,
        abi,
        provider,
      );

      const signedContract = contract.connect(signer);

      this.signedContract = signedContract;
      this.ethers = provider;
    }
  }

  async transfer({
    amount,
    recipient,
  }: TransferFromDTO): Promise<TransferFromResponse> {
    try {
      const transaction = await this.signedContract.transfer(
        recipient,
        this.web3.utils.toWei(String(amount)),
      );

      await transaction.wait();

      return right(null);
    } catch (error) {
      console.log({ error });
      return left(new MakeTxError());
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
          await this.ethers.getTransactionReceipt(txHash);

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
        const obtainedTransaction = await this.ethers.getTransaction(txHash);

        if (obtainedTransaction) return right(obtainedTransaction);

        await delay(10 * 1000);
      }

      throw new Error();
    } catch {
      return left(new WaitTransactionError());
    }
  }

  async confirmTransaction({
    txHash,
    amount,
    playerId,
    crypto = SaleCrypto.BNB,
    to,
    from,
  }: ConfirmTransactionDTO): Promise<ConfirmTransactionResponse> {
    const checkIfTheTransactionHasAlreadyBeenCarriedOut =
      await this.logsRepository.findByTxHash(txHash);

    if (checkIfTheTransactionHasAlreadyBeenCarriedOut) {
      return left(new TransactionCarriedOutError());
    }

    const walletFrom = (from || process.env.SALES_WALLET)?.toLowerCase();
    let walletTo = (to || process.env.SALES_WALLET)?.toLowerCase();

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

    const waitTransactionResult = await this.waitTransaction(txHash);

    if (waitTransactionResult.isLeft()) {
      const error = waitTransactionResult.value;

      return left(error);
    }
    const transaction = waitTransactionResult.value;

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

    const transactionFrom = transaction.from.toLowerCase();

    if (crypto !== SaleCrypto.BNB) {
      const cryptos: Record<SaleCrypto, string> = {
        BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        SPC: process.env.SMART_CONTRACT as string,
      };

      walletTo = cryptos[crypto].toLowerCase();
    }

    console.log({ transactionTo, walletTo });
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
