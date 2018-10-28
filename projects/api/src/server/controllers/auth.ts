import { Handler } from 'express';

import { env } from '../../config';
import * as core from '../../core';
import { getJWT } from '../authentication';

export const oauth2CallbackController: Handler = (req, res) => {
  const user: core.users.User = req.user;
  const token = getJWT(user);

  const redirectUrl = `${env.webRootUrl}/auth/callback?authToken=${token}`;

  res.redirect(redirectUrl);
};
