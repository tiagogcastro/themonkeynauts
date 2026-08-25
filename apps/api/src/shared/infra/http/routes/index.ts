import { Router } from 'express';

import { crewsRouter } from '@modules/crews/infra/http/routes/crews.routes';
import { _logsRouter } from '@modules/logs/infra/http/routes/_logs.routes';
import { monkeynautsRouter } from '@modules/monkeynauts/infra/http/routes/monkeynauts.routes';
import { _monkeynautsRouter } from '@modules/monkeynauts/infra/http/routes/_monkeynauts.routes';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { authRouter } from '@modules/players/infra/http/routes/auth.routes';
import { playersRouter } from '@modules/players/infra/http/routes/players.routes';
import { _playersRouter } from '@modules/players/infra/http/routes/_players.routes';
import { privateSalesRouter } from '@modules/private-sales/infra/http/routes/private-sales.routes';
import { _privateSalesRouter } from '@modules/private-sales/infra/http/routes/_private-sales.routes';
import { saleEventsRouter } from '@modules/sales/infra/http/routes/sale-events.routes';
import { _saleEventsRouter } from '@modules/sales/infra/http/routes/_sale-events.routes';
import { shipsRouter } from '@modules/ships/infra/http/routes/ships.routes';
import { spaceStationRouter } from '@modules/ships/infra/http/routes/space-station.routes';
import { _shipsRouter } from '@modules/ships/infra/http/routes/_ships.routes';
import { adaptMiddleware } from '@shared/core/infra/adapters/express-middleware-adapter';
import { ensureAdministratorMiddleware } from '@modules/players/infra/http/middlewares/ensure-administrator';
import { _gameParamsRouter } from '@modules/game-params/infra/http/routes/_game-params.routes';
import { ensureOwnerMiddleware } from '@modules/players/infra/http/middlewares/ensure-owner';
import { _privateP2PRouter } from '@modules/private-p2p/infra/http/routes/_send-private-p2p.routes';
import { systemsRouter } from '@modules/game-params/infra/http/routes/systems.routes';
import { gameParamsRouter } from '@modules/game-params/infra/http/routes/game-params.routes';

const router = Router();

router.use('/players', playersRouter);
router.use('/auth', authRouter);
router.use('/private-sales', privateSalesRouter);
router.use('/sale-events', saleEventsRouter);
router.use('/ships', shipsRouter);
router.use('/space-station', spaceStationRouter);
router.use('/system', systemsRouter);
router.use('/game-params', gameParamsRouter);

const adminsRouters = [
  _playersRouter,
  _privateSalesRouter,
  _shipsRouter,
  _monkeynautsRouter,
  _logsRouter,
  _saleEventsRouter,
  _gameParamsRouter,
];

router.use(
  '/admins',
  ensureAuthenticated,
  adaptMiddleware(ensureAdministratorMiddleware),
  adminsRouters,
);

router.use(
  '/owners',
  ensureAuthenticated,
  adaptMiddleware(ensureOwnerMiddleware),
  [_privateP2PRouter, ...adminsRouters],
);

router.use('/monkeynauts', monkeynautsRouter);
router.use('/crews', crewsRouter);

export { router };
