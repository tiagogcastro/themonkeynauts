import { CreateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import { CreateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/create-monkeynaut-request';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  created,
  HttpResponse,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

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
