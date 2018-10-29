import db, { doInTransaction, maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { insertUserWorkspaceSettings } from '../userWorkspaceSettings';
import { Workspace } from '../workspaces';
import { workspaceMembershipsTableName } from './constants';
import { WorkspaceMembership, WorkspaceMembershipRole } from './types';

export async function insertWorkspaceOwnerMembership(
  workspace: Workspace,
  owner: User,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const args: InsertWorkspaceMembershipArgs = {
    workspace,
    user: owner,
    role: WorkspaceMembershipRole.Owner,
  };

  const workspaceOwnerMembership = await insertWorkspaceMembership(
    args,
    options,
  );

  return workspaceOwnerMembership;
}

export type InsertWorkspaceMembershipArgs = Pick<WorkspaceMembership, 'role'> &
  Readonly<{ workspace: Workspace; user: User }>;

/**
 * Inserts a workspace membership.
 */
export async function insertWorkspaceMembership(
  args: InsertWorkspaceMembershipArgs,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const insertedWorkspaceMembership = await doInTransaction(
    async transaction => {
      const optionsWithTransaction: DBOptions = { transaction };

      const doInsertWorkspaceMembershipArgs = makeDoInsertWorkspaceMembershipArgs(
        args,
      );

      const workspaceMembership = await doInsertWorkspaceMembership(
        doInsertWorkspaceMembershipArgs,
        optionsWithTransaction,
      );
      await insertUserWorkspaceSettings(
        { workspaceMembership },
        optionsWithTransaction,
      );

      return workspaceMembership;
    },
    { transactionFromBefore: options.transaction },
  );

  return insertedWorkspaceMembership;
}

function makeDoInsertWorkspaceMembershipArgs(
  args: InsertWorkspaceMembershipArgs,
): DoInsertWorkspaceMembershipArgs {
  const doInsertWorkspaceMembershipArgs: DoInsertWorkspaceMembershipArgs = {
    workspaceId: args.workspace.id,
    memberId: args.user.id,
    role: args.role,
  };

  return doInsertWorkspaceMembershipArgs;
}

export type DoInsertWorkspaceMembershipArgs = Pick<
  WorkspaceMembership,
  'workspaceId' | 'memberId' | 'role'
>;

export async function doInsertWorkspaceMembership(
  args: DoInsertWorkspaceMembershipArgs,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const query = db
    .insert(args)
    .into(workspaceMembershipsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [workspaceMembership] = await query;

  return workspaceMembership;
}
