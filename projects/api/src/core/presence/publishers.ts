import { Channel } from '../channels';
import pubsub from '../pubsub';
import { User } from '../users';
import { pubsubKeys, UserConnectionStatus } from './constants';

export function publishUserTyping(user: User, channel: Channel): void {
  pubsub.publish(pubsubKeys.USER_TYPING, { user, channel });
}

export function publishUserConnectionStatusChanged(
  user: User,
  connectionStatus: UserConnectionStatus,
): void {
  pubsub.publish(pubsubKeys.USER_CONNECTION_STATUS_CHANGED, {
    user,
    connectionStatus,
  });
}
