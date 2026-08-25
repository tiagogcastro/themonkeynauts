import { Request, Response } from 'express';

import { instanceToInstance } from '@shared/helpers/instance-to-instance';

import { CreatePlayerBusinessLogic } from '@modules/players/core/business-logic/create-player';
import { container } from 'tsyringe';
import {
  clientError,
  created,
  HttpResponse,
} from '@shared/core/infra/http-response';
import { CreatePlayerRequestDTO } from '@modules/players/dtos/create-player-request';
import { IController } from '@shared/core/infra/controller';

class CreatePlayerController implements IController<CreatePlayerRequestDTO> {
  async handle({
    email,
    nickname,
    password,
  }: CreatePlayerRequestDTO): Promise<HttpResponse> {
    const createPlayerBusinessLogic = container.resolve(
      CreatePlayerBusinessLogic,
    );

    const result = await createPlayerBusinessLogic.execute({
      email,
      nickname,
      password,
    });

    if (result.isLeft()) {
      return clientError(result.value);
    }

    return created({
      player: instanceToInstance('player', result.value.player),
      token: result.value.token,
    });
  }
}

const createPlayerController = new CreatePlayerController();

export { createPlayerController };
