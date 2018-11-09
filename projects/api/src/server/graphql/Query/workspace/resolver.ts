import { UserInputError } from 'apollo-server-express';

import * as core from '../../../../core';
import { Resolver, Root } from '../../../types';
import { NotFoundError } from '../../errors';

type ResolveChannelArgs = Partial<
  Readonly<{
    id?: core.types.Nullable<core.types.ID>;
    name?: core.types.Nullable<string>;
  }>
>;

export const resolveWorkspace: Resolver<
  Root,
  ResolveChannelArgs,
  core.workspaces.Workspace
> = async (root, args, context) => {
  const { id: workspaceId, name: workspaceName } = args;

  let workspace: core.types.Nullable<core.workspaces.Workspace>;

  if (workspaceId) {
    workspace = await context.loaders.workspacesByIdLoader.load(workspaceId);
  } else if (workspaceName) {
    workspace = await core.workspaces.getWorkspaceByName(workspaceName);
  } else {
    throw new UserInputError('must provide workspace id or name');
  }

  if (!workspace) {
    throw new NotFoundError({ entity: 'workspace' });
  }

  return workspace;
};

export default resolveWorkspace;
