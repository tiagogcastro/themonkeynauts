import { ListCrewsBusinessLogic } from '@modules/crews/core/business-logic/list-crews';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListCrewsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { monkeynautId, shipId } = request.query;

    const listCrewsBusinessLogic = container.resolve(ListCrewsBusinessLogic);

    const crews = await listCrewsBusinessLogic.execute({
      monkeynautId: monkeynautId as string,
      shipId: shipId as string,
    });

    return response.status(200).json(crews);
  }
}

const listCrewsController = new ListCrewsController();

export { listCrewsController };
