import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePrivateSaleBusinessLogic } from '@modules/private-sales/core/business-logic/create-private-sale';
import { CreatePrivateSaleRequestDTO } from '@modules/private-sales/dtos/create-private-sale-request';

class CreatePrivateSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: CreatePrivateSaleRequestDTO = request.body;

    const playerId = request.player.id;

    const createPrivateSaleBusinessLogic = container.resolve(
      CreatePrivateSaleBusinessLogic,
    );

    const createdPrivateSale = await createPrivateSaleBusinessLogic.execute({
      ...data,
      playerId,
    });

    return response.status(201).json(createdPrivateSale);
  }
}

const createPrivateSaleController = new CreatePrivateSaleController();

export { createPrivateSaleController };
