import * as core from '../../core';
import { getUserFromJWT } from '../authentication';
import { makeLoaders } from '../loaders';
import { Context } from '../types';

export async function handleSubscriptionConnect(
  connectionParams: any,
): Promise<Context> {
  const viewer = await getViewerFromConnectionParams(connectionParams);

  if (viewer) {
    await core.presence.setUserConnectionStatusToOnline(viewer);
  }

  const loaders = makeLoaders();

  const context: Context = { viewer, loaders };

  return context;
}

async function getViewerFromConnectionParams(
  connectionParams: any,
): Promise<core.types.Nullable<core.users.User>> {
  if (typeof connectionParams.authToken !== 'string') {
    return null;
  }

  const token: string = connectionParams.authToken;

  let viewer: core.types.Nullable<core.users.User> = null;

  try {
    viewer = await getUserFromJWT(token);
  } catch {
    viewer = null;
  }

  return viewer;
}

export async function handleSubscriptionDisconnect(
  websocket: any,
  connectionContext: any,
): Promise<void> {
  const context: Context = await connectionContext.initPromise;

  if (context.viewer) {
    await core.presence.setUserConnectionStatusToOffline(context.viewer);
  }
}
