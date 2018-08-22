import { Router } from 'express';

import { googleStrategy, passport } from '../authentication';
import { oauth2CallbackController } from '../controllers';
import { makeOauth2CallbackUrl } from '../helpers';

const router = Router();

router.get(
  makeOauth2CallbackUrl(),
  passport.authenticate([googleStrategy.name]),
  oauth2CallbackController,
);

export default router;
