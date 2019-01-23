import { doInTransaction, insertIntoDB } from '../db';
import { DBOptions, Mutable } from '../types';
import { isUser, User } from '../users';
import { createUserWorkspaceSettings } from '../userWorkspaceSettings/creation';
import { Workspace } from '../workspaces';

import { workspaceMembershipsTableName } from './constants';
import {
  WorkspaceMember,
  WorkspaceMembership,
  WorkspaceMembershipRole,
} from './types';
import { maybeUpdateSubscriptionQuantityInStripe } from './subscriptions';

export async function createWorkspaceOwnerMembership(
  workspace: Workspace,
  owner: User,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const args: InsertWorkspaceMembershipIntoDBArgs = {
    workspace,
    member: owner,
    role: WorkspaceMembershipRole.Owner,
  };

  const workspaceOwnerMembership = await createWorkspaceMembership(
    args,
    options,
  );

  return workspaceOwnerMembership;
}

export type CreateWorkspaceMembershipArgs = InsertWorkspaceMembershipIntoDBArgs;

export async function createWorkspaceMembership(
  args: CreateWorkspaceMembershipArgs,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const workspaceMembership = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    const createdWorkspaceMembership = await insertWorkspaceMembershipIntoDB(
      args,
      optionsWithTransaction,
    );

    if (isUser(args.member)) {
      await createUserWorkspaceSettings(
        { workspaceMembership: createdWorkspaceMembership },
        optionsWithTransaction,
      );
    }

    await maybeUpdateSubscriptionQuantityInStripe(
      { workspace: args.workspace },
      optionsWithTransaction,
    );

    return createdWorkspaceMembership;
  }, options);

  return workspaceMembership;
}

export type InsertWorkspaceMembershipIntoDBArgs = Pick<
  WorkspaceMembership,
  'role'
> &
  Readonly<{ workspace: Workspace; member: WorkspaceMember }>;

export async function insertWorkspaceMembershipIntoDB(
  args: InsertWorkspaceMembershipIntoDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const doInsertWorkspaceMembershipArgs = makeDoInsertWorkspaceMembershipIntoDBArgs(
    args,
  );

  const workspaceMembership = await doInsertWorkspaceMembershipIntoDB(
    doInsertWorkspaceMembershipArgs,
    options,
  );

  return workspaceMembership;
}

function makeDoInsertWorkspaceMembershipIntoDBArgs(
  args: InsertWorkspaceMembershipIntoDBArgs,
): DoInsertWorkspaceMembershipIntoDBArgs {
  const doInsertWorkspaceMembershipIntoDBArgs: Mutable<
    Partial<DoInsertWorkspaceMembershipIntoDBArgs>
  > = {
    workspaceId: args.workspace.id,
    role: args.role,
  };

  if (isUser(args.member)) {
    doInsertWorkspaceMembershipIntoDBArgs.userMemberId = args.member.id;
  } else {
    doInsertWorkspaceMembershipIntoDBArgs.botMemberId = args.member.id;
  }

  return doInsertWorkspaceMembershipIntoDBArgs as any;
}

export type DoInsertWorkspaceMembershipIntoDBArgs = Pick<
  WorkspaceMembership,
  'workspaceId' | 'userMemberId' | 'botMemberId' | 'role'
>;

export async function doInsertWorkspaceMembershipIntoDB(
  args: DoInsertWorkspaceMembershipIntoDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const workspaceMembership = await insertIntoDB(
    { data: args, tableName: workspaceMembershipsTableName },
    options,
  );

  return workspaceMembership;
}
