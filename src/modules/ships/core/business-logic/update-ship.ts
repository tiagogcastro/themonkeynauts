import { inject, injectable } from 'tsyringe';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { CommonShipRequestDTO } from '@modules/ships/dtos/commons-ships-props';
import { Either, right } from '@shared/core/logic/either';
import { AppError } from '@shared/errors/app-error';
import { updateProps } from '@shared/helpers/update-props';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

export type UpdateShipRequestDTO = CommonShipRequestDTO & {
  shipId: string;
};

export type CreateShipResponse = Either<
  Error,
  {
    ship: IShip;
  }
>;

@injectable()
class UpdateShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute(data: UpdateShipRequestDTO): Promise<CreateShipResponse> {
    const { shipId, ...props } = data;

    const ship = await this.shipsRepository.findById(shipId);

    if (props.playerId) {
      const player = await this.playersRepository.findById(props.playerId);

      if (!player) {
        throw new AppError('Player does not exist');
      }
    }

    if (props.ownerId) {
      const owner = await this.playersRepository.findById(props.ownerId);

      if (!owner) {
        throw new AppError('Owner does not exist');
      }
    }

    if (!ship) {
      throw new AppError(
        'Could not update the ship because the ship you entered to update does not exist',
        400,
      );
    }

    const updateData = updateProps(props);

    const { ship: updatedShip } = new Ship(
      {
        ...ship,
        ...updateData,
      },
      {
        id: ship.id,
        createdAt: ship.createdAt,
        updatedAt: new Date(),
      },
    );

    return right({
      ship: updatedShip,
    });
  }
}

export { UpdateShipBusinessLogic };
