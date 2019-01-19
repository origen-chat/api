import { insertIntoDB, InsertIntoDBOptions } from '../db';
import { DBOptions } from '../types';
import { userGroupChannelsTableName } from './constants';
import { UserGroupChannel } from './types';
import { UserGroup } from '../userGroups';
import { NamedChannel } from '../channels';
import { enqueuePostCreateUserGroupChannelsJob } from './jobs';

export type CreateUserGroupChannelsArgs = InsertUserGroupChannelsIntoDBArgs;

export async function createUserGroupChannels(
  args: CreateUserGroupChannelsArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserGroupChannel>> {
  const userGroupChannels = await insertUserGroupChannelsIntoDB(args, {
    ...options,
    onConflictDoNothing: true,
  });

  const channelIds = userGroupChannels.map(
    userGroupChannel => userGroupChannel.channelId,
  );

  enqueuePostCreateUserGroupChannelsJob({
    channelIds,
    userGroup: args.userGroup,
  });

  return userGroupChannels;
}

type InsertUserGroupChannelsIntoDBArgs = Readonly<{
  userGroup: UserGroup;
  channels: ReadonlyArray<NamedChannel>;
}>;

async function insertUserGroupChannelsIntoDB(
  args: InsertUserGroupChannelsIntoDBArgs,
  options: InsertIntoDBOptions = {},
): Promise<ReadonlyArray<UserGroupChannel>> {
  const doInsertUserGroupChannelsIntoDBArgs = makeDoInsertUserGroupChannelsIntoDBArgs(
    args,
  );

  const userGroupChannels = await doInsertUserGroupChannelsIntoDB(
    doInsertUserGroupChannelsIntoDBArgs,
    options,
  );

  return userGroupChannels;
}

function makeDoInsertUserGroupChannelsIntoDBArgs(
  args: InsertUserGroupChannelsIntoDBArgs,
): DoInsertUserGroupChannelsIntoDBArgs {
  const doInsertUserGroupChannelsIntoDBArgs: DoInsertUserGroupChannelsIntoDBArgs = args.channels.map(
    channel => ({
      channelId: channel.id,
      userGroupId: args.userGroup.id,
    }),
  );

  return doInsertUserGroupChannelsIntoDBArgs;
}

export type DoInsertUserGroupChannelsIntoDBArgs = ReadonlyArray<
  Pick<UserGroupChannel, 'userGroupId' | 'channelId'>
>;

export async function doInsertUserGroupChannelsIntoDB(
  args: DoInsertUserGroupChannelsIntoDBArgs,
  options: InsertIntoDBOptions = {},
): Promise<ReadonlyArray<UserGroupChannel>> {
  const userGroupChannels = await insertIntoDB(
    { data: args, tableName: userGroupChannelsTableName },
    options,
  );

  return userGroupChannels;
}
