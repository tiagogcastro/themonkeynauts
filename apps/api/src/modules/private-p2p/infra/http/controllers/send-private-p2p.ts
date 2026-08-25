import {
  SendPrivateSaleP2PBusinessLogic,
  SendPrivateSaleP2PRequestDTO,
} from '@modules/private-p2p/core/business-logic/send-private-p2p';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

type SendPrivateP2PControllerRequestDTO = SendPrivateSaleP2PRequestDTO & {
  player: {
    id: string;
  };
};

class SendPrivateP2PController
  implements IController<SendPrivateP2PControllerRequestDTO>
{
  async handle(
    data: SendPrivateP2PControllerRequestDTO,
  ): Promise<HttpResponse> {
    const sendPrivateP2PBusinessLogic = container.resolve(
      SendPrivateSaleP2PBusinessLogic,
    );

    const result = await sendPrivateP2PBusinessLogic.execute({
      ...data,
      playerId: data.player.id,
    });

    if (result.isLeft()) {
      const error = result.value;

      return clientError(error);
    }

    return ok(result.value);
  }
}

const sendPrivateP2PController = new SendPrivateP2PController();

export { sendPrivateP2PController };
