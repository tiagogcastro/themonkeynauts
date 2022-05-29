import { logsRouter } from '@modules/logs/infra/http/routes/logs.routes';
import { authRouter } from '@modules/players/infra/http/routes/auth.routes';
import { playersRouter } from '@modules/players/infra/http/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/players', playersRouter);
router.use('/logs', logsRouter);
router.use('/auth', authRouter);

export { router };
