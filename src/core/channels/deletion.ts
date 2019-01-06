import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { channelsTableName } from './constants';
import { Channel } from './types';

export async function deleteChannel(
  channel: Channel,
  options: DBOptions = {},
): Promise<Channel> {
  await deleteChannelFromDB(channel, options);

  return channel;
}

export async function deleteChannelFromDB(
  channel: Channel,
  options: DBOptions = {},
): Promise<Channel> {
  await doDeleteChannelFromDB(channel, options);

  return channel;
}

export async function doDeleteChannelFromDB(
  channel: Channel,
  options: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(channelsTableName)
    .where({ id: channel.id });

  maybeAddTransactionToQuery(query, options);

  await query;
}
