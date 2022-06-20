import { IPlayer } from '@modules/players/domain/entities/player';
import { IResource, Resource } from '@modules/players/domain/entities/resource';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/maybe';
import { inject, injectable } from 'tsyringe';

type UpdatePlayerResourceRequestDTO = {
  nickname?: string;
  playerId: string;

  resources: Partial<IResource>;
};

type Response = {
  player: IPlayer;
  resource: Maybe<IResource>;
};

@injectable()
class UpdatePlayerResourceBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,
  ) {}

  async execute({
    nickname,
    playerId,
    resources,
  }: UpdatePlayerResourceRequestDTO): Promise<Response> {
    function getResrouce(resource: IResource) {
      const { resource: resourcesUpdated } = new Resource(
        {
          ...resource,
          copper: resources?.copper ?? resource.copper,
          gold: resources?.gold ?? resource.gold,
          iron: resources?.iron ?? resource.iron,
          science: resources?.science ?? resource.science,
          scrap: resources?.scrap ?? resource.scrap,
          spc: resources?.spc ?? resource.spc,
        },
        {
          createdAt: resource?.createdAt,
          id: resource?.id,
          updatedAt: new Date(),
        },
      );

      return resourcesUpdated;
    }

    if (nickname) {
      const player = await this.playersRepository.findByNickname(
        nickname as string,
      );

      if (!player) {
        throw new AppError('Could not show player', 401);
      }

      const resource = await this.resourcesRepository.findByPlayerId(player.id);

      if (!resource) {
        throw new AppError('Player resource not found', 404);
      }

      const resourcesUpdated = getResrouce(resource);

      return {
        player,
        resource: resourcesUpdated,
      };
    }

    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      throw new AppError('Could not show player', 401);
    }

    const resource = await this.resourcesRepository.findByPlayerId(player.id);

    if (!resource) {
      throw new AppError('Player resource not found', 404);
    }

    const resourcesUpdated = getResrouce(resource);

    return {
      player,
      resource: resourcesUpdated,
    };
  }
}

export { UpdatePlayerResourceBusinessLogic };
