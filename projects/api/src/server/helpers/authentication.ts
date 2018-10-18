import { AuthenticationError } from 'apollo-server-express';

import { Context } from '../types';

export function getViewerOrThrowIfUnauthenticated(
  context: Context,
): NonNullable<Context['viewer']> {
  throwIfUnauthenticated(context);

  const viewer = context.viewer!;

  return viewer;
}

function throwIfUnauthenticated(context: Context): void {
  if (!isViewerAuthenticated(context)) {
    throw new AuthenticationError('unauthenticated');
  }
}

export function isViewerAuthenticated(
  context: Context,
): context is Context & Readonly<{ viewer: NonNullable<Context['viewer']> }> {
  return !!context.viewer;
}
