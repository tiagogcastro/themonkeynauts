import { ListLogsBusinessLogic } from '@modules/logs/core/business-logic/list-logs';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

type ListLogsControllerRequestDTO = {
  playerId: string;
};
class ListLogsController implements IController<ListLogsControllerRequestDTO> {
  async handle({
    playerId,
  }: ListLogsControllerRequestDTO): Promise<HttpResponse> {
    const listLogsBusinessLogic = container.resolve(ListLogsBusinessLogic);

    const result = await listLogsBusinessLogic.execute(playerId as string);

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const listLogsController = new ListLogsController();

export { listLogsController };
