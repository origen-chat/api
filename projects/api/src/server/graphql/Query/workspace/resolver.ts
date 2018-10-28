import * as core from '../../../../core';
import { Resolver, Root } from '../../../types';
import { NotFoundError } from '../../errors';

type ResolveChannelArgs = Readonly<{ id: core.types.ID; name: string }>;

export const resolveWorkspace: Resolver<
  Root,
  ResolveChannelArgs,
  core.workspaces.Workspace
> = async (root, args) => {
  const { name: workspaceName } = args;

  const workspace = await core.workspaces.getWorkspaceByName(workspaceName);

  if (!workspace) {
    throw new NotFoundError('workspace not found');
  }

  return workspace;
};

export default resolveWorkspace;
