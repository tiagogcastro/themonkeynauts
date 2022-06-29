import { HttpBodyResponse } from '@shared/core/infra/http-response';
import { AppError } from '@shared/errors/app-error';
import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

export const handleErrors = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      data: null,
      error: {
        messages: [error.message],
        name: 'AppError',
        statusCode: error.statusCode,
      },
    });
  }

  if (isCelebrateError(error)) {
    let messages: string[] = [];

    const detailsValues = error.details.values();

    for (const joiError of detailsValues) {
      messages = joiError.details.map(mapError => {
        return mapError.message.replace(/"/g, "'");
      });
    }

    const result: HttpBodyResponse = {
      data: null,
      error: {
        messages,
        name: 'CelebrateError',
        statusCode: 400,
      },
    };

    return response.status(400).json(result);
  }

  console.error(error);

  return response.status(500).json({
    data: null,
    error: {
      messages: ['Internal server error'],
      name: 'InternalError',
      statusCode: 500,
    },
  });
};
