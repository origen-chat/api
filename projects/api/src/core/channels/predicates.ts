import {
  Channel,
  ChannelPrivacy,
  ChannelType,
  DirectMessagesChannel,
  NamedChannel,
} from './types';

export function isChannel(value: any): value is Channel {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.workspaceId &&
    value.type &&
    value.privacy
  );
}

/**
 * Returns `true` if the channel is public. `false` otherwise.
 */
export function isPublicChannel(
  channel: Channel,
): channel is NamedChannel & Readonly<{ privacy: ChannelPrivacy.Public }> {
  if (isDirectMessagesChannel(channel)) {
    return false;
  }

  if (channel.privacy !== ChannelPrivacy.Public) {
    return false;
  }

  return true;
}

/**
 * Returns `true` if the channel is a named channel. `false` otherwise.
 */
export function isNamedChannel(channel: Channel): channel is NamedChannel {
  return channel.type === ChannelType.Named;
}

/**
 * Returns `true` if the channel is a direct messages channel. `false` otherwise.
 */
export function isDirectMessagesChannel(
  channel: Channel,
): channel is DirectMessagesChannel {
  return channel.type === ChannelType.DirectMessages;
}
