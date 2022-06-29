import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/infra/container';
import cors from 'cors';
import express from 'express';
import { handleErrors } from './handle-errors';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(handleErrors);

export { app };
