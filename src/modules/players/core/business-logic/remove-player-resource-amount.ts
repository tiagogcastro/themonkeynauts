import { IPlayer } from '@modules/players/domain/entities/player';
import {
  IResource,
  ResourceItems,
  Resource,
} from '@modules/players/domain/entities/resource';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/core/logic/maybe';
import { inject, injectable } from 'tsyringe';

type RemovePlayerResourceAmountRequestDTO = {
  nickname?: string;
  playerId: string;

  resources: Partial<ResourceItems>;
};

type Response = {
  player: IPlayer;
  resource: Maybe<IResource>;
};

@injectable()
class RemovePlayerResourceAmountBusinessLogic {
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
  }: RemovePlayerResourceAmountRequestDTO): Promise<Response> {
    function getResource(resource: IResource) {
      const playerResources = {
        copper: resource.copper,
        gold: resource.gold,
        iron: resource.iron,
        science: resource.science,
        scrap: resource.scrap,
        spc: resource.spc,
      };

      const resourcesReducer = Object.entries(resources).reduce(
        (previous, data) => {
          const [key, requestResourceValue] = data;

          const playerResourceValue =
            playerResources[key as keyof ResourceItems];

          if (requestResourceValue <= 0) {
            throw new AppError(
              `Cannot remove ${requestResourceValue} from ${key} resource`,
            );
          }

          if (
            requestResourceValue &&
            playerResourceValue < requestResourceValue
          ) {
            throw new AppError(
              `You have ${playerResourceValue} ${key}. Cannot remove ${requestResourceValue} ${key}`,
            );
          }

          const values = {
            [key]: playerResourceValue - requestResourceValue,
          };

          return {
            ...previous,
            ...values,
          };
        },
        {} as ResourceItems,
      );

      const { resource: resourcesUpdated } = new Resource(
        {
          ...resource,
          ...resourcesReducer,
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

      const resourcesUpdated = getResource(resource);

      await this.resourcesRepository.save(resourcesUpdated);

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

    const resourcesUpdated = getResource(resource);

    await this.resourcesRepository.save(resourcesUpdated);

    return {
      player,
      resource: resourcesUpdated,
    };
  }
}

export { RemovePlayerResourceAmountBusinessLogic };
