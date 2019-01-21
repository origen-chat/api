import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { userGroupMembershipsTableName } from './constants';
import { UserGroupMembership } from './types';
import { UserGroup } from '../userGroups';
import { User, usersTableName } from '../users';

export type GetUserGroupMembershipsArgs = Readonly<{ userGroup: UserGroup }>;

export async function getUserGroupMemberships(
  args: GetUserGroupMembershipsArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserGroupMembership>> {
  const query = db
    .select(`${userGroupMembershipsTableName}.*`)
    .from(userGroupMembershipsTableName)
    .where(`${userGroupMembershipsTableName}.userGroupId`, args.userGroup.id);

  maybeAddTransactionToQuery(query, options);

  const userGroupMemberships = await query;

  return userGroupMemberships;
}

export type GetMembersInUserGroupArgs = Readonly<{ userGroup: UserGroup }>;

export async function getMembersInUserGroup(
  args: GetMembersInUserGroupArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<User>> {
  const query = db
    .select(`${usersTableName}.*`)
    .from(usersTableName)
    .join(
      userGroupMembershipsTableName,
      `${userGroupMembershipsTableName}.memberId`,
      `${usersTableName}.id`,
    )
    .where(`${userGroupMembershipsTableName}.userGroupId`, args.userGroup.id);

  maybeAddTransactionToQuery(query, options);

  const channelsInUserGroup = await query;

  return channelsInUserGroup;
}
