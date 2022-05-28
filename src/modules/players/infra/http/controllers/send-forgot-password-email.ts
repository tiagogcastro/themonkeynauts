import { SendForgotPasswordEmailBusinessLogic } from '@modules/players/core/business-logic/send-forgot-password-email';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

class SendForgotPasswordEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailBusinessLogic = container.resolve(
      SendForgotPasswordEmailBusinessLogic,
    );

    await sendForgotPasswordEmailBusinessLogic.execute(email);

    return response.status(204).json();
  }
}

const sendForgotPasswordEmailController =
  new SendForgotPasswordEmailController();

export { sendForgotPasswordEmailController };
