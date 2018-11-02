import { UserInputError } from 'apollo-server-express';

import * as core from '../../../../core';
import { Resolver, Root } from '../../../types';
import { NotFoundError } from '../../errors';

type ResolveChannelArgs = Partial<
  Readonly<{ id: core.types.ID; name: string }>
>;

export const resolveWorkspace: Resolver<
  Root,
  ResolveChannelArgs,
  core.workspaces.Workspace
> = async (root, args) => {
  const { id: workspaceId, name: workspaceName } = args;

  let workspace: core.types.Nullable<core.workspaces.Workspace> = null;

  if (workspaceId) {
    workspace = await core.workspaces.getWorkspaceById(workspaceId);
  } else if (workspaceName) {
    workspace = await core.workspaces.getWorkspaceByName(workspaceName);
  } else {
    throw new UserInputError('must provide workspace id or name');
  }

  if (!workspace) {
    throw new NotFoundError('workspace not found');
  }

  return workspace;
};

export default resolveWorkspace;
