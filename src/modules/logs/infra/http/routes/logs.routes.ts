import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { listLogsController } from '../controllers/list-logs';

const logsRouter = Router();

logsRouter.get(
  '/list',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.QUERY]: {
      playerId: Joi.string().uuid(),
    },
  }),
  (request, response) => listLogsController.handle(request, response),
);

export { logsRouter };
