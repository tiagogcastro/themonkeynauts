import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '@shared/infra/http/validation';

import { listLogsController } from '../controllers/list-logs';

const _logsRouter = Router();

_logsRouter.get(
  '/list-logs',
  validate({
    query: z.object({
      playerId: z.uuid().optional(),
    }),
  }),
  adaptRoute(listLogsController),
);

_logsRouter.use('/logs', _logsRouter);

export { _logsRouter };
