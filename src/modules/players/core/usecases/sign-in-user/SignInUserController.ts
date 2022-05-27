import { Request, Response } from 'express';
import { instanceToInstance } from '../../../../shared/helpers/instanceToInstance';
import { SignInBusinessLogic } from './SignInPlayerBusinessLogic';

export class SignInController {
    constructor(private signInBusinessLogic: SignInBusinessLogic) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const { player, token } = await this.signInBusinessLogic.execute({
      email,
      password,
    });

    return response.status(200).json({
      player: instanceToInstance('player', player),
      token
    });
  }
}
