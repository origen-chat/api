import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { Resolver, Root } from '../../../types';

export type ResolveUpdateViewerArgs = Readonly<{
  input: Readonly<{
    username: core.types.Undefinable<core.types.Nullable<string>>;
  }>;
}>;

export const resolveUpdateViewer: Resolver<
  Root,
  ResolveUpdateViewerArgs,
  core.users.User
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  const updatedViewer = await core.users.updateUser(viewer, args.input as any);

  return updatedViewer;
};

export default resolveUpdateViewer;
