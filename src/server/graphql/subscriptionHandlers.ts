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

  const userViewerId = viewer && viewer.id;

  const context: Context = { viewer: null, loaders, userViewerId };

  return context;
}

async function getViewerFromConnectionParams(
  connectionParams: any,
): Promise<core.types.Nullable<core.users.User>> {
  if (typeof connectionParams.authToken !== 'string') {
    return null;
  }

  const token: string = connectionParams.authToken;

  let viewer: core.users.User | null = null;

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

  const { userViewerId } = context;

  if (!userViewerId) {
    return;
  }

  const viewer = core.users.getUserById(userViewerId);

  if (viewer && core.users.isUser(viewer)) {
    await core.presence.setUserConnectionStatusToOffline(viewer);
  }
}
