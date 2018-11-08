import pubsub from '../pubsub';
import { triggerNames } from './constants';
import { Message } from './types';

export function publishMessageSent(message: Message): void {
  pubsub.publish(triggerNames.MESSAGE_SENT, { message });
}

export function publishMessageDeleted(message: Message): void {
  pubsub.publish(triggerNames.MESSAGE_DELETED, { message });
}
