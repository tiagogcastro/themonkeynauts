import { UpdateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/update-monkeynaut';
import { UpdateMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/update-monkeynaut-request';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

class UpdateMonkeynautController {
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
