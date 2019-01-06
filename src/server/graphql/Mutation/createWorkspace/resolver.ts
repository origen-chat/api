import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { MutationInputArg, Resolver, Root } from '../../../types';
import { AuthorizationError } from '../../errors';
import { validateCreateWorkspaceArgs } from './validation';

export type ResolveCreateWorkspaceArgs = MutationInputArg<{
  name: string;
  displayName: string;
  description: string | null | undefined;
}>;

export const resolveCreateWorkspace: Resolver<
  Root,
  ResolveCreateWorkspaceArgs,
  Readonly<{ workspace: core.workspaces.Workspace }>
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  validateCreateWorkspaceArgs(args);

  if (!core.workspaces.canCreateWorkspaces(viewer)) {
    throw new AuthorizationError();
  }

  const createWorkspaceArgs: core.workspaces.CreateWorkspaceArgs = {
    owner: viewer,
    name: args.input.name,
    displayName: args.input.displayName,
    description: args.input.description,
  };

  const workspace = await core.workspaces.createWorkspace(createWorkspaceArgs);

  const payload = { workspace };

  return payload;
};

export default resolveCreateWorkspace;
