import db, { maybeAddTransactionToQuery } from '../db';

import { DBOptions } from '../types';
import { cacheChannel } from './cache';
import { channelsTableName } from './constants';
import { Channel, NamedChannel } from './types';

export type UpdateChannelArgs = UpdateChannelInDBArgs;

export async function updateChannel(
  channel: Channel,
  args: UpdateChannelArgs,
  options: DBOptions = {},
): Promise<Channel> {
  const updatedChannel = await updateChannelInDB(channel, args, options);

  await cacheChannel(updatedChannel);

  return updatedChannel;
}

export type UpdateChannelInDBArgs = DoUpdateChannelInDBArgs;

export async function updateChannelInDB(
  channel: Channel,
  args: UpdateChannelInDBArgs,
  options: DBOptions = {},
): Promise<Channel> {
  const updatedChannel = await doUpdateChannelInDB(channel, args, options);

  return updatedChannel;
}

export type DoUpdateChannelInDBArgs = Partial<
  Pick<NamedChannel, 'name' | 'topic' | 'purpose'>
>;

export async function doUpdateChannelInDB(
  channel: Channel,
  args: UpdateChannelInDBArgs,
  options: DBOptions = {},
): Promise<Channel> {
  const query = db(channelsTableName)
    .update(args)
    .where({ id: channel.id })
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [updatedChannel] = await query;

  return updatedChannel;
}
