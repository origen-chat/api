import { Channel } from '../channels';
import pubsub from '../pubsub';
import { triggerNames } from './constants';
import { Message } from './types';

export type PublishMessageSentArgs = Readonly<{
  message: Message;
  channel: Channel;
}>;

export function publishMessageSent(args: PublishMessageSentArgs): void {
  pubsub.publish(triggerNames.MESSAGE_SENT, args);
}

export function publishMessageDeleted(message: Message): void {
  pubsub.publish(triggerNames.MESSAGE_DELETED, { message });
}
