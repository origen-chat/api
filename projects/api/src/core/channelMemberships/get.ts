import { Channel } from '../channels';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID, Nullable } from '../types';
import { User } from '../users';
import { channelMembershipsTableName } from './constants';
import { ChannelMembership } from './types';

export async function getChannelMembershipById(
  id: ID,
  options: DBOptions = {},
): Promise<Nullable<ChannelMembership>> {
  const channelMembership = await getChannelMembershipBy({ id }, options);

  return channelMembership;
}

export type GetChannelMembershipByArgs =
  | Pick<ChannelMembership, 'id'>
  | Pick<ChannelMembership, 'channelId' | 'memberId'>;

export async function getChannelMembershipBy(
  args: GetChannelMembershipByArgs,
  options: DBOptions = {},
): Promise<Nullable<ChannelMembership>> {
  const query = db
    .select('*')
    .from(channelMembershipsTableName)
    .where(args)
    .first();

  maybeAddTransactionToQuery(query, options);

  const channemMembership: Nullable<ChannelMembership> = await query;

  return channemMembership;
}

export async function getChannelMembershipByChannelAndUser(
  channel: Channel,
  user: User,
  options: DBOptions = {},
): Promise<Nullable<ChannelMembership>> {
  const args: GetChannelMembershipByArgs = {
    channelId: channel.id,
    memberId: user.id,
  };

  const channelMembership = await getChannelMembershipBy(args, options);

  return channelMembership;
}
