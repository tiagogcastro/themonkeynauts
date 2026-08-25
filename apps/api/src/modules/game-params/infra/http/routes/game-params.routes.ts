import { Router } from 'express';

import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { fetchGameParamsController } from '../controllers/fetch-game-params';

const gameParamsRouter = Router();

gameParamsRouter.get('/fetch', adaptRoute(fetchGameParamsController));

export { gameParamsRouter };
