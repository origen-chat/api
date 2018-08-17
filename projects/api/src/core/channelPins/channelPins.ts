import { Channel } from '../channels';
import db from '../db';
import { Message } from '../messages';
import { Nullable } from '../types';
import { channelPinsTableName } from './constants';
import { ChannelPin } from './types';

export async function pinMessage(
  channel: Channel,
  message: Message,
): Promise<ChannelPin> {
  return insertChannelPin(channel, message);
}

export async function insertChannelPin(
  channel: Channel,
  message: Message,
): Promise<ChannelPin> {
  const data = { channelId: channel.id, messageId: message.id };

  const channelPin: ChannelPin = await db
    .insert(data)
    .into(channelPinsTableName)
    .returning('*');

  return channelPin;
}

export async function getChannelPin(
  channel: Channel,
  message: Message,
): Promise<Nullable<ChannelPin>> {
  const channelPin: Nullable<ChannelPin> = await db
    .select('*')
    .from(channelPinsTableName)
    .where({ channelId: channel.id, messageId: message.id });

  return channelPin;
}

export async function isMessagePinned(
  channel: Channel,
  message: Message,
): Promise<boolean> {
  return false;
}

export async function unpinMessage(
  channel: Channel,
  message: Message,
): Promise<ChannelPin> {
  const channelPin = await getChannelPin(channel, message);

  if (!channelPin) {
    throw new Error('message is not pinned');
  }

  return deleteChannelPin(channelPin);
}

export async function deleteChannelPin(
  channelPin: ChannelPin,
): Promise<ChannelPin> {
  await db
    .delete()
    .from(channelPinsTableName)
    .where({ id: channelPin.id });

  return channelPin;
}

export async function unpinAllMessages(channel: Channel): Promise<void> {
  await deleteAllChannelPins(channel);
}

export async function deleteAllChannelPins(channel: Channel): Promise<void> {
  await db
    .delete()
    .from(channelPinsTableName)
    .where({ channelId: channel.id });
}
