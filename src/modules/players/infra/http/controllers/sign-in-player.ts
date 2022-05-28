import { SignInPlayerBusinessLogic } from '@modules/players/core/business-logic/sign-in-player';
import { instanceToInstance } from '@shared/infra/helpers/instance-to-instance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SignInPlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const signInPlayerBusinessLogic = container.resolve(
      SignInPlayerBusinessLogic,
    );

    const { player, token } = await signInPlayerBusinessLogic.execute({
      email,
      password,
    });

    return response.status(200).json({
      player: instanceToInstance('player', player),
      token,
    });
  }
}

const signInPlayerController = new SignInPlayerController();

export { signInPlayerController };
