import { Request, Response } from 'express';

class DisablePlayerController {
    constructor(private disablePlayerBusinessLogic: DisablePlayerBusinessLogic) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { player_id } = request.body;

        await this.disablePlayerBusinessLogic.execute(player_id);

        return response.status(204).json();
    }
}

export { DisablePlayerController };
