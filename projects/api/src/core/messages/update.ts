import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { messagesTableName } from './constants';
import { Message } from './types';

export type UpdateMessageArgs = Partial<Pick<Message, 'content'>>;

/**
 * Updates a user.
 */
export async function updateMessage(
  message: Message,
  args: UpdateMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  const updatedMessage = await doUpdateMessage(message, args, options);

  return updatedMessage;
}

export type DoUpdateMessageArgs = Partial<Pick<Message, 'content'>>;

export async function doUpdateMessage(
  message: Message,
  args: DoUpdateMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  const data = {
    content: args.content,
    updatedAt: new Date().toISOString(),
  };

  const query = db(messagesTableName)
    .update(data)
    .where({ id: message.id })
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [updatedMessage] = await query;

  return updatedMessage;
}
