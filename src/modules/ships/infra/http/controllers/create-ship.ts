import { CreateShipBusinessLogic } from '@modules/ships/core/business-logic/create-ship';
import { CreateShipRequestDTO } from '@modules/ships/dtos/create-ship-request';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateShipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as CreateShipRequestDTO;

    const createShipBusinessLogic = container.resolve(CreateShipBusinessLogic);

    const ships = await createShipBusinessLogic.execute(data);

    return response.status(200).json(ships);
  }
}

const createShipController = new CreateShipController();

export { createShipController };
