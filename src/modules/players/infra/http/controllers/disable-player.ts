import { DisablePlayerBusinessLogic } from '@modules/players/core/business-logic/disable-player';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DisablePlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { player_id } = request.body;

    const disablePlayerBusinessLogic = container.resolve(
      DisablePlayerBusinessLogic,
    );

    await disablePlayerBusinessLogic.execute(player_id);

    return response.status(204).json();
  }
}

const disablePlayerController = new DisablePlayerController();

export { disablePlayerController };
