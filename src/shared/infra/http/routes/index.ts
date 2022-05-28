import { logsRouter } from '@modules/logs/infra/http/routes/logs.routes';
import { sessionsRouter } from '@modules/players/infra/http/routes/sessions.routes';
import { playersRouter } from '@modules/players/infra/http/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/players', playersRouter);
router.use('/logs', logsRouter);
router.use('/sessions', sessionsRouter);

export { router };
