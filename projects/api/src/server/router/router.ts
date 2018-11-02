import { Router } from 'express';

import {
  livenessProbeController,
  oauth2CallbackController,
  readinessProbeController,
} from '../controllers';
import { makeOauth2CallbackUrl, makeOauth2RequestUrl } from '../helpers';
import { callPassportWithStrategyName } from '../middleware';

const router = Router();

router.get(
  makeOauth2RequestUrl(),
  callPassportWithStrategyName({ session: false, scope: ['email'] }),
);

router.get(
  makeOauth2CallbackUrl(),
  callPassportWithStrategyName({ session: false }),
  oauth2CallbackController,
);

router.get('/healthz', livenessProbeController);

router.get('/ready', readinessProbeController);

export default router;
