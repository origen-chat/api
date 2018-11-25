import { DBOptions } from '../types';
import { createMessage, CreateMessageArgs } from './creation';
import { Message } from './types';
import { updateMessage, UpdateMessageArgs } from './update';

export type SendMessageArgs = CreateMessageArgs;

export async function sendMessage(
  args: SendMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  const message = await createMessage(args, options);

  return message;
}

export type EditMessageArgs = UpdateMessageArgs;

export async function editMessage(
  message: Message,
  args: EditMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  const updatedMessage = await updateMessage(message, args, options);

  return updatedMessage;
}
