import { ListUniqueShipBusinessLogic } from '@modules/ships/core/business-logic/list-unique-ship';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

type RequestQuery = {
  shipId: string;
  playerId: string;
};

class ListUniqueShipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playerId, shipId } = request.query as unknown as RequestQuery;
    const playerLoggedId = request.player.id;

    const listUniqueShipBusinessLogic = container.resolve(
      ListUniqueShipBusinessLogic,
    );

    const { ship, player } = await listUniqueShipBusinessLogic.execute({
      playerId: playerId || playerLoggedId,
      shipId,
    });

    return response.status(200).json({
      ship,
      player,
    });
  }
}

const listUniqueShipController = new ListUniqueShipController();

export { listUniqueShipController };
