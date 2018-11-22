import { Router } from 'express';

import { serverStatsController } from '../controllers';

export const router = Router();

router.get('/server-stats', serverStatsController);
