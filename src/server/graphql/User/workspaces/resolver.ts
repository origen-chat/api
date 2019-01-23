import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { Resolver } from '../../../types';
import { AuthorizationError } from '../../errors';

import { validateWorkspacesArgs } from './validation';

export type ResolveWorkspacesArgs = Readonly<{
  role?: core.workspaceMemberships.WorkspaceMembershipRole | null;
}> &
  core.types.PaginationArgs;

export const resolveWorkspaces: Resolver<
  core.users.User,
  ResolveWorkspacesArgs,
  core.types.Connection<core.workspaces.Workspace>
> = async (user, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  validateWorkspacesArgs(args);

  if (user.id !== viewer.id) {
    throw new AuthorizationError();
  }

  const role = args.role || undefined;

  const workspaceConnection = await core.workspaces.getWorkspaceConnection({
    member: user,
    role,
    paginationArgs: args,
  });

  return workspaceConnection;
};

const enhancedResolver = resolveWorkspaces;

export default enhancedResolver;
