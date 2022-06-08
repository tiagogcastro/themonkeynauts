import { ListLogsBusinessLogic } from '@modules/logs/core/business-logic/list-logs';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListLogsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playerId } = request.query;

    const listLogsBusinessLogic = container.resolve(ListLogsBusinessLogic);

    const logs = await listLogsBusinessLogic.execute(playerId as string);

    return response.status(200).json(logs);
  }
}

const listLogsController = new ListLogsController();

export { listLogsController };
