import {
  SaveWalletBusinessLogic,
  SaveWalletRequestDTO,
} from '@modules/players/core/business-logic/save-wallet';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';
import { container } from 'tsyringe';

type SaveWalletControllerRequestDTO = SaveWalletRequestDTO & {
  playerId?: string;
  player: {
    id: string;
  };
};

class SaveWalletController {
  async handle({
    player,
    playerId,
    wallet,
  }: SaveWalletControllerRequestDTO): Promise<HttpResponse> {
    const _playerId = playerId || player.id;

    const saveWalletBusinessLogic = container.resolve(SaveWalletBusinessLogic);

    const result = await saveWalletBusinessLogic.execute({
      wallet: wallet as string,
      playerId: _playerId,
    });

    if (result.isLeft()) {
      return clientError(result.value);
    }

    return ok(instanceToInstance('player', result.value.player));
  }
}

const saveWalletController = new SaveWalletController();

export { saveWalletController };
