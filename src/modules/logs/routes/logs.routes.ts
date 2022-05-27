import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAdministrator from '../../players/middlewares/ensureAdministrator';
import { ensureAuthenticated } from '../../players/middlewares/ensureAuthenticated';
import { listLogsController } from '../useCases/listLogs';


const logsRouter = Router();

logsRouter.get(
  '/list',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.QUERY]: {
      player_id: Joi.string().uuid(),
    }
  }),
  (request, response) => listLogsController.handle(request, response),
);

export { logsRouter };