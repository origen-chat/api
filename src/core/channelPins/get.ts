import { Channel } from '../channels';
import db, { maybeAddTransactionToQuery } from '../db';
import { Message } from '../messages';
import { DBOptions } from '../types';
import { channelPinsTableName } from './constants';
import { ChannelPin } from './types';

export async function getChannelPinById(
  id: ChannelPin['id'],
  options: DBOptions = {},
): Promise<ChannelPin | null> {
  const channelPin = await getChannelPinByFromDB({ id }, options);

  return channelPin;
}

export type GetChannelPinByFromDBArgs =
  | Pick<ChannelPin, 'id'> &
      Readonly<{ channelId?: undefined; messageId?: undefined }>
  | Readonly<{
      channelId: Channel['id'];
      messageId: Message['id'];
      id?: undefined;
    }>;

async function getChannelPinByFromDB(
  args: GetChannelPinByFromDBArgs,
  options: DBOptions = {},
): Promise<ChannelPin | null> {
  const query = db
    .select(`${channelPinsTableName}.*`)
    .from(channelPinsTableName)
    .first();

  if (args.id) {
    query.where({ id: args.id });
  } else if (args.channelId) {
    query.where({ channelId: args.channelId, messageId: args.messageId });
  }

  maybeAddTransactionToQuery(query, options);

  const channelPin: ChannelPin | null = await query;

  return channelPin;
}

export type GetChannelPinByChannelAndMessageArgs = Readonly<{
  channel: Channel;
  message: Message;
}>;

export async function getChannelPinByChannelAndMessage(
  args: GetChannelPinByChannelAndMessageArgs,
  options: DBOptions = {},
): Promise<ChannelPin | null> {
  const channelPin = await getChannelPinByFromDB(
    {
      channelId: args.channel.id,
      messageId: args.message.id,
    },
    options,
  );

  return channelPin;
}

export async function getChannelPinsByIds(
  ids: ReadonlyArray<ChannelPin['id']>,
  options: DBOptions = {},
): Promise<ReadonlyArray<ChannelPin>> {
  const channelPins = await getChannelPinsByFromDB({ ids }, options);

  return channelPins;
}

export type GetChannelPinsByFromDBArgs = Readonly<{
  ids: ReadonlyArray<ChannelPin['id']>;
}>;

async function getChannelPinsByFromDB(
  args: GetChannelPinsByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<ChannelPin>> {
  const query = db
    .select(`${channelPinsTableName}.*`)
    .from(channelPinsTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const channelPins: ReadonlyArray<ChannelPin> = await query;

  return channelPins;
}
