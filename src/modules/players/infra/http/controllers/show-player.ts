import { ShowPlayerBusinessLogic } from '@modules/players/core/business-logic/show-player';
import { instanceToInstance } from '@shared/infra/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowPlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nickname } = request.query;
    const player_id = request.player.id;

    const showPlayerBusinessLogic = container.resolve(ShowPlayerBusinessLogic);

    const { player } = await showPlayerBusinessLogic.execute({
      ...(nickname
        ? {
            nickname: nickname as string,
          }
        : {
            player_id,
          }),
    });

    return response.status(200).json({
      player: instanceToInstance('player', player),
    });
  }
}

const showPlayerController = new ShowPlayerController();

export { showPlayerController };
