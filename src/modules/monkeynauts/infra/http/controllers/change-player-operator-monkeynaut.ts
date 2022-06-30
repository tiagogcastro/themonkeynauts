import { container } from 'tsyringe';

import {
  ChangePlayerOperatorMonkeynautBusinessLogic,
  ChangePlayerOperatorMonkeynautRequestDTO,
} from '@modules/monkeynauts/core/business-logic/change-player-operator-monkeynaut';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { IController } from '@shared/core/infra/controller';

type ChangePlayerOperatorMonkeynautControllerRequestDTO =
  ChangePlayerOperatorMonkeynautRequestDTO & {
    player: {
      id: string;
    };
  };

class ChangePlayerOperatorMonkeynautController
  implements IController<ChangePlayerOperatorMonkeynautControllerRequestDTO>
{
  async handle(
    data: ChangePlayerOperatorMonkeynautControllerRequestDTO,
  ): Promise<HttpResponse> {
    const playerLoggedId = data.player.id;

    const changePlayerOperatorMonkeynautBusinessLogic = container.resolve(
      ChangePlayerOperatorMonkeynautBusinessLogic,
    );

    const result = await changePlayerOperatorMonkeynautBusinessLogic.execute({
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

const changePlayerOperatorMonkeynautController =
  new ChangePlayerOperatorMonkeynautController();

export { changePlayerOperatorMonkeynautController };
