import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ChangePlayerOwnerMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/change-player-owner-monkeynaut';
import { ChangePlayerOwnerMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/change-player-owner-monkeynaut-request';

class ChangePlayerOwnerMonkeynautController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_logged_id = request.player.id;

    const data = request.body as ChangePlayerOwnerMonkeynautRequestDTO;

    const { currentOwnerPlayerId } = data;

    const changePlayerOwnerMonkeynautBusinessLogic = container.resolve(
      ChangePlayerOwnerMonkeynautBusinessLogic,
    );

    const monkeynaut = await changePlayerOwnerMonkeynautBusinessLogic.execute({
      ...data,
      currentOwnerPlayerId: currentOwnerPlayerId || user_logged_id,
    });

    return response.status(200).json(monkeynaut);
  }
}

const changePlayerOwnerMonkeynautController =
  new ChangePlayerOwnerMonkeynautController();

export { changePlayerOwnerMonkeynautController };
