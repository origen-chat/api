import { channelMembershipsTableName } from '../channelMemberships';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { maybeCacheChannel } from './cache';
import { channelsTableName } from './constants';
import { Channel, ChannelType, DirectMessagesChannel } from './types';

export async function getChannelById(id: ID): Promise<Channel | null> {
  const channel = await getChannelByFromDB({ id });

  await maybeCacheChannel(channel);

  return channel;
}

type GetChannelByFromDBArgs =
  | Pick<Channel, 'id'> &
      Readonly<{ memberIds?: undefined; workspaceId?: undefined }>
  | Readonly<{
      memberIds: ReadonlyArray<ID>;
      workspaceId: ID;
      id?: undefined;
    }>;

async function getChannelByFromDB(
  args: GetChannelByFromDBArgs,
  options: DBOptions = {},
): Promise<Channel | null> {
  const query = db
    .select(`${channelsTableName}.*`)
    .from(channelsTableName)
    .first();

  if (args.id) {
    query.where({ id: args.id });
  } else if (args.memberIds) {
    query
      .innerJoin(
        channelsTableName,
        `${channelsTableName}.id`,
        `${channelMembershipsTableName}.channelId`,
      )
      .where({
        [`${channelsTableName}.type`]: ChannelType.DirectMessages,
        workspaceId: args.workspaceId,
      })
      .whereIn('memberId', args.memberIds as any)
      .groupBy(`${channelsTableName}.id`);
  }

  maybeAddTransactionToQuery(query, options);

  const channel: Channel | null = await query;

  return channel;
}

export type GetDirectMessagesChannelByMembersArgs = Readonly<{
  members: ReadonlyArray<User>;
  workspace: Workspace;
}>;

export async function getDirectMessagesChannelByMembers(
  args: GetDirectMessagesChannelByMembersArgs,
  options: DBOptions = {},
): Promise<DirectMessagesChannel | null> {
  const memberIds = args.members.map(member => member.id);
  const workspaceId = args.workspace.id;

  const channel = (await getChannelByFromDB(
    {
      memberIds,
      workspaceId,
    },
    options,
  )) as DirectMessagesChannel | null;

  if (channel) {
    await maybeCacheChannel(channel);
  }

  return channel;
}

export async function getChannelsByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Channel>> {
  const channels = await getChannelsByFromDB({ ids }, options);

  return channels;
}

type GetChannelsByFromDBArgs = Readonly<{ ids: ReadonlyArray<ID> }>;

async function getChannelsByFromDB(
  args: GetChannelsByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Channel>> {
  const query = db.select(`${channelsTableName}.*`).from(channelsTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const channels: ReadonlyArray<Channel> = await query;

  return channels;
}
