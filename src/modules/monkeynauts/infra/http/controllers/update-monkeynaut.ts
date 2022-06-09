import { UpdateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/update-monkeynaut';
import { UpdateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/update-monkeynaut-request';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateMonkeynautController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as UpdateMonkeynautRequestDTO;

    const updateMonkeynautBusinessLogic = container.resolve(
      UpdateMonkeynautBusinessLogic,
    );

    const monkeynauts = await updateMonkeynautBusinessLogic.execute(data);

    return response.status(200).json(monkeynauts);
  }
}

const updateMonkeynautController = new UpdateMonkeynautController();

export { updateMonkeynautController };
