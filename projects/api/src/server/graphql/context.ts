import { Request } from 'express';

import * as core from '../../core';
import { getUserFromJWT } from '../authentication';
import { Context } from '../types';

export type MakeContextArgs = Readonly<{
  req?: Request;
  connection?: any;
}>;

export async function makeContext(args: MakeContextArgs): Promise<Context> {
  if (args.req) {
    return makeContextFromHttpRequest(args.req);
  }

  return makeContextFromWebSocketConnection(args.connection);
}

async function makeContextFromHttpRequest(req: Request): Promise<Context> {
  const authorizationHeader = req.headers.authorization;

  const viewer = await getViewerFromAuthorizationHeader(authorizationHeader);

  const context: Context = { viewer };

  return context;
}

async function getViewerFromAuthorizationHeader(
  authorizationHeader: core.types.Undefinable<string>,
): Promise<core.types.Nullable<core.users.User>> {
  if (!authorizationHeader) {
    return null;
  }

  const token = extractJWTFromAuthorizationHeader(authorizationHeader);

  let user;

  try {
    user = await getUserFromJWT(token);
  } catch {
    return null;
  }

  return user;
}

function extractJWTFromAuthorizationHeader(
  authorizationHeader: string,
): string {
  const tokenType = 'Bearer';

  const [, token] = authorizationHeader.split(`${tokenType} `);

  return token;
}

async function makeContextFromWebSocketConnection(connection: any) {
  const context: Context = connection.context;

  if (context.viewer) {
    await core.presence.setUserConnectionStatusToOnline(context.viewer);
  }

  return context;
}
