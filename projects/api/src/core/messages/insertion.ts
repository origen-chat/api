import { Bot } from '../bots';
import { Channel } from '../channels';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, Nullable } from '../types';
import { User } from '../users';
import { messagesTableName } from './constants';
import { BotMessage, Message, UserMessage } from './types';

export type InsertMessageArgs = Pick<Message, 'content'> &
  (Readonly<{ userSender: User } | { botSender: Bot }>) &
  Readonly<{ channel: Channel; parentMessage?: Nullable<Message> }>;

/**
 * Inserts a message.
 */
export async function insertUser(
  args: InsertMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  const doInsertMessageArgs = makeDoInsertMessageArgs(args);

  const message = await doInsertMessage(doInsertMessageArgs, options);

  return message;
}

function makeDoInsertMessageArgs(args: InsertMessageArgs): DoInsertMessageArgs {
  const doInsertMessageArgs: DoInsertMessageArgs = {
    channelId: args.channel.id,
    userSenderId: (args as any).userSender || null,
    botSenderId: (args as any).botSender || null,
    content: args.content,
    parentMessageId: args.parentMessage ? args.parentMessage.id : null,
  };

  return doInsertMessageArgs;
}

export type DoInsertMessageArgs = Pick<Message, 'channelId' | 'content'> &
  (Pick<UserMessage, 'userSenderId'> | Pick<BotMessage, 'botSenderId'>) &
  Partial<Pick<Message, 'parentMessageId'>>;

export async function doInsertMessage(
  args: DoInsertMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  const query = db
    .insert(args)
    .into(messagesTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [message] = await query;

  return message;
}
