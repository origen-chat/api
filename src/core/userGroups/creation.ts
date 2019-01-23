import { doInTransaction, insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { NamedChannel } from '../channels';
import { addUsersToUserGroup } from '../userGroupMemberships';

import { userGroupsTableName } from './constants';
import { UserGroup } from './types';

export type CreateUserGroupArgs = InsertUserGroupIntoDBArgs &
  Readonly<{
    members: ReadonlyArray<User>;
    channels: ReadonlyArray<NamedChannel>;
  }>;

export async function createUserGroup(
  args: CreateUserGroupArgs,
  options: DBOptions = {},
): Promise<UserGroup> {
  const createdUserGroup = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    const insertUserGroupIntoDBArgs: InsertUserGroupIntoDBArgs = {
      ...args,
    };

    const userGroup = await insertUserGroupIntoDB(
      insertUserGroupIntoDBArgs as InsertUserGroupIntoDBArgs,
      optionsWithTransaction,
    );

    await addUsersToUserGroup({ userGroup, users: args.members });

    return userGroup;
  }, options);

  return createdUserGroup;
}

type InsertUserGroupIntoDBArgs = Readonly<{ workspace: Workspace }> &
  Pick<UserGroup, 'name'> &
  Partial<Pick<UserGroup, 'description'>>;

async function insertUserGroupIntoDB(
  args: InsertUserGroupIntoDBArgs,
  options: DBOptions = {},
): Promise<UserGroup> {
  const doInsertUserGroupIntoDBArgs = makeDoInsertUserGroupIntoDBArgs(args);

  const userGroup = await doInsertUserGroupIntoDB(
    doInsertUserGroupIntoDBArgs,
    options,
  );

  return userGroup;
}

function makeDoInsertUserGroupIntoDBArgs(
  args: InsertUserGroupIntoDBArgs,
): DoInsertUserGroupIntoDBArgs {
  const doInsertUserGroupIntoDBArgs: DoInsertUserGroupIntoDBArgs = {
    name: args.name,
    workspaceId: args.workspace.id,
    description: args.description,
  };

  return doInsertUserGroupIntoDBArgs;
}

export type DoInsertUserGroupIntoDBArgs = Pick<
  UserGroup,
  'name' | 'workspaceId'
> &
  Partial<Pick<UserGroup, 'description'>>;

export async function doInsertUserGroupIntoDB(
  args: DoInsertUserGroupIntoDBArgs,
  options: DBOptions = {},
): Promise<UserGroup> {
  const userGroup = await insertIntoDB(
    { data: args, tableName: userGroupsTableName },
    options,
  );

  return userGroup;
}
