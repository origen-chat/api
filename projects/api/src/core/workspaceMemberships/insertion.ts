import db, { doInTransaction, maybeAddTransactionToQuery } from '../db';
import { DBOptions, Mutable } from '../types';
import { isUser, User } from '../users';
import { insertUserWorkspaceSettings } from '../userWorkspaceSettings';
import { Workspace } from '../workspaces';
import { workspaceMembershipsTableName } from './constants';
import {
  WorkspaceMember,
  WorkspaceMembership,
  WorkspaceMembershipRole,
} from './types';

export async function insertWorkspaceOwnerMembership(
  workspace: Workspace,
  owner: User,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const args: InsertWorkspaceMembershipArgs = {
    workspace,
    member: owner,
    role: WorkspaceMembershipRole.Owner,
  };

  const workspaceOwnerMembership = await insertWorkspaceMembership(
    args,
    options,
  );

  return workspaceOwnerMembership;
}

export type InsertWorkspaceMembershipArgs = Pick<WorkspaceMembership, 'role'> &
  Readonly<{ workspace: Workspace; member: WorkspaceMember }>;

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

      if (isUser(args.member)) {
        await insertUserWorkspaceSettings(
          { workspaceMembership },
          optionsWithTransaction,
        );
      }

      return workspaceMembership;
    },
    options,
  );

  return insertedWorkspaceMembership;
}

function makeDoInsertWorkspaceMembershipArgs(
  args: InsertWorkspaceMembershipArgs,
): DoInsertWorkspaceMembershipArgs {
  const doInsertWorkspaceMembershipArgs: Mutable<
    Partial<DoInsertWorkspaceMembershipArgs>
  > = {
    workspaceId: args.workspace.id,
    role: args.role,
  };

  if (isUser(args.member)) {
    doInsertWorkspaceMembershipArgs.userMemberId = args.member.id;
  } else {
    doInsertWorkspaceMembershipArgs.botMemberId = args.member.id;
  }

  return doInsertWorkspaceMembershipArgs as DoInsertWorkspaceMembershipArgs;
}

export type DoInsertWorkspaceMembershipArgs = Pick<
  WorkspaceMembership,
  'workspaceId' | 'userMemberId' | 'botMemberId' | 'role'
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
