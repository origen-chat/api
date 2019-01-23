import { Channel } from '../channels';
import pubsub from '../pubsub';

import { pubsubKeys } from './constants';
import { Message } from './types';

export type PublishMessageSentArgs = Readonly<{
  message: Message;
  channel: Channel;
}>;

export function publishMessageSent(args: PublishMessageSentArgs): void {
  pubsub.publish(pubsubKeys.MESSAGE_SENT, args);
}

export type PublishMessageEditedArgs = Readonly<{
  message: Message;
  channel: Channel;
}>;

export function publishMessageEdited(args: PublishMessageEditedArgs): void {
  pubsub.publish(pubsubKeys.MESSAGE_EDITED, args);
}

export function publishMessageDeleted(message: Message): void {
  pubsub.publish(pubsubKeys.MESSAGE_DELETED, { message });
}
