import { Channel } from '../channels';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';

import { channelPinsTableName } from './constants';
import { ChannelPin } from './types';

export async function deleteChannelPin(
  channelPin: ChannelPin,
  options: DBOptions = {},
): Promise<ChannelPin> {
  await deleteChannelPinFromDB(channelPin, options);

  return channelPin;
}

export async function deleteChannelPinFromDB(
  channelPin: ChannelPin,
  options: DBOptions = {},
): Promise<ChannelPin> {
  await doDeleteChannelPinFromDB(channelPin, options);

  return channelPin;
}

export async function doDeleteChannelPinFromDB(
  channelPin: ChannelPin,
  options: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(channelPinsTableName)
    .where({ id: channelPin.id });

  maybeAddTransactionToQuery(query, options);

  await query;
}

export async function deleteAllChannelPins(
  channel: Channel,
  options: DBOptions = {},
): Promise<Channel> {
  await deleteAllChannelPinsFromDB(channel, options);

  return channel;
}

async function deleteAllChannelPinsFromDB(
  channel: Channel,
  options: DBOptions = {},
): Promise<Channel> {
  await doDeleteAllChannelPinsFromDB(channel, options);

  return channel;
}

async function doDeleteAllChannelPinsFromDB(
  channel: Channel,
  options: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(channelPinsTableName)
    .where({ channelId: channel.id });

  maybeAddTransactionToQuery(query, options);

  await query;
}
