import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../middleware';

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      ...request.headers,
      player: request.player,
    };

    const httpResponse = await middleware.handle(requestData);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return next();
    }

    return response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
