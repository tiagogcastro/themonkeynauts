import { Router } from 'express';


const router = Router();

router.use('/players', playersRouter);
router.use('/logs', logsRouter);

export { router };
