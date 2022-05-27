import { Response, Request } from 'express'
import { SendForgotPasswordEmailBusinessLogic } from './SendForgotPasswordEmailBusinessLogic'


class SendForgotPasswordEmailController {
    constructor(private sendForgotPasswordEmailBusinessLogic: SendForgotPasswordEmailBusinessLogic) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body
        
        await this.sendForgotPasswordEmailBusinessLogic.execute(email)

        return response.status(204).json()
    }
}

export { SendForgotPasswordEmailController }