import { Handler } from 'express';

import { env } from '../../config';
import * as core from '../../core';
import { makeJWT } from '../authentication';

export const oauth2CallbackController: Handler = (request, response) => {
  const user: core.users.User = request.user;
  const token = makeJWT(user);

  const redirectUrl = `${env.webRootUrl}/auth/callback?authToken=${token}`;

  response.redirect(redirectUrl);
};
