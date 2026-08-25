import { container } from 'tsyringe';

import { UpdateMonkeynautRequestDTO } from '@modules/crews/dtos/update-monkeynaut-request';
import { UpdateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/update-monkeynaut';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

class UpdateMonkeynautController
  implements IController<UpdateMonkeynautRequestDTO>
{
  async handle(data: UpdateMonkeynautRequestDTO): Promise<HttpResponse> {
    const updateMonkeynautBusinessLogic = container.resolve(
      UpdateMonkeynautBusinessLogic,
    );

    const result = await updateMonkeynautBusinessLogic.execute(data);

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const updateMonkeynautController = new UpdateMonkeynautController();

export { updateMonkeynautController };
