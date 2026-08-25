import { ListMonkeynautsBusinessLogic } from '@modules/monkeynauts/core/business-logic/list-monkeynauts';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

type ListMonkeynautsDTO = {
  playerId: string;
};

class ListMonkeynautsController implements IController<ListMonkeynautsDTO> {
  async handle(data: ListMonkeynautsDTO): Promise<HttpResponse> {
    const { playerId } = data;

    const listMonkeynautsBusinessLogic = container.resolve(
      ListMonkeynautsBusinessLogic,
    );

    const result = await listMonkeynautsBusinessLogic.execute(
      playerId as string,
    );

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const listMonkeynautsController = new ListMonkeynautsController();

export { listMonkeynautsController };
