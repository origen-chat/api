import { Channel } from '../channels';
import db from '../db';
import { Message } from '../messages';
import { ID, Nullable } from '../types';
import { channelPinsTableName } from './constants';
import { ChannelPin } from './types';

export async function pinMessage(
  channel: Channel,
  message: Message,
): Promise<ChannelPin> {
  return insertChannelPin({ channelId: channel.id, messageId: message.id });
}

type InsertChannelPinArgs = Pick<ChannelPin, 'channelId' | 'messageId'>;

async function insertChannelPin(
  args: InsertChannelPinArgs,
): Promise<ChannelPin> {
  const channelPin: ChannelPin = await db
    .insert(args)
    .into(channelPinsTableName)
    .returning('*');

  return channelPin;
}

export async function getChannelPinByChannelAndMessage(
  channel: Channel,
  message: Message,
): Promise<Nullable<ChannelPin>> {
  const channelPin = await getChannelPinBy({
    channelId: channel.id,
    messageId: message.id,
  });

  return channelPin;
}

export async function getChannelPinById(id: ID): Promise<Nullable<ChannelPin>> {
  const channelPin = await getChannelPinBy({ id });

  return channelPin;
}

type GetChannelPinByArgs =
  | Pick<ChannelPin, 'id'>
  | Pick<ChannelPin, 'channelId' | 'messageId'>;

async function getChannelPinBy(
  args: GetChannelPinByArgs,
): Promise<Nullable<ChannelPin>> {
  const channelPin: Nullable<ChannelPin> = await db
    .select('*')
    .from(channelPinsTableName)
    .where(args)
    .first();

  return channelPin;
}

export async function isMessagePinned(
  channel: Channel,
  message: Message,
): Promise<boolean> {
  const channelPin = await getChannelPinByChannelAndMessage(channel, message);

  return !!channelPin;
}

export async function unpinMessage(
  channel: Channel,
  message: Message,
): Promise<ChannelPin> {
  const channelPin = await getChannelPinByChannelAndMessage(channel, message);

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
