import { BuySaleItemBusinessLogic } from '@modules/sales/core/business-logic/buy-sale-item';
import { BuySaleItemRequestDTO } from '@modules/sales/dtos/buy-sale-item-request';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class BuySaleItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as BuySaleItemRequestDTO;
    const playerId = request.player.id;

    const buySaleItemBusinessLogic = container.resolve(
      BuySaleItemBusinessLogic,
    );

    await buySaleItemBusinessLogic.execute({
      ...data,
      playerId,
    });

    return response.status(200).json();
  }
}

const buySaleItemController = new BuySaleItemController();

export { buySaleItemController };
