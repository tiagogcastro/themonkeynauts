import { Request, Response } from 'express';

import { instanceToInstance } from '@shared/infra/helpers/instance-to-instance';

import { CreatePlayerBusinessLogic } from '@modules/players/core/business-logic/create-player';
import { container } from 'tsyringe';

class CreatePlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, nickname, password } = request.body;

    const createPlayerBusinessLogic = container.resolve(
      CreatePlayerBusinessLogic,
    );

    const { player } = await createPlayerBusinessLogic.execute({
      email,
      nickname,
      password,
    });

    return response.status(201).json({
      player: instanceToInstance('player', player),
    });
  }
}

const createPlayerController = new CreatePlayerController();

export { createPlayerController };
