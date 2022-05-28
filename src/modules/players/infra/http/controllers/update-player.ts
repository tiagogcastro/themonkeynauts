import { UpdatePlayerBusinessLogic } from '@modules/players/core/business-logic/update-player';
import { instanceToInstance } from '@shared/infra/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdatePlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const player_id = request.player.id;

    const {
      nickname,
      new_password,
      new_password_confirmation,
      old_password,
      role,
    } = request.body;

    const updatePlayerBusinessLogic = container.resolve(
      UpdatePlayerBusinessLogic,
    );

    const { player } = await updatePlayerBusinessLogic.execute({
      player_id,
      nickname,
      new_password,
      new_password_confirmation,
      old_password,
      role,
    });

    return response.status(200).json({
      player: instanceToInstance('player', player),
    });
  }
}

const updatePlayerController = new UpdatePlayerController();

export { updatePlayerController };
