import { Handler } from 'express';

import { users } from '../../core';
import { getJWT } from '../authentication';

export const oauth2CallbackController: Handler = (req, res) => {
  const user: users.User = req.user;
  const token = getJWT(user);

  res.json({ token });
};
