import { container } from 'tsyringe';

import { AppPlayerAuthBusinessLogic } from '@modules/players/core/business-logic/app-auth-player';

import { AppPlayerAuthRequestDTO } from '@modules/players/dtos/auth-player-request';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { instanceToInstance } from '@shared/helpers/instance-to-instance';

class AppPlayerAuthController implements IController<AppPlayerAuthRequestDTO> {
  async handle({
    email,
    password,
  }: AppPlayerAuthRequestDTO): Promise<HttpResponse> {
    const appPlayerAuthBusinessLogic = container.resolve(
      AppPlayerAuthBusinessLogic,
    );

    const result = await appPlayerAuthBusinessLogic.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      return clientError(result.value);
    }

    return ok({
      player: instanceToInstance('player', result.value.player),
      token: result.value.token,
    });
  }
}

const appPlayerAuthController = new AppPlayerAuthController();

export { appPlayerAuthController };
