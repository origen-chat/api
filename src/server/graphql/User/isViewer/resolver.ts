import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { Resolver } from '../../../types';

export type ResolveUserArgs = Readonly<{}>;

export const resolveIsViewer: Resolver<
  core.users.User,
  ResolveUserArgs,
  boolean
> = async (user, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  const isViewer = viewer.id === user.id;

  return isViewer;
};

const enhancedResolver = resolveIsViewer;

export default enhancedResolver;
