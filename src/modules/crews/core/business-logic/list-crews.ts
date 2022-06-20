import { IMonkeynaut } from '@modules/monkeynauts/domain/entities/monkeynaut';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { IShip } from '@modules/ships/domain/entities/ship';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/maybe';
import { inject, injectable } from 'tsyringe';
import { ICrewsRepository } from '../../domain/repositories/crews-repositories';

type ListCrewsRequest = {
  monkeynautId: string;
  shipId: string;
};

@injectable()
class ListCrewsBusinessLogic {
  constructor(
    @inject('CrewsRepository')
    private crewsRepository: ICrewsRepository,

    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,
  ) {}

  async execute({
    monkeynautId,
    shipId,
  }: ListCrewsRequest): Promise<IShip | Maybe<IMonkeynaut>[]> {
    if (monkeynautId) {
      const foundMonkeynaut = await this.monkeynautsRepository.findById(
        monkeynautId,
      );

      if (!foundMonkeynaut) {
        throw new AppError('Monkeynaut does not exist', 404);
      }

      const crew = await this.crewsRepository.findUniqueByMonkeynautId(
        monkeynautId,
      );

      if (!crew) {
        throw new AppError('Monkeynaut does not exist on a crew', 404);
      }

      const foundShip = await this.shipsRepository.findById(crew.shipId);

      if (!foundShip) {
        throw new AppError('Ship does not exist', 404);
      }

      return foundShip;
    }

    if (shipId) {
      const foundShip = await this.shipsRepository.findById(shipId);

      if (!foundShip) {
        throw new AppError('Ship does not exist', 404);
      }

      const crews = await this.crewsRepository.findManyByShipId(shipId);

      const monkeynauts = await this.monkeynautsRepository.findManyByCrews(
        crews,
      );

      return monkeynauts;
    }

    throw new AppError('shipId or monkeynautId parameter not informed', 403);
  }
}

export { ListCrewsBusinessLogic };
