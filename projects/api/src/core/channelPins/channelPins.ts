import { Channel } from '../channels';
import { DBOptions } from '../types';
import { createChannelPin, CreateChannelPinArgs } from './creation';
import { deleteAllChannelPins, deleteChannelPin } from './deletion';
import {
  getChannelPinByChannelAndMessage,
  GetChannelPinByChannelAndMessageArgs,
} from './get';
import { ChannelPin } from './types';

export type PinMessageArgs = CreateChannelPinArgs;

export async function pinMessage(
  args: PinMessageArgs,
  options: DBOptions = {},
): Promise<ChannelPin> {
  const channelPin = await createChannelPin(args, options);

  return channelPin;
}

export type IsMessagePinnedArgs = GetChannelPinByChannelAndMessageArgs;

export async function isMessagePinned(
  args: IsMessagePinnedArgs,
  options: DBOptions = {},
): Promise<boolean> {
  const channelPin = await getChannelPinByChannelAndMessage(args, options);

  return !!channelPin;
}

export type UnpinMessageArgs = GetChannelPinByChannelAndMessageArgs;

export async function unpinMessage(
  args: UnpinMessageArgs,
  options: DBOptions = {},
): Promise<ChannelPin> {
  const channelPin = await getChannelPinByChannelAndMessage(args, options);

  if (!channelPin) {
    throw new Error('message is not pinned');
  }

  return deleteChannelPin(channelPin, options);
}

export async function unpinAllMessages(
  channel: Channel,
  options: DBOptions = {},
): Promise<Channel> {
  await deleteAllChannelPins(channel, options);

  return channel;
}
