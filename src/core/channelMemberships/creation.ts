import { Channel } from '../channels';
import { doInTransaction, insertIntoDB, InsertIntoDBOptions } from '../db';
import { DBOptions } from '../types';
import { createManyUserChannelSettings } from '../userChannelSettings';
import { User } from '../users';

import { channelMembershipsTableName } from './constants';
import { ChannelMembership, ChannelMembershipRole } from './types';

export type CreateChannelMembershipArgs = Readonly<{
  channel: Channel;
  user: User;
}> &
  Pick<ChannelMembership, 'role'>;

export async function createChannelMembership(
  args: CreateChannelMembershipArgs,
  options: DBOptions = {},
): Promise<ChannelMembership> {
  const createChannelMembershipsArgs: CreateChannelMembershipsArgs = {
    channel: args.channel,
    users: [args.user],
    role: args.role,
  };

  const [channelMembership] = await createChannelMemberships(
    createChannelMembershipsArgs,
    options,
  );

  return channelMembership;
}

export type CreateChannelMembershipsArgs = InsertChannelMembershipsIntoDBArgs;

export async function createChannelMemberships(
  args: CreateChannelMembershipsArgs,
  options: InsertIntoDBOptions = {},
): Promise<ReadonlyArray<ChannelMembership>> {
  const channelMemberships = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    const createdChannelMemberships = await insertChannelMembershipsIntoDB(
      args,
      optionsWithTransaction,
    );

    await createManyUserChannelSettings(
      { channelMemberships: createdChannelMemberships },
      optionsWithTransaction,
    );

    return createdChannelMemberships;
  }, options);

  return channelMemberships;
}

type InsertChannelMembershipsIntoDBArgs = Readonly<{
  channel: Channel;
  users: ReadonlyArray<User>;
  role: ChannelMembershipRole;
}>;

async function insertChannelMembershipsIntoDB(
  args: InsertChannelMembershipsIntoDBArgs,
  options: InsertIntoDBOptions = {},
): Promise<ReadonlyArray<ChannelMembership>> {
  const doInsertChannelMembershipsArgs = makeDoInsertChannelMembershipsArgs(
    args,
  );

  const channelMemberships = await doInsertChannelMembershipsIntoDB(
    doInsertChannelMembershipsArgs,
    options,
  );

  return channelMemberships;
}

function makeDoInsertChannelMembershipsArgs(
  args: InsertChannelMembershipsIntoDBArgs,
): DoInsertChannelMembershipsIntoDBArgs {
  const doInsertChannelMembershipsArgs: DoInsertChannelMembershipsIntoDBArgs = args.users.map(
    user => ({
      channelId: args.channel.id,
      memberId: user.id,
      role: args.role,
    }),
  );

  return doInsertChannelMembershipsArgs;
}

type DoInsertChannelMembershipsIntoDBArgs = ReadonlyArray<
  Pick<ChannelMembership, 'memberId' | 'channelId' | 'role'>
>;

async function doInsertChannelMembershipsIntoDB(
  args: DoInsertChannelMembershipsIntoDBArgs,
  options: InsertIntoDBOptions = {},
): Promise<ReadonlyArray<ChannelMembership>> {
  const channelMemberships = await insertIntoDB(
    { data: args, tableName: channelMembershipsTableName },
    options,
  );

  return channelMemberships;
}
