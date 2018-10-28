export const userConnectionStatusRedisKeyNamespace = 'userConnectionStatus';

/**
 * Time in seconds to expire the userConnectionStatus key in Redis.
 */
export const userConnectionStatusExpirationInSeconds = 60 * 15;

export enum UserConnectionStatus {
  Online = 'online',
  Offline = 'offline',
}
