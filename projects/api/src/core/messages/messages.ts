import { insertMessage, InsertMessageArgs } from './insertion';
import { enqueueNewMessageNotificationsJob } from './jobs';
import { publishMessageSent } from './publishers';
import { Message } from './types';

export type SendMessageArgs = InsertMessageArgs;

export async function sendMessage(args: SendMessageArgs): Promise<Message> {
  const message = await insertMessage(args);

  publishMessageSent(message);
  await enqueueNewMessageNotificationsJob(message);

  return message;
}
