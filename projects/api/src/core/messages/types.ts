import { Bot } from '../bots';
import { RichText } from '../richText';
import { ID, Identifiable, Nullable, Timestamps, URL } from '../types';
import { User } from '../users';

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
  content: MessageContent;
}> &
  Identifiable &
  Timestamps;

export type MessageContent = Readonly<{
  imageUrls: ReadonlyArray<URL>;
  richText: RichText;
}>;

/**
 * Message sent by a bot.
 */
export type BotMessage = Readonly<{
  userSenderId: null;
  botSenderId: ID;
}> &
  MessageSharedData;

export type MessageSender = User | Bot;
