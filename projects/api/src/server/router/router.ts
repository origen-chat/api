import { Router } from 'express';

import { router as authRouter } from './auth';
import { router as probesRouter } from './probes';
import { router as serverStatsRouter } from './serverStats';
import { router as webPushSubscriptionsRouter } from './webPushSubscriptions';

const router = Router();

router
  .use(authRouter)
  .use(probesRouter)
  .use(webPushSubscriptionsRouter)
  .use(serverStatsRouter);

export default router;
