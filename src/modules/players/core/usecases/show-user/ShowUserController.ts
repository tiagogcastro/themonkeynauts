import { Request, Response } from 'express';
import { instanceToInstance } from '../../../../shared/helpers/instanceToInstance';
import { ShowPlayerBusinessLogic } from './ShowPlayerBusinessLogic'

class ShowPlayerController {
    constructor(private showPlayerBusinessLogic: ShowPlayerBusinessLogic) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { nickname } = request.query;
    const player_id = request.player.id;

    const { player } = await this.showPlayerBusinessLogic.execute({
        ...(
            nickname ? {
                nickname: nickname as string,
            } : {
                player_id
            }
        )
    });

    return response.status(200).json({
        player: instanceToInstance('player', player)
    });
  }
}

export { ShowPlayerController };
