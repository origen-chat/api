import { types, users } from '../../core';
import { getUserFromJWT } from '../authentication';
import { Context } from '../types';

export async function handleSubscriptionConnect(
  connectionParams: any,
): Promise<Context> {
  const viewer = await getViewerFromConnectionParams(connectionParams);

  const context: Context = { viewer };

  return context;
}

async function getViewerFromConnectionParams(
  connectionParams: any,
): Promise<types.Nullable<users.User>> {
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
