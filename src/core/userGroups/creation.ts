import { doInTransaction, insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { userGroupsTableName } from './constants';
import { UserGroup } from './types';

export type CreateUserGroupArgs = InsertUserGroupIntoDBArgs &
  Readonly<{ members: ReadonlyArray<User> }>;

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
  const userGroup = await doInsertUserGroupIntoDB(args, options);

  return userGroup;
}

export type DoInsertUserIntoDBArgs = Pick<UserGroup, 'name' | 'workspaceId'> &
  Partial<Pick<UserGroup, 'description'>>;

export async function doInsertUserGroupIntoDB(
  args: DoInsertUserIntoDBArgs,
  options: DBOptions = {},
): Promise<UserGroup> {
  const userGroup = await insertIntoDB(
    { data: args, tableName: userGroupsTableName },
    options,
  );

  return userGroup;
}
