import { workspaces } from '../../../../core';
import { Resolver, Root } from '../../../types';
import { NotFoundError } from '../../errors';

type ResolveChannelArgs = Readonly<{ name: string }>;

export const resolveWorkspace: Resolver<
  Root,
  ResolveChannelArgs,
  workspaces.Workspace
> = async (root, args) => {
  const { name: workspaceName } = args;

  const workspace = await workspaces.getWorkspaceByName(workspaceName);

  if (!workspace) {
    throw new NotFoundError('workspace not found');
  }

  return workspace;
};

export default resolveWorkspace;
