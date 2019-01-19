import { insertIntoDB, InsertIntoDBOptions } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { userGroupMembershipsTableName } from './constants';
import { UserGroupMembership } from './types';
import { UserGroup } from '../userGroups';
import { enqueuePostCreateUserGroupMembershipsJob } from './jobs';

export type CreateUserGroupMembershipsArgs = InsertUserGroupMembershipsIntoDBArgs;

export async function createUserGroupMemberships(
  args: CreateUserGroupMembershipsArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserGroupMembership>> {
  const userGroupMemberships = await insertUserGroupMembershipsIntoDB(args, {
    ...options,
    onConflictDoNothing: true,
  });

  const memberIds = userGroupMemberships.map(
    userGroupMembership => userGroupMembership.memberId,
  );

  enqueuePostCreateUserGroupMembershipsJob({
    memberIds,
    userGroup: args.userGroup,
  });

  return userGroupMemberships;
}

type InsertUserGroupMembershipsIntoDBArgs = Readonly<{
  userGroup: UserGroup;
  users: ReadonlyArray<User>;
}>;

async function insertUserGroupMembershipsIntoDB(
  args: InsertUserGroupMembershipsIntoDBArgs,
  options: InsertIntoDBOptions = {},
): Promise<ReadonlyArray<UserGroupMembership>> {
  const doInsertUserGroupMembershipsIntoDBArgs = makeDoInsertUserGroupMembershipsIntoDBArgs(
    args,
  );

  const userGroupMemberships = await doInsertUserGroupMembershipsIntoDB(
    doInsertUserGroupMembershipsIntoDBArgs,
    options,
  );

  return userGroupMemberships;
}

function makeDoInsertUserGroupMembershipsIntoDBArgs(
  args: InsertUserGroupMembershipsIntoDBArgs,
): DoInsertUserGroupMembershipsIntoDBArgs {
  const doInsertUserGroupMembershipsIntoDBArgs: DoInsertUserGroupMembershipsIntoDBArgs = args.users.map(
    user => ({
      memberId: user.id,
      userGroupId: args.userGroup.id,
    }),
  );

  return doInsertUserGroupMembershipsIntoDBArgs;
}

export type DoInsertUserGroupMembershipsIntoDBArgs = ReadonlyArray<
  Pick<UserGroupMembership, 'userGroupId' | 'memberId'>
>;

export async function doInsertUserGroupMembershipsIntoDB(
  args: DoInsertUserGroupMembershipsIntoDBArgs,
  options: InsertIntoDBOptions = {},
): Promise<ReadonlyArray<UserGroupMembership>> {
  const userGroupMemberships = await insertIntoDB(
    { data: args, tableName: userGroupMembershipsTableName },
    { ...options },
  );

  return userGroupMemberships;
}
