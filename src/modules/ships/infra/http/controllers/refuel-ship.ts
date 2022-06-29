import { RefuelShipRequestDTO } from '@modules/ships/dtos/refuel-ship-request';
import { RefuelShipBusinessLogic } from '@modules/ships/core/business-logic/refuel-ship';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RefuelShipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as RefuelShipRequestDTO;
    const playerId = request.player.id;

    const refuelShipBusinessLogic = container.resolve(RefuelShipBusinessLogic);

    const ship = await refuelShipBusinessLogic.execute({ ...data, playerId });

    return response.status(200).json(ship);
  }
}

const refuelShipController = new RefuelShipController();

export { refuelShipController };
