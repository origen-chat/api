import { DBOptions } from '../types';
import { insertMessage, InsertMessageArgs } from './insertion';
import { enqueueNewMessageNotificationsJob } from './jobs';
import { publishMessageSent } from './publishers';
import { Message } from './types';
import { validateSendMessageArgs } from './validation';

export type SendMessageArgs = InsertMessageArgs;

export async function sendMessage(
  args: SendMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  await validateSendMessageArgs(args, options);

  const message = await insertMessage(args, options);

  publishMessageSent({ message, channel: args.channel });
  await enqueueNewMessageNotificationsJob(message);

  return message;
}
