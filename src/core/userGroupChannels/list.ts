import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { userGroupChannelsTableName } from './constants';
import { UserGroupChannel } from './types';
import { UserGroup } from '../userGroups';
import { NamedChannel, channelsTableName } from '../channels';

export type GetUserGroupChannelsArgs = Readonly<{ userGroup: UserGroup }>;

export async function getUserGroupChannels(
  args: GetUserGroupChannelsArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserGroupChannel>> {
  const query = db
    .select(`${userGroupChannelsTableName}.*`)
    .from(userGroupChannelsTableName)
    .where(`${userGroupChannelsTableName}.userGroupId`, args.userGroup.id);

  maybeAddTransactionToQuery(query, options);

  const userGroupChannels = await query;

  return userGroupChannels;
}

export type GetChannelsInUserGroupArgs = Readonly<{ userGroup: UserGroup }>;

export async function getChannelsInUserGroup(
  args: GetChannelsInUserGroupArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<NamedChannel>> {
  const query = db
    .select(`${channelsTableName}.*`)
    .from(channelsTableName)
    .join(
      userGroupChannelsTableName,
      `${userGroupChannelsTableName}.channelId`,
      `${channelsTableName}.id`,
    )
    .where(`${userGroupChannelsTableName}.userGroupId`, args.userGroup.id);

  maybeAddTransactionToQuery(query, options);

  const channelsInUserGroup = await query;

  return channelsInUserGroup;
}
