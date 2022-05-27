import 'express-async-errors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { router } from './routes';
import { errors } from 'celebrate';
import cors from 'cors'

const app = express();

app.use(cors())
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

export {
  app
}