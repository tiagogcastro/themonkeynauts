import { RefuelShipRequestDTO } from '@modules/monkeynauts/dtos/refuel-ship-request';
import { RefuelShipBusinessLogic } from '@modules/ships/core/business-logic/refuel-ship';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RefuelShipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as RefuelShipRequestDTO;

    const refuelShipBusinessLogic = container.resolve(RefuelShipBusinessLogic);

    const ship = await refuelShipBusinessLogic.execute(data);

    return response.status(200).json(ship);
  }
}

const refuelShipController = new RefuelShipController();

export { refuelShipController };
