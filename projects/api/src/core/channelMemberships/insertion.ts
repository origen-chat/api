import { Channel, DirectMessagesChannel } from '../channels';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { channelMembershipsTableName } from './constants';
import { ChannelMembership, ChannelMembershipRole } from './types';

export type InsertChannelMembershipArgs = Readonly<{
  channel: Channel;
  user: User;
}> &
  Pick<ChannelMembership, 'role'>;

/**
 * Inserts a channel membership.
 */
export async function insertChannelMembership(
  args: InsertChannelMembershipArgs,
  options: DBOptions = {},
): Promise<ChannelMembership> {
  const doInsertChannelMembershipArgs: DoInsertChannelMembershipArgs = makeDoInsertChannelMembershipArgs(
    args,
  );

  const channelMembership = await doInsertChannelMembership(
    doInsertChannelMembershipArgs,
    options,
  );

  return channelMembership;
}

function makeDoInsertChannelMembershipArgs(
  args: InsertChannelMembershipArgs,
): DoInsertChannelMembershipArgs {
  const doInsertChannelMembershipArgs = {
    channelId: args.channel.id,
    memberId: args.user.id,
    role: args.role,
  };

  return doInsertChannelMembershipArgs;
}

export type DoInsertChannelMembershipArgs = Pick<
  ChannelMembership,
  'channelId' | 'memberId' | 'role'
>;

export async function doInsertChannelMembership(
  args: DoInsertChannelMembershipArgs,
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

export type InsertChannelMembershipsArgs<
  TChannel extends Channel = Channel,
  TRole extends ChannelMembershipRole = ChannelMembershipRole.Member
> = Readonly<{
  channel: TChannel;
  users: ReadonlyArray<User>;
  role: TChannel extends DirectMessagesChannel
    ? ChannelMembershipRole.Member
    : TRole;
}>;

export async function insertChannelMemberships<
  TChannel extends Channel,
  TRole extends ChannelMembershipRole = ChannelMembershipRole.Member
>(
  args: InsertChannelMembershipsArgs<TChannel, TRole>,
  options: DBOptions = {},
): Promise<ReadonlyArray<ChannelMembership>> {
  const doInsertChannelMembershipsArgs = makeDoInsertChannelMembershipsArgs(
    args,
  );

  const channelMemberships = await doInsertChannelMemberships(
    doInsertChannelMembershipsArgs,
    options,
  );

  return channelMemberships;
}

function makeDoInsertChannelMembershipsArgs<
  TChannel extends Channel,
  TRole extends ChannelMembershipRole = ChannelMembershipRole.Member
>(
  args: InsertChannelMembershipsArgs<TChannel, TRole>,
): DoInsertChannelMembershipsArgs {
  const doInsertChannelMembershipsArgs: DoInsertChannelMembershipsArgs = args.users.map(
    user => ({
      channelId: args.channel.id,
      memberId: user.id,
      role: args.role,
    }),
  );

  return doInsertChannelMembershipsArgs;
}

export type DoInsertChannelMembershipsArgs = ReadonlyArray<
  DoInsertChannelMembershipArgs
>;

export async function doInsertChannelMemberships(
  args: DoInsertChannelMembershipsArgs,
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
