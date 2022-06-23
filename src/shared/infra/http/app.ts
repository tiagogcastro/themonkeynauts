import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '@shared/infra/container';
import { HttpBodyResponse } from '@shared/core/infra/http-response';
import { AppError } from '@shared/errors/app-error';
import { isCelebrateError } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';

const app = express();

app.use(
  cors({
    origin: [
      'https://app.themonkeynauts.com',
      'https://monkeynauts.netlify.app',
      'http://localhost:3000',
    ],
  }),
);
app.use(express.json());

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
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

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);

export { app };
