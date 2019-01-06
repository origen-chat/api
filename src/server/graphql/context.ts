import { Request } from 'express';

import * as core from '../../core';
import { getUserFromAuthorizationHeader } from '../authentication';
import { makeLoaders } from '../loaders';
import { Context } from '../types';

export type MakeContextArgs = Readonly<{
  req?: Request;
  connection?: any;
}>;

export async function makeContext(args: MakeContextArgs): Promise<Context> {
  let context: Context;
  if (args.req) {
    context = await makeContextFromHttpRequest(args.req);
  } else {
    context = await makeContextFromWebSocketConnection(args.connection);
  }

  return context;
}

async function makeContextFromHttpRequest(request: Request): Promise<Context> {
  const authorizationHeader = request.headers.authorization;

  const viewer = await getUserFromAuthorizationHeader(authorizationHeader);
  const loaders = makeLoaders();

  const context: Context = { viewer, loaders };

  return context;
}

async function makeContextFromWebSocketConnection(
  connection: any,
): Promise<Context> {
  const context: Context = connection.context;

  let viewer: core.actors.Actor | null = null;

  if (context.userViewerId) {
    viewer = await core.users.getUserById(context.userViewerId);

    if (viewer) {
      await core.presence.setUserConnectionStatusToOnline(viewer);
    }
  } else if (context.botViewerId) {
    viewer = await core.bots.getBotById(context.botViewerId);
  }

  const contextWithViewer = { ...context, viewer };

  return contextWithViewer;
}
