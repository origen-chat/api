import Redis, { RedisOptions } from 'ioredis';

import { env } from '../../config';
import logger from '../logger';

export const baseRedisClientOptions: RedisOptions = {
  host: env.redisHost,
  port: env.redisPort,
};

export function createRedisClient(options?: RedisOptions): Redis.Redis {
  const redisClientOptions: RedisOptions = {
    ...baseRedisClientOptions,
    ...options,
  };

  const redisClient = new Redis(redisClientOptions);

  return redisClient;
}

export async function waitForRedisClientToBeReady(
  client: Redis.Redis,
): Promise<void> {
  return new Promise<void>(resolve => {
    if (client.status === 'ready') {
      resolve();

      return;
    }

    client.once('ready', () => {
      resolve();
    });
  });
}

export async function waitForRedisClientToBeEnded(
  client: Redis.Redis,
): Promise<void> {
  return new Promise<void>(resolve => {
    if (client.status === 'close' || client.status === 'end') {
      resolve();

      return;
    }

    client.once('end', () => {
      resolve();
    });
  });
}
