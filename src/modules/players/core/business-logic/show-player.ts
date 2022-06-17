import { IPlayer } from '@modules/players/domain/entities/player';
import { IResource } from '@modules/players/domain/entities/resource';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/maybe';
import { inject, injectable } from 'tsyringe';

type ShowPlayerRequestDTO = {
  nickname?: string;
  player_id?: string;
};

type Response = {
  player: IPlayer;
  resource: Maybe<IResource>;
};

@injectable()
class ShowPlayerBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,
  ) {}

  async execute({
    nickname,
    player_id: playerId,
  }: ShowPlayerRequestDTO): Promise<Response> {
    if (playerId) {
      const player = await this.playersRepository.findById(playerId);

      if (!player) {
        throw new AppError('Could not show player', 401);
      }

      const resource = await this.resourcesRepository.findByPlayerId(playerId);

      return {
        player,
        resource,
      };
    }

    const player = await this.playersRepository.findByNickname(
      nickname as string,
    );

    if (!player) {
      throw new AppError('Could not show player', 401);
    }

    const resource = await this.resourcesRepository.findByPlayerId(player.id);

    return {
      player,
      resource,
    };
  }
}

export { ShowPlayerBusinessLogic };
