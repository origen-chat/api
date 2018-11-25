import { Channel, DirectMessagesChannel } from '../channels';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { channelMembershipsTableName } from './constants';
import { ChannelMembership, ChannelMembershipRole } from './types';

export type InsertChannelMembershipIntoDBArgs = Readonly<{
  channel: Channel;
  user: User;
}> &
  Pick<ChannelMembership, 'role'>;

export async function insertChannelMembershipIntoDB(
  args: InsertChannelMembershipIntoDBArgs,
  options: DBOptions = {},
): Promise<ChannelMembership> {
  const doInsertChannelMembershipArgs: DoInsertChannelMembershipIntoDBArgs = makeDoInsertChannelMembershipIntoDBArgs(
    args,
  );

  const channelMembership = await doInsertChannelMembershipIntoDB(
    doInsertChannelMembershipArgs,
    options,
  );

  return channelMembership;
}

function makeDoInsertChannelMembershipIntoDBArgs(
  args: InsertChannelMembershipIntoDBArgs,
): DoInsertChannelMembershipIntoDBArgs {
  const doInsertChannelMembershipArgs = {
    channelId: args.channel.id,
    memberId: args.user.id,
    role: args.role,
  };

  return doInsertChannelMembershipArgs;
}

export type DoInsertChannelMembershipIntoDBArgs = Pick<
  ChannelMembership,
  'channelId' | 'memberId' | 'role'
>;

export async function doInsertChannelMembershipIntoDB(
  args: DoInsertChannelMembershipIntoDBArgs,
  options: DBOptions = {},
): Promise<ChannelMembership> {
  const query = db
    .insert(args)
    .into(channelMembershipsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [channelMembership] = await query;

  return channelMembership;
}

export type InsertChannelMembershipsIntoDBArgs<
  TChannel extends Channel = Channel,
  TRole extends ChannelMembershipRole = ChannelMembershipRole.Member
> = Readonly<{
  channel: TChannel;
  users: ReadonlyArray<User>;
  role: TChannel extends DirectMessagesChannel
    ? ChannelMembershipRole.Member
    : TRole;
}>;

export async function insertChannelMembershipsIntoDB<
  TChannel extends Channel,
  TRole extends ChannelMembershipRole = ChannelMembershipRole.Member
>(
  args: InsertChannelMembershipsIntoDBArgs<TChannel, TRole>,
  options: DBOptions = {},
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

function makeDoInsertChannelMembershipsArgs<
  TChannel extends Channel,
  TRole extends ChannelMembershipRole = ChannelMembershipRole.Member
>(
  args: InsertChannelMembershipsIntoDBArgs<TChannel, TRole>,
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

export type DoInsertChannelMembershipsIntoDBArgs = ReadonlyArray<
  DoInsertChannelMembershipIntoDBArgs
>;

export async function doInsertChannelMembershipsIntoDB(
  args: DoInsertChannelMembershipsIntoDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<ChannelMembership>> {
  const query = db
    .insert(args)
    .into(channelMembershipsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const channelMemberships = await query;

  return channelMemberships;
}
