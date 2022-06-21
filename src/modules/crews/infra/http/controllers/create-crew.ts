import { CreateCrewBusinessLogic } from '@modules/crews/core/business-logic/create-crew';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateCrewController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const playerId = request.player.id;

    const createCrewBusinessLogic = container.resolve(CreateCrewBusinessLogic);

    const crews = await createCrewBusinessLogic.execute({
      ...data,
      playerId: data.playerId || playerId,
    });

    return response.status(200).json(crews);
  }
}

const createCrewController = new CreateCrewController();

export { createCrewController };
