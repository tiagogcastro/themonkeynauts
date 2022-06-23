import { UpdatePlayerBusinessLogic } from '@modules/players/core/business-logic/update-player';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdatePlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const playerId = request.player.id;

    const {
      nickname,
      newPassword,
      newPasswordConfirmation,
      oldPassword,
      role,
    } = request.body;

    const updatePlayerBusinessLogic = container.resolve(
      UpdatePlayerBusinessLogic,
    );

    const { player } = await updatePlayerBusinessLogic.execute({
      playerId,
      nickname,
      newPassword,
      newPasswordConfirmation,
      oldPassword,
      role,
    });

    return response.status(200).json({
      player: instanceToInstance('player', player),
    });
  }
}

const updatePlayerController = new UpdatePlayerController();

export { updatePlayerController };
