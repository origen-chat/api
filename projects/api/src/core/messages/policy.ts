import { Actor } from '../actors';
import { isUser } from '../users';
import { Message } from './types';

export type CanEditMessageArgs = Readonly<{
  actor: Actor;
  message: Message;
}>;

export async function canEditMessage(
  args: CanEditMessageArgs,
): Promise<boolean> {
  if (isUser(args.actor) && args.actor.id === args.message.userSenderId) {
    return true;
  }

  return false;
}
