import { crewsRouter } from '@modules/crews/infra/http/routes/crews.routes';
import { _logsRouter } from '@modules/logs/infra/http/routes/_logs.routes';
import { monkeynautsRouter } from '@modules/monkeynauts/infra/http/routes/monkeynauts.routes';
import { _monkeynautsRouter } from '@modules/monkeynauts/infra/http/routes/_monkeynauts.routes';
import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { authRouter } from '@modules/players/infra/http/routes/auth.routes';
import { playersRouter } from '@modules/players/infra/http/routes/players.routes';
import { _playersRouter } from '@modules/players/infra/http/routes/_players.routes';
import { privateSalesRouter } from '@modules/private-sales/infra/http/routes/private-sales.routes';
import { _privateSalesRouter } from '@modules/private-sales/infra/http/routes/_private-sales.routes';
import { saleEventsRouter } from '@modules/sales/infra/http/routes/sale-events.routes';
import { _saleEventsRouter } from '@modules/sales/infra/http/routes/_sale-events.routes';
import { shipsRouter } from '@modules/ships/infra/http/routes/ships.routes';
import { _shipsRouter } from '@modules/ships/infra/http/routes/_ships.routes';
import { Router } from 'express';

const router = Router();

router.use('/players', playersRouter);
router.use('/auth', authRouter);
router.use('/private-sales', privateSalesRouter);
router.use('/sale-events', saleEventsRouter);
router.use('/ships', shipsRouter);

router.use('/admins', ensureAuthenticated, ensureAdministrator, [
  _playersRouter,
  _privateSalesRouter,
  _shipsRouter,
  _monkeynautsRouter,
  _logsRouter,
  _saleEventsRouter,
]);

router.use('/monkeynauts', monkeynautsRouter);
router.use('/crews', crewsRouter);

export { router };
