import { Router } from 'express';

import { googleStrategy, passport } from '../authentication';
import { oauth2CallbackController } from '../controllers';
import { makeOauth2CallbackUrl } from '../helpers';

const router = Router();

router.get(
  '/auth/google',
  passport.authenticate([googleStrategy.name], { scope: ['email'] }),
  oauth2CallbackController,
);

router.get(
  makeOauth2CallbackUrl(),
  passport.authenticate([googleStrategy.name], { session: false }),
  oauth2CallbackController,
);

export default router;
