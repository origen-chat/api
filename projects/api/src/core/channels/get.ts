import { channelMembershipsTableName } from '../channelMemberships';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID, Nullable } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { channelsTableName } from './constants';
import { Channel, ChannelType, DirectMessagesChannel } from './types';

export async function getChannelById(id: ID): Promise<Nullable<Channel>> {
  const channel = await getChannelBy({ id });

  return channel;
}

type GetChannelByArgs = Pick<Channel, 'id'>;

async function getChannelBy(
  args: GetChannelByArgs,
  options: DBOptions = {},
): Promise<Nullable<Channel>> {
  const query = db
    .select('*')
    .from(channelsTableName)
    .where(args)
    .first();

  maybeAddTransactionToQuery(query, options);

  const channel: Nullable<Channel> = await query;

  return channel;
}

export type GetDirectMessagesChannelByMembersArgs = Readonly<{
  members: ReadonlyArray<User>;
  workspace: Workspace;
}>;

export async function getDirectMessagesChannelByMembers(
  args: GetDirectMessagesChannelByMembersArgs,
  options: DBOptions = {},
): Promise<DirectMessagesChannel> {
  const memberIds = args.members.map(member => member.id);

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
      workspaceId: args.workspace.id,
    })
    .whereIn('memberId', memberIds)
    .groupBy(`${channelsTableName}.id`)
    .first();

  maybeAddTransactionToQuery(query, options);

  const channel = await query;

  return channel;
}

export async function getChannelsByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Channel>> {
  const channels = await getChannelsBy({ ids }, options);

  return channels;
}

type GetChannelsByArgs = Readonly<{ ids: ReadonlyArray<ID> }>;

async function getChannelsBy(
  args: GetChannelsByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Channel>> {
  const query = db.select('*').from(channelsTableName);

  if ((args as any).ids) {
    query.whereIn('id', (args as any).ids);
  }

  maybeAddTransactionToQuery(query, options);

  const channels: ReadonlyArray<Channel> = await query;

  return channels;
}
