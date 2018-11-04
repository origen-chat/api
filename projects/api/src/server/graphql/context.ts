import { Request } from 'express';

import * as core from '../../core';
import { getUserFromAuthorizationHeader } from '../authentication';
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

async function makeContextFromHttpRequest(request: Request): Promise<Context> {
  const authorizationHeader = request.headers.authorization;

  const viewer = await getUserFromAuthorizationHeader(authorizationHeader);

  const context: Context = { viewer };

  return context;
}

async function makeContextFromWebSocketConnection(connection: any) {
  const context: Context = connection.context;

  if (context.viewer) {
    await core.presence.setUserConnectionStatusToOnline(context.viewer);
  }

  return context;
}
