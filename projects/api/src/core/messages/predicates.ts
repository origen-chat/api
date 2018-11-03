import { Message } from './types';

export function isMessage(value: any): value is Message {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.channelId &&
    (value.parentMessageId || value.parentMessageId === null) &&
    (value.userSenderId || value.botSenderId) &&
    value.content
  );
}
