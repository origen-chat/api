import { Router } from 'express';

import { router as authRouter } from './auth';
import { router as probesRouter } from './probes';
import { router as webPushSubscriptionsRouter } from './webPushSubscriptions';

const router = Router();

router
  .use(authRouter)
  .use(probesRouter)
  .use(webPushSubscriptionsRouter);

export default router;
