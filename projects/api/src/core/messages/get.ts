import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
import { messagesTableName } from './constants';
import { Message } from './types';

export async function getMessageById(
  id: ID,
  options: DBOptions = {},
): Promise<Message | null> {
  const message = await getMessageByFromDB({ id }, options);

  return message;
}

type GetMessageByFromDBArgs = Readonly<{
  id: ID;
}>;

async function getMessageByFromDB(
  args: GetMessageByFromDBArgs,
  options: DBOptions = {},
): Promise<Message | null> {
  const query = db
    .select('*')
    .from(messagesTableName)
    .first();

  if (args.id) {
    query.where({ id: args.id });
  }

  maybeAddTransactionToQuery(query, options);

  const message: Message | null = await query;

  return message;
}

export async function getMessagesByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Message>> {
  const messages = await getMessagesByFromDB({ ids }, options);

  return messages;
}

type GetMessagesByFromDBArgs = Readonly<{
  ids: ReadonlyArray<ID>;
}>;

async function getMessagesByFromDB(
  args: GetMessagesByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Message>> {
  const query = db.select('*').from(messagesTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const messages: ReadonlyArray<Message> = await query;

  return messages;
}
