import jwt from 'jsonwebtoken';

import { env } from '../../config';
import { types, users } from '../../core';
import { defaultJWTExpiresIn, jwtIssuer } from './constants';

export type Payload = Readonly<{
  userId: types.ID;
}>;

export function getJWT(user: users.User): string {
  const payload = getPayloadForJWT(user);

  const subject = user.id.toString();

  const token = jwt.sign(payload, env.jwtSecret, {
    issuer: jwtIssuer,
    subject,
    expiresIn: defaultJWTExpiresIn,
  });

  return token;
}

function getPayloadForJWT(user: users.User): Payload {
  const payload: Payload = { userId: user.id };

  return payload;
}
