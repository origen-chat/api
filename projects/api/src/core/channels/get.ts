import { channelMembershipsTableName } from '../channelMemberships';
import db from '../db';
import { DBOptions, ID, Nullable } from '../types';
import { User } from '../users';
import { channelsTableName } from './constants';
import { Channel, ChannelType, DirectMessagesChannel } from './types';

export async function getChannelById(id: ID): Promise<Nullable<Channel>> {
  return getChannelBy({ id });
}

type GetChannelByArgs = Pick<Channel, 'id'>;

async function getChannelBy(
  args: GetChannelByArgs,
): Promise<Nullable<Channel>> {
  const channel: Nullable<Channel> = await db
    .select('*')
    .from(channelsTableName)
    .where(args)
    .first();

  return channel;
}

export async function getDirectMessagesChannelByMembers(
  members: ReadonlyArray<User>,
  options: DBOptions = {},
): Promise<DirectMessagesChannel> {
  const memberIds = members.map(member => member.id);

  const query = db
    .select(`${channelsTableName}.*`)
    .from(channelMembershipsTableName)
    .innerJoin(
      channelsTableName,
      `${channelsTableName}.id`,
      `${channelMembershipsTableName}.channelId`,
    )
    .where({
      [`${channelsTableName}.type`]: ChannelType.DirectMessages,
    })
    .whereIn('memberId', memberIds)
    .groupBy(`${channelsTableName}.id`)
    .first();

  if (options.transaction) {
    query.transacting(options.transaction);
  }

  const channel = await query;

  return channel;
}
