import { CreateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import { CreateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/create-monkeynaut-request';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateMonkeynautController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as CreateMonkeynautRequestDTO;

    const createMonkeynautBusinessLogic = container.resolve(
      CreateMonkeynautBusinessLogic,
    );

    const monkeynauts = await createMonkeynautBusinessLogic.execute(data);

    return response.status(200).json(monkeynauts);
  }
}

const createMonkeynautController = new CreateMonkeynautController();

export { createMonkeynautController };
