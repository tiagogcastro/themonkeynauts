import { ListMonkeynautsBusinessLogic } from '@modules/monkeynauts/core/business-logic/list-monkeynauts';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListMonkeynautsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { player_id } = request.query;

    const listMonkeynautsBusinessLogic = container.resolve(
      ListMonkeynautsBusinessLogic,
    );

    const monkeynauts = await listMonkeynautsBusinessLogic.execute(
      player_id as string,
    );

    return response.status(200).json(monkeynauts);
  }
}

const listMonkeynautsController = new ListMonkeynautsController();

export { listMonkeynautsController };
