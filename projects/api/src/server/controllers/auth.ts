import { Handler } from 'express';

import { env } from '../../config';
import { users } from '../../core';
import { getJWT } from '../authentication';

export const oauth2CallbackController: Handler = (req, res) => {
  const user: users.User = req.user;
  const token = getJWT(user);

  const redirectUrl = `${env.webRootUrl}/auth/callback?authToken=${token}`;

  res.redirect(redirectUrl);
};
