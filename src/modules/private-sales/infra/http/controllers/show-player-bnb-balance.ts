import { ShowPlayerBNBBalanceBusinessLogic } from '@modules/private-sales/core/business-logic/show-player-bnb-balance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowPlayerBNBBalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const playerId = request.player.id;

    const showPlayerBNBBalanceBusinessLogic = container.resolve(
      ShowPlayerBNBBalanceBusinessLogic,
    );

    const balance = await showPlayerBNBBalanceBusinessLogic.execute(playerId);

    return response.status(200).json(balance);
  }
}

const showPlayerBNBBalanceController = new ShowPlayerBNBBalanceController();

export { showPlayerBNBBalanceController };
