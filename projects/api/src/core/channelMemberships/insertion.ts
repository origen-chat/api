import { Channel } from '../channels';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { channelMembershipsTableName } from './constants';
import { ChannelMembership } from './types';

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
