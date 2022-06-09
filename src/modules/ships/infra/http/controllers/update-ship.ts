import { UpdateShipBusinessLogic } from '@modules/ships/core/business-logic/update-ship';
import { UpdateShipRequestDTO } from '@modules/ships/dtos/update-ship-request';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateShipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as UpdateShipRequestDTO;

    const updateShipBusinessLogic = container.resolve(UpdateShipBusinessLogic);

    const ship = await updateShipBusinessLogic.execute(data);

    return response.status(200).json(ship);
  }
}

const updateShipController = new UpdateShipController();

export { updateShipController };
