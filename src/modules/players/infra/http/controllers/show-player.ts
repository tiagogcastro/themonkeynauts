import { ShowPlayerBusinessLogic } from '@modules/players/core/business-logic/show-player';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type RequestQuery = {
  nickname: string;
  playerId: string;
};

class ShowPlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nickname, playerId } = request.query as unknown as RequestQuery;
    const playerLoggedId = request.player.id;

    const showPlayerBusinessLogic = container.resolve(ShowPlayerBusinessLogic);

    const { player, resource } = await showPlayerBusinessLogic.execute({
      nickname,
      playerId: playerId || playerLoggedId,
    });

    return response.status(200).json({
      player: instanceToInstance('player', player),
      resource,
    });
  }
}

const showPlayerController = new ShowPlayerController();

export { showPlayerController };
