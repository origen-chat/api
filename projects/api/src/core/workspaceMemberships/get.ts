import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { workspaceMembershipsTableName } from './constants';
import { WorkspaceMembership } from './types';

export async function getWorkspaceMembershipsByWorkspaceAndUsers(
  workspace: Workspace,
  users: ReadonlyArray<User>,
  options: DBOptions = {},
): Promise<ReadonlyArray<WorkspaceMembership>> {
  const userIds = users.map(user => user.id);

  const workspaceMemberships = await getWorkspaceMembershipsBy(
    { workspaceId: workspace.id, userIds },
    options,
  );

  return workspaceMemberships;
}

export type GetWorkspaceMembershipsByArgs =
  | Readonly<{ workspaceId: ID; userIds: ReadonlyArray<ID> }>
  | Readonly<{ ids: ReadonlyArray<ID> }>;

export async function getWorkspaceMembershipsBy(
  args: GetWorkspaceMembershipsByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<WorkspaceMembership>> {
  const query = db
    .select(`${workspaceMembershipsTableName}.*`)
    .from(workspaceMembershipsTableName);

  if ((args as any).ids) {
    query.whereIn('id', (args as any).ids);
  } else {
    query
      .where({ workspaceId: (args as any).workspaceId })
      .whereIn('memberId', (args as any).userIds);
  }

  maybeAddTransactionToQuery(query, options);

  const workspaceMemberships = await query;

  return workspaceMemberships;
}

export async function getWorkspaceMembershipsByWorkspaceMembershipIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<WorkspaceMembership>> {
  const workspaceMemberships = await getWorkspaceMembershipsBy(
    { ids },
    options,
  );

  return workspaceMemberships;
}
