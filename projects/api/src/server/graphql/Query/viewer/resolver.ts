import * as core from '../../../../core';
import { isViewerAuthenticated } from '../../../helpers';
import { Resolver, Root } from '../../../types';
import { AuthenticationError } from '../../errors';

export type ResolveViewerArgs = Readonly<{}>;

export const resolveViewer: Resolver<
  Root,
  ResolveViewerArgs,
  core.users.User
> = (root, args, context) => {
  if (!isViewerAuthenticated(context)) {
    throw new AuthenticationError();
  }

  return context.viewer;
};

export default resolveViewer;
