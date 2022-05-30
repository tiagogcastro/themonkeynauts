import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppPlayerAuthBusinessLogic } from '@modules/players/core/business-logic/app-auth-player';

import { instanceToInstance } from '@shared/infra/helpers/instance-to-instance';

class AppPlayerAuthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const appPlayerAuthBusinessLogic = container.resolve(
      AppPlayerAuthBusinessLogic,
    );

    const { player, token } = await appPlayerAuthBusinessLogic.execute({
      email,
      password,
    });

    return response.status(200).json({
      player: instanceToInstance('player', player),
      token,
    });
  }
}

const appPlayerAuthController = new AppPlayerAuthController();

export { appPlayerAuthController };
