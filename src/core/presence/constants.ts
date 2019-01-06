import { makePubsubKeys } from '../pubsub';

export const userConnectionStatusRedisKeyNamespace = 'userConnectionStatus';

/**
 * Time in seconds to expire the userConnectionStatus key in Redis.
 */
export const userConnectionStatusExpirationInSeconds = 60 * 15;

export enum UserConnectionStatus {
  Online = 'online',
  Offline = 'offline',
}

const moduleNamespace = 'presence';

export const pubsubKeys = makePubsubKeys(
  ['USER_CONNECTION_STATUS_CHANGED', 'ACTOR_TYPING'],
  moduleNamespace,
);
