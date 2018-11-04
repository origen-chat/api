import jwt from 'jsonwebtoken';

import { env } from '../../config';
import * as core from '../../core';
import { defaultJWTExpiresIn, jwtIssuer } from './constants';

export type Payload = Readonly<{
  userId: core.types.ID;
}>;

export function makeJWT(user: core.users.User): string {
  const payload = getPayloadForJWT(user);

  const subject = user.id.toString();

  const token = jwt.sign(payload, env.jwtSecret, {
    issuer: jwtIssuer,
    subject,
    expiresIn: defaultJWTExpiresIn,
  });

  return token;
}

function getPayloadForJWT(user: core.users.User): Payload {
  const payload: Payload = { userId: user.id };

  return payload;
}

export async function getUserFromJWT(token: string): Promise<core.users.User> {
  const payload = jwt.verify(token, env.jwtSecret, { issuer: jwtIssuer });
  const userId = (payload as any).sub;

  const user = await core.users.getUserById(userId);

  if (!user) {
    throw new Error('invalid JWT');
  }

  return user;
}
