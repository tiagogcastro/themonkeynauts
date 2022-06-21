import { Request, Response } from 'express';

import { instanceToInstance } from '@shared/helpers/instance-to-instance';

import { container } from 'tsyringe';
import { RemovePlayerResourceAmountBusinessLogic } from '@modules/players/core/business-logic/remove-player-resource-amount';
import { IResource } from '@modules/players/domain/entities/resource';

type RequestQuery = {
  playerId: string;
  nickname: string;
};

type RequestBody = {
  resources: IResource;
};

class RemovePlayerResourceAmountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { resources } = request.body as RequestBody;

    const { playerId, nickname } = request.query as unknown as RequestQuery;
    const playerLoggedId = request.player.id;

    const removePlayerResourceAmountBusinessLogic = container.resolve(
      RemovePlayerResourceAmountBusinessLogic,
    );

    const { player, resource } =
      await removePlayerResourceAmountBusinessLogic.execute({
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

const removePlayerResourceAmountController =
  new RemovePlayerResourceAmountController();

export { removePlayerResourceAmountController };
