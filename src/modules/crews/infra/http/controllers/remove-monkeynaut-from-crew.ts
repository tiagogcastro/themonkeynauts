import { container } from 'tsyringe';

import {
  RemoveMonkeynautFromCrewBusinessLogic,
  RemoveMonkeynautFromCrewRequestDTO,
} from '@modules/crews/core/business-logic/remove-monkeynaut-from-crew';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

class RemoveMonkeynautFromCrewController {
  async handle(
    data: RemoveMonkeynautFromCrewRequestDTO,
  ): Promise<HttpResponse> {
    const { playerId } = data;

    const removeMonkeynautFromCrewBusinessLogic = container.resolve(
      RemoveMonkeynautFromCrewBusinessLogic,
    );

    const result = await removeMonkeynautFromCrewBusinessLogic.execute({
      ...data,
      playerId: data.playerId || playerId,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok({
      success: 'Monkeynaut was successfully removed from crew',
    });
  }
}

const removeMonkeynautFromCrewController =
  new RemoveMonkeynautFromCrewController();

export { removeMonkeynautFromCrewController };
