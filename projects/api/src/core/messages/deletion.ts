import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { messagesTableName } from './constants';
import { publishMessageDeleted } from './publishers';
import { Message } from './types';

/**
 * Deletes a message.
 */
export async function deleteMessage(
  message: Message,
  options: DBOptions = {},
): Promise<Message> {
  await doDeleteMessage(message, options);

  publishMessageDeleted(message);

  return message;
}

export async function doDeleteMessage(
  message: Message,
  options: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(messagesTableName)
    .where({ id: message.id });

  maybeAddTransactionToQuery(query, options);

  await query;
}
