import { ResetPasswordBusinessLogic } from '@modules/players/core/business-logic/reset-password';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordBusinessLogic = container.resolve(
      ResetPasswordBusinessLogic,
    );

    await resetPasswordBusinessLogic.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}

const resetPasswordController = new ResetPasswordController();

export { resetPasswordController };
