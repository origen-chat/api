import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID, Nullable } from '../types';
import { messagesTableName } from './constants';
import { Message } from './types';

export async function getMessageById(
  id: ID,
  options: DBOptions = {},
): Promise<Nullable<Message>> {
  const query = db
    .select('*')
    .from(messagesTableName)
    .where({ id })
    .first();

  maybeAddTransactionToQuery(query, options);

  const message: Nullable<Message> = await query;

  return message;
}
