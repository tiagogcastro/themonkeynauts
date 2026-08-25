import { container } from 'tsyringe';

import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  created,
  HttpResponse,
} from '@shared/core/infra/http-response';

import {
  CreateMonkeynautBusinessLogic,
  CreateMonkeynautRequestDTO,
} from '@modules/monkeynauts/core/business-logic/create-monkeynaut';

class CreateMonkeynautController
  implements IController<CreateMonkeynautRequestDTO>
{
  async handle(data: CreateMonkeynautRequestDTO): Promise<HttpResponse> {
    const createMonkeynautBusinessLogic = container.resolve(
      CreateMonkeynautBusinessLogic,
    );

    const result = await createMonkeynautBusinessLogic.execute(data);

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return created(result.value);
  }
}

const createMonkeynautController = new CreateMonkeynautController();

export { createMonkeynautController };
