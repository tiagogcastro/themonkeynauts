export class ResetPasswordController {
    constructor(private resetPasswordBusinessLogic: ResetPasswordBusinessLogic) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body

        await this.resetPasswordBusinessLogic.execute({
            token,
            password
        })

        return response.status(204).json()
    }
}