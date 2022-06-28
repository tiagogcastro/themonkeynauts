import {
  ChangeActivePlayerShipBusinessLogic,
  ChangeActivePlayerShipDTO,
} from '@modules/ships/core/business-logic/change-active-player-ship';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ChangeActivePlayerShipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ChangeActivePlayerShipDTO;
    const playerId = request.player.id;

    const changeActivePlayerShipBusinessLogic = container.resolve(
      ChangeActivePlayerShipBusinessLogic,
    );

    const { player, shipActive } =
      await changeActivePlayerShipBusinessLogic.execute({
        ...data,
        playerId,
      });

    return response.status(200).json({
      player: instanceToInstance('player', player),
      shipActive,
    });
  }
}

const changeActivePlayerShipController = new ChangeActivePlayerShipController();

export { changeActivePlayerShipController };
