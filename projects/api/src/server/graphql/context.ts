import { Request } from 'express';

import { types, users } from '../../core';
import { getUserFromJWT } from '../authentication';
import { Context } from '../types';

export type MakeContextArgs = Readonly<{
  req: Request;
  connection: any;
}>;

export async function makeContext({ req }: MakeContextArgs): Promise<Context> {
  const context = makeContextFromHttpRequest(req);

  return context;
}

async function makeContextFromHttpRequest(req: Request): Promise<Context> {
  const authorizationHeader = req.headers.authorization;

  const viewer = await getUserFromAuthorizationHeader(authorizationHeader);

  const context: Context = { viewer };

  return context;
}

async function getUserFromAuthorizationHeader(
  authorizationHeader: types.Undefinable<string>,
): Promise<types.Nullable<users.User>> {
  if (!authorizationHeader) {
    return null;
  }

  try {
    const token = extractJWTFromAuthorizationHeader(authorizationHeader);

    const user = await getUserFromJWT(token);

    return user;
  } catch {
    return null;
  }
}

function extractJWTFromAuthorizationHeader(
  authorizationHeader: string,
): string {
  const [, token] = authorizationHeader.split('Bearer ');

  return token;
}
