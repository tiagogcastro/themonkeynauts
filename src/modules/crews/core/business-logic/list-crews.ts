import { IMonkeynaut } from '@modules/monkeynauts/domain/entities/monkeynaut';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { IShip } from '@modules/ships/domain/entities/ship';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/core/logic/maybe';
import { inject, injectable } from 'tsyringe';
import { Either, right } from '@shared/core/logic/either';
import { ICrewsRepository } from '../../domain/repositories/crews-repositories';

export type ListCrewsRequestDTO = {
  monkeynautId: string;
  shipId: string;
};

type ListCrewsResponse = Either<
  Error,
  {
    crews: IShip | Maybe<IMonkeynaut>[];
  }
>;

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
  }: ListCrewsRequestDTO): Promise<ListCrewsResponse> {
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

      const foundShip = await this.shipsRepository.findById(crew.shipId, true);

      if (!foundShip) {
        throw new AppError('Ship does not exist', 404);
      }

      return right({
        crews: foundShip,
      });
    }

    if (shipId) {
      const foundShip = await this.shipsRepository.findById(shipId, true);

      if (!foundShip) {
        throw new AppError('Ship does not exist', 404);
      }

      const crews = await this.crewsRepository.findManyByShipId(shipId);

      const monkeynauts = await this.monkeynautsRepository.findManyByCrews(
        crews,
      );

      return right({
        crews: monkeynauts,
      });
    }

    throw new AppError('shipId or monkeynautId parameter not informed', 403);
  }
}

export { ListCrewsBusinessLogic };
