import { ShowPlayerBNBBalanceBusinessLogic } from '@modules/private-sales/core/business-logic/show-player-bnb-balance';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { Response } from 'express';
import { container } from 'tsyringe';

type ShowPlayerBNBBalanceControllerRequestDTO = {
  player: {
    id: string;
  };
};
class ShowPlayerBNBBalanceController
  implements IController<ShowPlayerBNBBalanceControllerRequestDTO>
{
  async handle(
    data: ShowPlayerBNBBalanceControllerRequestDTO,
  ): Promise<HttpResponse> {
    const playerId = data.player.id;

    const showPlayerBNBBalanceBusinessLogic = container.resolve(
      ShowPlayerBNBBalanceBusinessLogic,
    );

    const result = await showPlayerBNBBalanceBusinessLogic.execute(playerId);

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const showPlayerBNBBalanceController = new ShowPlayerBNBBalanceController();

export { showPlayerBNBBalanceController };
