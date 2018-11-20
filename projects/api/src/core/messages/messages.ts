import { Channel } from '../channels';
import { DBOptions } from '../types';
import { insertMessage, InsertMessageArgs } from './insertion';
import {
  enqueueEditedMessageNotificationsJob,
  enqueueNewMessageNotificationsJob,
} from './jobs';
import { publishMessageEdited, publishMessageSent } from './publishers';
import { Message } from './types';
import { updateMessage, UpdateMessageArgs } from './update';
import { validateEditMessageArgs, validateSendMessageArgs } from './validation';

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

export type EditMessageArgs = UpdateMessageArgs &
  Readonly<{ channel: Channel }>;

export async function editMessage(
  message: Message,
  args: EditMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  await validateEditMessageArgs(args, options);

  const updatedMessage = await updateMessage(message, args, options);

  publishMessageEdited({ message: updatedMessage, channel: args.channel });
  await enqueueEditedMessageNotificationsJob(updatedMessage);

  return updatedMessage;
}
