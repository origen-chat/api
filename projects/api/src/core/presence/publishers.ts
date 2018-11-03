import { Channel } from '../channels';
import pubsub from '../pubsub';
import { User } from '../users';
import { triggerNames, UserConnectionStatus } from './constants';

export function publishUserTyping(user: User, channel: Channel): void {
  pubsub.publish(triggerNames.USER_TYPING, { user, channel });
}

export function publishUserConnectionStatusChanged(
  user: User,
  connectionStatus: UserConnectionStatus,
): void {
  pubsub.publish(triggerNames.USER_CONNECTION_STATUS_CHANGED, {
    user,
    connectionStatus,
  });
}
