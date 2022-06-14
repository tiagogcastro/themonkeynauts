import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '@shared/infra/container';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import { AppError } from '@shared/errors/app-error';
import { router } from './routes';

const app = express();

app.use(
  cors({
    origin: ['https://app.themonkeynauts.com', 'http://localhost:3000'],
  }),
);
app.use(express.json());

app.use(router);

app.use(errors());
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    console.error(error);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);

export { app };
