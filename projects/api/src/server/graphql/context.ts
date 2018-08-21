import { Request } from 'express';

import { users } from '../../core';
import { Context } from '../types';

export type MakeContextArgs = Readonly<{
  req: Request;
  connection: any;
}>;

export async function makeContext({ req }: MakeContextArgs): Promise<Context> {
  const authorizationHeader = req.headers.authorization;

  const viewer = await getUserFromAuthorizationHeader(authorizationHeader);

  const context: Context = { viewer };

  return context;
}

async function getUserFromAuthorizationHeader(
  authorizationHeader: string | undefined,
): Promise<users.User | null> {
  if (!authorizationHeader) {
    return null;
  }

  return null;
}
