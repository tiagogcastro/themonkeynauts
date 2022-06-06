import { Router } from 'express';

import { authRouter } from '@modules/players/infra/http/routes/auth.routes';
import { playersRouter } from '@modules/players/infra/http/routes/users.routes';

import { logsRouter } from '@modules/logs/infra/http/routes/logs.routes';

import { monkeynautsRouter } from '@modules/monkeynauts/infra/http/routes/monkeynauts.routes';

import { salesRouter } from '@modules/private-sales/infra/http/routes/private-sale.routes';

const router = Router();

router.use('/players', playersRouter);
router.use('/logs', logsRouter);
router.use('/auth', authRouter);
router.use('/sales', salesRouter);
router.use('/monkeynauts', monkeynautsRouter);

export { router };
