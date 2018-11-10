import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID, Nullable } from '../types';
import { messagesTableName } from './constants';
import { Message } from './types';

export async function getMessageById(
  id: ID,
  options: DBOptions = {},
): Promise<Nullable<Message>> {
  const message = await getMessageBy({ id }, options);

  return message;
}

type GetMessageByArgs = Readonly<{
  id: ID;
}>;

async function getMessageBy(
  args: GetMessageByArgs,
  options: DBOptions = {},
): Promise<Nullable<Message>> {
  const query = db
    .select('*')
    .from(messagesTableName)
    .first();

  if ((args as any).id) {
    query.where({ id: (args as any).id });
  }

  maybeAddTransactionToQuery(query, options);

  const message: Nullable<Message> = await query;

  return message;
}

export async function getMessagesByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Message>> {
  const messages = await getMessagesBy({ ids }, options);

  return messages;
}

type GetMessagesByArgs = Readonly<{
  ids: ReadonlyArray<ID>;
}>;

async function getMessagesBy(
  args: GetMessagesByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Message>> {
  const query = db.select('*').from(messagesTableName);

  if ((args as any).id) {
    query.whereIn('id', (args as any).ids);
  }

  maybeAddTransactionToQuery(query, options);

  const messages: ReadonlyArray<Message> = await query;

  return messages;
}
