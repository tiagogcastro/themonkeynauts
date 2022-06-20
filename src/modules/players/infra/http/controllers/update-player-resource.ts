import { Request, Response } from 'express';

import { instanceToInstance } from '@shared/helpers/instance-to-instance';

import { container } from 'tsyringe';
import { UpdatePlayerResourceBusinessLogic } from '@modules/players/core/business-logic/update-player-resource';
import { IResource } from '@modules/players/domain/entities/resource';

type RequestQuery = {
  playerId: string;
  nickname: string;
};

type RequestBody = {
  resources: IResource;
};

class UpdatePlayerResourceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { resources } = request.body as RequestBody;

    const { playerId, nickname } = request.query as unknown as RequestQuery;
    const playerLoggedId = request.player.id;

    const updatePlayerResourceBusinessLogic = container.resolve(
      UpdatePlayerResourceBusinessLogic,
    );

    const { player, resource } =
      await updatePlayerResourceBusinessLogic.execute({
        nickname,
        playerId: playerId || playerLoggedId,
        resources,
      });

    return response.status(201).json({
      player: instanceToInstance('player', player),
      resource,
    });
  }
}

const updatePlayerResourceController = new UpdatePlayerResourceController();

export { updatePlayerResourceController };
