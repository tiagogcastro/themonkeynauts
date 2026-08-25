import {
  CreateCrewBusinessLogic,
  CreateCrewRequestDTO,
} from '@modules/crews/core/business-logic/create-crew';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

class CreateCrewController implements IController<CreateCrewRequestDTO> {
  async handle(data: CreateCrewRequestDTO): Promise<HttpResponse> {
    const { playerId } = data;

    const createCrewBusinessLogic = container.resolve(CreateCrewBusinessLogic);

    const result = await createCrewBusinessLogic.execute({
      ...data,
      playerId: data.playerId || playerId,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const createCrewController = new CreateCrewController();

export { createCrewController };
