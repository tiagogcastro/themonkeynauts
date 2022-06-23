import { Request, Response } from 'express';
import { IController } from '../controller';

export const adaptRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      player: request.player,
    };

    const httpResponse = await controller.handle(requestData);

    return response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
