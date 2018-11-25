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

  const workspaceMemberships = await getWorkspaceMembershipsByFromDB(
    { workspaceId: workspace.id, userIds },
    options,
  );

  return workspaceMemberships;
}

export type GetWorkspaceMembershipsByArgs =
  | Readonly<{ workspaceId: ID; userIds: ReadonlyArray<ID>; ids?: undefined }>
  | Readonly<{
      ids: ReadonlyArray<ID>;
      workspaceId?: undefined;
      userIds?: undefined;
    }>;

export async function getWorkspaceMembershipsByFromDB(
  args: GetWorkspaceMembershipsByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<WorkspaceMembership>> {
  const query = db
    .select(`${workspaceMembershipsTableName}.*`)
    .from(workspaceMembershipsTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  } else {
    query
      .where({ workspaceId: args.workspaceId })
      .whereIn('memberId', args.userIds as any);
  }

  maybeAddTransactionToQuery(query, options);

  const workspaceMemberships = await query;

  return workspaceMemberships;
}

export async function getWorkspaceMembershipsByWorkspaceMembershipIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<WorkspaceMembership>> {
  const workspaceMemberships = await getWorkspaceMembershipsByFromDB(
    { ids },
    options,
  );

  return workspaceMemberships;
}
