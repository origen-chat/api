import db, { maybeAddTransactionToQuery } from '../db';

import { DBOptions } from '../types';
import { channelsTableName } from './constants';
import { Channel, NamedChannel } from './types';

export type UpdateChannelArgs = Partial<
  Pick<NamedChannel, 'name' | 'topic' | 'purpose'>
>;

export async function updateChannel(
  channel: Channel,
  args: UpdateChannelArgs,
  options: DBOptions = {},
): Promise<Channel> {
  const query = db(channelsTableName)
    .update(args)
    .where({ id: channel.id })
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const updatedChannel: Channel = await query;

  return updatedChannel;
}
