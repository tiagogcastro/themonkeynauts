import { crewsRouter } from '@modules/crews/infra/http/routes/crews.routes';
import { logsRouter } from '@modules/logs/infra/http/routes/logs.routes';
import { monkeynautsRouter } from '@modules/monkeynauts/infra/http/routes/monkeynauts.routes';
import { authRouter } from '@modules/players/infra/http/routes/auth.routes';
import { playersRouter } from '@modules/players/infra/http/routes/players.routes';
import { privateSalesRouter } from '@modules/private-sales/infra/http/routes/private-sales.routes';
import { saleEventsRouter } from '@modules/sales/infra/http/routes/sale-events.routes';
import { shipsRouter } from '@modules/ships/infra/http/routes/ships.routes';
import { Router } from 'express';

const router = Router();

router.use('/players', playersRouter);
router.use('/logs', logsRouter);
router.use('/auth', authRouter);
router.use('/private-sales', privateSalesRouter);
router.use('/sale-events', saleEventsRouter);
router.use('/ships', shipsRouter);
router.use('/monkeynauts', monkeynautsRouter);
router.use('/crews', crewsRouter);

export { router };
