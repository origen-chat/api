import { Router } from 'express';

import { oauth2CallbackController } from '../controllers';
import { makeOauth2CallbackUrl, makeOauth2RequestUrl } from '../helpers';
import { callPassportWithStrategyName } from '../middleware';

export const router = Router();

router
  .get(
    makeOauth2RequestUrl(),
    callPassportWithStrategyName({ session: false, scope: ['email'] }),
  )

  .get(
    makeOauth2CallbackUrl(),
    callPassportWithStrategyName({ session: false }),
    oauth2CallbackController,
  );
