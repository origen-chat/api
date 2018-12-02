import { AuthenticationError } from 'apollo-server-express';

import * as core from '../../core';
import { AuthorizationError } from '../graphql/errors';
import { Context } from '../types';

export type GetViewerOrThrowIfUnauthenticatedArgs<
  TAllowUser extends boolean = true,
  TAllowBot extends boolean = true
> = Readonly<{
  allowed: Readonly<{
    user: TAllowUser;
    bot: TAllowBot;
  }>;
}>;

export function getViewerOrThrowIfUnauthenticated(
  context: Context,
  args?: GetViewerOrThrowIfUnauthenticatedArgs<true, false>,
): core.users.User;

export function getViewerOrThrowIfUnauthenticated(
  context: Context,
  args?: GetViewerOrThrowIfUnauthenticatedArgs<false, true>,
): core.bots.Bot;

export function getViewerOrThrowIfUnauthenticated<
  TAllowUser extends boolean,
  TAllowBot extends boolean
>(
  context: Context,
  args?: GetViewerOrThrowIfUnauthenticatedArgs<TAllowUser, TAllowBot>,
): NonNullable<Context['viewer']> {
  throwIfUnauthenticated(context);

  // eslint-disable-next-line typescript/no-non-null-assertion
  const viewer = context.viewer!;

  if (args && core.users.isUser(viewer) && !args.allowed.user) {
    throw new AuthorizationError();
  }

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
