import { DBOptions } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { getWorkspaceMembershipsByWorkspaceAndUsers } from './get';

/**
 * Returns `true` if all the users are members of the workspace.
 * `false` otherwise;
 */
export async function areWorkspaceMembers(
  workspace: Workspace,
  users: ReadonlyArray<User>,
  options: DBOptions = {},
): Promise<boolean> {
  const workspaceMemberships = await getWorkspaceMembershipsByWorkspaceAndUsers(
    workspace,
    users,
    options,
  );

  return workspaceMemberships.length === users.length;
}
