import { types, workspaces } from '../../../core';
import { NotFoundError } from '../../errors';
import { Resolver, Root } from '../../types';

type ResolveChannelArgs = Readonly<{ id: types.ID }>;

export const resolveWorkspace: Resolver<
  Root,
  ResolveChannelArgs,
  workspaces.Workspace
> = async (root, args) => {
  const { id: workspaceId } = args;

  const workspace = await workspaces.getWorkspaceById(workspaceId);

  if (!workspace) {
    throw new NotFoundError('workspace not found');
  }

  return workspace;
};

export default resolveWorkspace;
