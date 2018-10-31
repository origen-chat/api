import { RichText } from '../richText';
import { ID, Identifiable, Nullable, Timestamps } from '../types';

export type Message = UserMessage | BotMessage;

/**
 * Message sent by a user.
 */
export type UserMessage = Readonly<{
  userSenderId: ID;
  botSenderId: null;
}> &
  MessageSharedData;

type MessageSharedData = Readonly<{
  channelId: ID;

  parentMessageId: Nullable<ID>;
  content: RichText;
}> &
  Identifiable &
  Timestamps;

/**
 * Message sent by a bot.
 */
export type BotMessage = Readonly<{
  userSenderId: null;
  botSenderId: ID;
}> &
  MessageSharedData;
