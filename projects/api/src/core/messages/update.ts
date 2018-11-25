import { Channel } from '../channels';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { messagesTableName } from './constants';
import { enqueueEditedMessageNotificationsJob } from './jobs';
import { publishMessageEdited } from './publishers';
import { Message } from './types';
import { validateEditMessageArgs } from './validation';

export type UpdateMessageArgs = UpdateMessageInDBArgs &
  Readonly<{ channel: Channel }>;

export async function updateMessage(
  message: Message,
  args: UpdateMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  await validateEditMessageArgs(args, options);

  const updatedMessage = await updateMessageInDB(message, args, options);

  publishMessageEdited({ message: updatedMessage, channel: args.channel });
  await enqueueEditedMessageNotificationsJob(updatedMessage);

  return updatedMessage;
}

type UpdateMessageInDBArgs = Partial<Pick<Message, 'content'>>;

async function updateMessageInDB(
  message: Message,
  args: UpdateMessageInDBArgs,
  options: DBOptions = {},
): Promise<Message> {
  const updatedMessage = await doUpdateMessageInDB(message, args, options);

  return updatedMessage;
}

export type DoUpdateMessageInDBArgs = Partial<Pick<Message, 'content'>>;

export async function doUpdateMessageInDB(
  message: Message,
  args: DoUpdateMessageInDBArgs,
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
