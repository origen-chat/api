import { Channel } from '../channels';
import { MessageSender } from './types';

export type CanSendMessagesArgs = Readonly<{
  sender: MessageSender;
  channel: Channel;
}>;

export async function canSendMessages(
  args: CanSendMessagesArgs,
): Promise<boolean> {
  return true;
}
