import * as core from '../../core';
import { getUserFromJWT } from '../authentication';
import { Context } from '../types';

export async function handleSubscriptionConnect(
  connectionParams: any,
): Promise<Context> {
  const viewer = await getViewerFromConnectionParams(connectionParams);

  if (viewer) {
    await core.presence.setUserConnectionStatusToOnline(viewer);
  }

  const context: Context = { viewer };

  return context;
}

async function getViewerFromConnectionParams(
  connectionParams: any,
): Promise<core.types.Nullable<core.users.User>> {
  if (typeof connectionParams.authToken !== 'string') {
    return null;
  }

  const token: string = connectionParams.authToken;

  try {
    const viewer = await getUserFromJWT(token);

    return viewer;
  } catch {
    return null;
  }
}

export async function handleSubscriptionDisconnect(
  websocket: any,
  connectionContext: any,
): Promise<void> {
  const context: Context = await connectionContext.initPromise;

  if (context.viewer) {
    await core.presence.deleteUserConnectionStatus(context.viewer);
  }
}
