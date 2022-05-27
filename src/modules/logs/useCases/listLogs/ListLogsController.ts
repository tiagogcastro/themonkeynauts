import { Request, Response } from 'express';
import { ListLogsBusinessLogic } from './ListLogsBusinessLogic'

class ListLogsController {
    constructor(private listLogsBusinessLogic: ListLogsBusinessLogic) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { player_id } = request.query;

        const _response = await this.listLogsBusinessLogic.execute(player_id as string);

        return response.status(200).json({
            logs: _response
        });
    }
}

export { ListLogsController };
