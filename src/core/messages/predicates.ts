import { BotMessage, Message, SystemMessage, UserMessage } from './types';

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

export function isMessageSentByUser(message: Message): message is UserMessage {
  return !!message.userSenderId;
}

export function isMessageSentByBot(message: Message): message is BotMessage {
  return !!message.botSenderId;
}

export function isMessageSentBySystem(
  message: Message,
): message is SystemMessage {
  return !message.botSenderId && !message.userSenderId;
}
