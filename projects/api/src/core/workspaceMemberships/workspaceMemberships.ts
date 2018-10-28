import { DBOptions } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { insertWorkspaceOwnerMembership } from './insertion';
import { WorkspaceMembership } from './types';

export async function addOwnerToWorkspace(
  workspace: Workspace,
  owner: User,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const workspaceOwnerMembership = await insertWorkspaceOwnerMembership(
    workspace,
    owner,
    options,
  );

  return workspaceOwnerMembership;
}
