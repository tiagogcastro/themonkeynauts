import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { ShipClass } from '@modules/ships/domain/enums/ship-class';
import { ShipRank } from '@modules/ships/domain/enums/ship-rank';
import { CreateShipRequestDTO } from '@modules/ships/dtos/create-ship-request';
import { AppError } from '@shared/errors/app-error';
import { generateSpaceName, rarity } from '@shared/helpers';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class CreateShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute({
    player_id,
    name,
    class: _class,
    rank,
    bonus_value,
    bonus_description,
    tank_capacity,
    crew_capacity,
    crew,
    fuel,
    breed_count,
    on_sale,
  }: CreateShipRequestDTO): Promise<IShip> {
    const player = await this.playersRepository.findById(player_id);

    if (!player) {
      throw new AppError(
        'Could not create the ship because the player you entered to associate the ship does not exist',
        400,
      );
    }

    const percentage = 100 / 3;

    const generatedClass = await rarity<Record<Lowercase<ShipClass>, number>>({
      explorer: percentage,
      miner: percentage,
      fighter: percentage,
    });

    const generatedRank = await rarity<Record<Lowercase<ShipRank>, number>>({
      a: percentage,
      b: percentage,
      s: percentage,
    });

    const gereratedSpaceName = await generateSpaceName();

    const generatedTankCapacity = {
      B: 200,
      A: 300,
      S: 400,
    }[generatedRank];

    const crewCapacitySchema: Record<ShipRank, number> = {
      B: 2,
      A: 3,
      S: 4,
    };

    const bonusValueSchema: Record<ShipClass, Record<ShipRank, number>> = {
      FIGHTER: {
        A: 30,
        B: 60,
        S: 100,
      },
      MINER: {
        A: 15,
        B: 30,
        S: 50,
      },
      EXPLORER: {
        A: 15,
        B: 30,
        S: 50,
      },
    };

    const generatedBonusDescription = {
      FIGHTER: 'Bounty Hunt Damage',
      MINER: 'Mining Success Rate',
      EXPLORER: 'Mission Time',
    }[generatedClass];

    const generatedCrewCapacity = crewCapacitySchema[generatedRank];
    const generatedBonusValue = bonusValueSchema[generatedClass][generatedRank];

    const { ship } = new Ship({
      ownerId: player_id,
      playerId: player_id,
      name: name || gereratedSpaceName,
      class: _class || generatedClass,
      rank: rank || generatedRank,
      bonusValue: bonus_value || generatedBonusValue,
      bonusDescription: bonus_description || generatedBonusDescription,
      tankCapacity: tank_capacity || generatedTankCapacity,
      crewCapacity: crew_capacity || generatedCrewCapacity,
      crew: crew || 0,
      fuel: fuel || generatedTankCapacity,
      avatar: null,
      breedCount: breed_count || 0,
      onSale: on_sale || false,
    });

    await this.shipsRepository.create(ship);

    return ship;
  }
}

export { CreateShipBusinessLogic };
