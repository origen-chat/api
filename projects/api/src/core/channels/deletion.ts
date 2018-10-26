import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { channelsTableName } from './constants';
import { Channel } from './types';

/**
 * Deletes a channel.
 */
export async function deleteChannel(
  channel: Channel,
  options: DBOptions = {},
): Promise<Channel> {
  await doDeleteChannel(channel, options);

  return channel;
}

export async function doDeleteChannel(
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
