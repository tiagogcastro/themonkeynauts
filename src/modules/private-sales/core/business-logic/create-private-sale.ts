import { balanceConfig } from '@config/balance';
import {
  IPrivateSale,
  PrivateSale,
} from '@modules/private-sales/domain/entities/private-sale';
import { CreatePrivateSaleRequestDTO } from '@modules/private-sales/dtos/create-private-sale-request';
import { IBlockchainProvider } from '@shared/domain/providers/blockchain-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IPrivateSalesRepository } from '../../domain/repositories/private-sales-repositories';

type CreatePreSaleResponse = {
  private_sale: IPrivateSale;
};

@injectable()
class CreatePrivateSaleBusinessLogic {
  constructor(
    @inject('PrivateSalesRepository')
    private privateSalesRepository: IPrivateSalesRepository,

    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,
  ) {}

  async execute({
    player_id: playerId,
    tx_hash: txHash,
    bnb_amount: bnbAmount,
    wallet,
  }: CreatePrivateSaleRequestDTO): Promise<CreatePreSaleResponse> {
    const { privateSale } = new PrivateSale({
      playerId,
      txHash,
      bnbAmount,
      wallet,
    });

    const privateSales =
      await this.privateSalesRepository.listAllPrivateSalesFromPlayer(playerId);

    const bnbAmountLimit = balanceConfig.bnb_amount_max;

    const bnbAmountTotal = privateSales.reduce(
      (accumulator, currentPrivateSale) =>
        accumulator + currentPrivateSale.bnbAmount,
      0,
    );

    if (bnbAmountTotal + bnbAmount > bnbAmountLimit) {
      throw new AppError(
        `The player has reached the limit of ${bnbAmountLimit} BNB`,
        400,
      );
    }

    await this.blockchainProvider.confirmTransaction({
      amount: bnbAmount,
      from: wallet,
      tx_hash: txHash,
    });

    await this.privateSalesRepository.create(privateSale);

    return {
      private_sale: privateSale,
    };
  }
}

export { CreatePrivateSaleBusinessLogic };
