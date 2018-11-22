import { ChannelPin } from './types';

export function isChannelPin(value: any): value is ChannelPin {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.channelId &&
    value.messageId &&
    value.authorId
  );
}
