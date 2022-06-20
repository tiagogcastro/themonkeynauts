import { RemoveMonkeynautFromCrewBusinessLogic } from '@modules/crews/core/business-logic/remove-monkeynaut-from-crew';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type RequestQuery = {
  monkeynautId: string;
  playerId: string;
};

class RemoveMonkeynautFromCrewCrewController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.query as unknown as RequestQuery;
    const playerId = request.player.id;

    const removeMonkeynautFromCrewBusinessLogic = container.resolve(
      RemoveMonkeynautFromCrewBusinessLogic,
    );

    await removeMonkeynautFromCrewBusinessLogic.execute({
      ...data,
      playerId: data.playerId || playerId,
    });

    return response.status(200).json({
      statusCode: 200,
      success: 'Monkeynaut was successfully removed from crew',
    });
  }
}

const removeMonkeynautFromCrewController =
  new RemoveMonkeynautFromCrewCrewController();

export { removeMonkeynautFromCrewController };
