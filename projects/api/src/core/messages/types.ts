import { Bot } from '../bots';
import { RichText } from '../richText';
import { ID, Identifiable, Nullable, Timestamps, URL } from '../types';
import { User } from '../users';

export type Message = UserMessage | BotMessage | SystemMessage;

/**
 * Message sent by a user.
 */
export type UserMessage = Readonly<{
  userSenderId: ID;
  botSenderId: null;
  onlyVisibleTo: null;
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
 * Message sent by the system.
 */
export type SystemMessage = Readonly<{
  userSenderId: null;
  botSenderId: null;
  onlyVisibleTo: ID | null;
}> &
  MessageSharedData;

/**
 * Message sent by a bot.
 */
export type BotMessage = Readonly<{
  userSenderId: null;
  botSenderId: ID;
  onlyVisibleTo: ID | null;
}> &
  MessageSharedData;

export type MessageSender = User | Bot;
