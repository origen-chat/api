import { DBOptions } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';

import { getWorkspaceMembershipsByWorkspaceAndUsers } from './get';
import {
  WorkspaceMembership,
  UserWorkspaceMembership,
  BotWorkspaceMembership,
} from './types';

/**
 * Returns `true` if all the users are members of the workspace.
 * `false` otherwise.
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

export function isWorkspaceMembership(
  value: any,
): value is WorkspaceMembership {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.workspaceId &&
    value.role &&
    (value.botMemberId || value.userMemberId)
  );
}

export function isUserWorkspaceMembership(
  workspaceMembership: WorkspaceMembership,
): workspaceMembership is UserWorkspaceMembership {
  return !!workspaceMembership.userMemberId;
}

export function isBotWorkspaceMembership(
  workspaceMembership: WorkspaceMembership,
): workspaceMembership is BotWorkspaceMembership {
  return !!workspaceMembership.botMemberId;
}
