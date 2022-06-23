import { SaveWalletBusinessLogic } from '@modules/players/core/business-logic/save-wallet';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SaveWalletController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { wallet } = request.body;

    const playerId = request.player.id;

    const saveWalletBusinessLogic = container.resolve(SaveWalletBusinessLogic);

    const player = await saveWalletBusinessLogic.execute({
      wallet: wallet as string,
      playerId,
    });

    return response.status(200).json(player);
  }
}

const saveWalletController = new SaveWalletController();

export { saveWalletController };
