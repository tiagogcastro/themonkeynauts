import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { listLogsController } from '../controllers/list-logs';

const _logsRouter = Router();

_logsRouter.get(
  '/list-logs',
  celebrate(
    {
      [Segments.QUERY]: {
        playerId: Joi.string().uuid(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(listLogsController),
);

_logsRouter.use('/logs', _logsRouter);

export { _logsRouter };
