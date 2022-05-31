import { ListShipsBusinessLogic } from '@modules/ships/core/business-logic/list-ships';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListShipsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { player_id } = request.query;

    const listShipsBusinessLogic = container.resolve(ListShipsBusinessLogic);

    const ships = await listShipsBusinessLogic.execute(player_id as string);

    return response.status(200).json(ships);
  }
}

const listShipsController = new ListShipsController();

export { listShipsController };
