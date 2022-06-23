import {
  ChangeActivePlayerShipBusinessLogic,
  ChangeActivePlayerShipDTO,
} from '@modules/ships/core/business-logic/change-active-player-ship';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ChangeActivePlayerShipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ChangeActivePlayerShipDTO;

    const changeActivePlayerShipBusinessLogic = container.resolve(
      ChangeActivePlayerShipBusinessLogic,
    );

    const ship = await changeActivePlayerShipBusinessLogic.execute(data);

    return response.status(200).json(ship);
  }
}

const changeActivePlayerShipController = new ChangeActivePlayerShipController();

export { changeActivePlayerShipController };
