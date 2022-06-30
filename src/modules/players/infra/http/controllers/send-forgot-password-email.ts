import { SendForgotPasswordEmailBusinessLogic } from '@modules/players/core/business-logic/send-forgot-password-email';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

type SendForgotPasswordEmailControllerRequestDTO = {
  email: string;
};
class SendForgotPasswordEmailController
  implements IController<SendForgotPasswordEmailControllerRequestDTO>
{
  async handle({
    email,
  }: SendForgotPasswordEmailControllerRequestDTO): Promise<HttpResponse> {
    const sendForgotPasswordEmailBusinessLogic = container.resolve(
      SendForgotPasswordEmailBusinessLogic,
    );

    const result = await sendForgotPasswordEmailBusinessLogic.execute(email);

    if (result.isLeft()) {
      return clientError(result.value);
    }

    return ok();
  }
}

const sendForgotPasswordEmailController =
  new SendForgotPasswordEmailController();

export { sendForgotPasswordEmailController };
