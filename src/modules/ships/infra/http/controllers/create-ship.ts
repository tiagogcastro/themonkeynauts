import { CreateShipBusinessLogic } from '@modules/ships/core/business-logic/create-ship';
import { CreateShipRequestDTO } from '@modules/ships/dtos/create-ship-request';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateShipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as CreateShipRequestDTO;

    const createShipBusinessLogic = container.resolve(CreateShipBusinessLogic);

    const ship = await createShipBusinessLogic.execute(data);

    return response.status(201).json(ship);
  }
}

const createShipController = new CreateShipController();

export { createShipController };
