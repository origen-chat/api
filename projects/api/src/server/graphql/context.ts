import { Request } from 'express';

import { getUserFromAuthorizationHeader } from '../authentication';
import { makeLoaders } from '../loaders';
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
  const loaders = makeLoaders();

  const context: Context = { viewer, loaders };

  return context;
}

async function makeContextFromWebSocketConnection(connection: any) {
  const context: Context = connection.context;

  return context;
}
