import { container } from 'tsyringe';

import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  fail,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';

import {
  ChangePlayerOwnerMonkeynautBusinessLogic,
  ChangePlayerOwnerMonkeynautRequestDTO,
} from '@modules/monkeynauts/core/business-logic/change-player-owner-monkeynaut';

type ChangePlayerOwnerMonkeynautControllerRequestDTO =
  ChangePlayerOwnerMonkeynautRequestDTO & {
    player: {
      id: string;
    };
  };

class ChangePlayerOwnerMonkeynautController
  implements IController<ChangePlayerOwnerMonkeynautControllerRequestDTO>
{
  async handle(
    data: ChangePlayerOwnerMonkeynautControllerRequestDTO,
  ): Promise<HttpResponse> {
    const playerLoggedId = data.player.id;

    const changePlayerOwnerMonkeynautBusinessLogic = container.resolve(
      ChangePlayerOwnerMonkeynautBusinessLogic,
    );

    const result = await changePlayerOwnerMonkeynautBusinessLogic.execute({
      ...data,
      playerLoggedId,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const changePlayerOwnerMonkeynautController =
  new ChangePlayerOwnerMonkeynautController();

export { changePlayerOwnerMonkeynautController };
