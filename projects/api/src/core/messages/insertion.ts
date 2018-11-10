import { Channel } from '../channels';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, Mutable, Nullable } from '../types';
import { isUser } from '../users';
import { messagesTableName } from './constants';
import { Message, MessageSender } from './types';

export type InsertMessageArgs = Pick<Message, 'content'> &
  Readonly<{
    channel: Channel;
    sender: MessageSender;
    parentMessage?: Nullable<Message>;
  }>;

/**
 * Inserts a message.
 */
export async function insertMessage(
  args: InsertMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  const doInsertMessageArgs = makeDoInsertMessageArgs(args);

  const message = await doInsertMessage(doInsertMessageArgs, options);

  return message;
}

function makeDoInsertMessageArgs(args: InsertMessageArgs): DoInsertMessageArgs {
  const doInsertMessageArgs: Mutable<Partial<DoInsertMessageArgs>> = {
    channelId: args.channel.id,
    content: args.content,
    parentMessageId: args.parentMessage ? args.parentMessage.id : null,
  };

  if (isUser(args.sender)) {
    doInsertMessageArgs.userSenderId = args.sender.id;
  } else {
    doInsertMessageArgs.botSenderId = args.sender.id;
  }

  return doInsertMessageArgs as DoInsertMessageArgs;
}

export type DoInsertMessageArgs = Pick<
  Message,
  'channelId' | 'content' | 'userSenderId' | 'botSenderId'
> &
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
