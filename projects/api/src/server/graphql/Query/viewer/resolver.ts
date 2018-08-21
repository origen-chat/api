import { AuthenticationError } from 'apollo-server-express';

import { users } from '../../../../core';
import { isViewerAuthenticated } from '../../../helpers';
import { Resolver, Root } from '../../../types';

export type ResolveViewerArgs = Readonly<{}>;

export const resolveViewer: Resolver<Root, ResolveViewerArgs, users.User> = (
  root,
  args,
  context,
) => {
  if (!isViewerAuthenticated(context)) {
    throw new AuthenticationError('unauthenticated');
  }

  return context.viewer;
};

export default resolveViewer;
