import { Request, Response } from 'express';

import { instanceToInstance } from '@shared/infra/helpers/instance-to-instance';

import { CreatePlayerBusinessLogic } from '@modules/players/core/business-logic/create-player';

class CreatePlayerController {
  constructor(private createPlayerBusinessLogic: CreatePlayerBusinessLogic) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, nickname, password } = request.body;

    const { player } = await this.createPlayerBusinessLogic.execute({
      email,
      nickname,
      password,
    });

    return response.status(201).json({
      player: instanceToInstance('player', player)
    });
  }
}

const createPlayerBusinessLogic = new CreatePlayerBusinessLogic(playersRepository, bcryptHashProvider)

const createPlayerController = new CreatePlayerController(createPlayerBusinessLogic)

export {
  createPlayerController,
  createPlayerBusinessLogic,
}
export { CreatePlayerController };
