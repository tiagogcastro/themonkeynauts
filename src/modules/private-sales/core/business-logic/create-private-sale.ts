import { inject, injectable } from 'tsyringe';

import { IPrivateSale, PrivateSale } from '@modules/private-sales/domain/entities/private-sale';
import { CreatePrivateSaleRequestDTO } from '@modules/private-sales/dtos/create-private-sale-request';

// import { IBlockchainProvider } from '@shared/domain/providers/blockchain-provider';

import { IPrivateSaleRepository } from '../../domain/repositories/private-sales-repositories';

type CreatePreSaleResponse = {
  privateSale: IPrivateSale;
}

@injectable()
class CreatePrivateSaleBusinessLogic {
  constructor(
    @inject('PrivateSaleRepository')
    private privateSaleRepository: IPrivateSaleRepository,

    // @inject('BlockchainProvider')
    // private blockchainProvider: IBlockchainProvider,
  ) {}

  async execute({
    player_id: playerId,
    ...data
  }: CreatePrivateSaleRequestDTO): Promise<CreatePreSaleResponse> {
    const { privateSale } = new PrivateSale({
      playerId,
      ...data
    });

    await this.privateSaleRepository.create(privateSale);

    return {
      privateSale
    };
  }
}

export { CreatePrivateSaleBusinessLogic };
