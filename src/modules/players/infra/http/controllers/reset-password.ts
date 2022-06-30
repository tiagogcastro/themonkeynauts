import { ResetPasswordBusinessLogic } from '@modules/players/core/business-logic/reset-password';
import { ResetPasswordRequestDTO } from '@modules/players/dtos/reset-password-request';
import { IController } from '@shared/core/infra/controller';
import {
  clientError,
  HttpResponse,
  ok,
} from '@shared/core/infra/http-response';
import { container } from 'tsyringe';

class ResetPasswordController implements IController<ResetPasswordRequestDTO> {
  async handle({
    password,
    token,
  }: ResetPasswordRequestDTO): Promise<HttpResponse> {
    const resetPasswordBusinessLogic = container.resolve(
      ResetPasswordBusinessLogic,
    );

    const result = await resetPasswordBusinessLogic.execute({
      token,
      password,
    });

    if (result.isLeft()) {
      return clientError(result.value);
    }

    return ok();
  }
}

const resetPasswordController = new ResetPasswordController();

export { resetPasswordController };
