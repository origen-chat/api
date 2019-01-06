import Redis, { RedisOptions } from 'ioredis';

import { env } from '../../config';

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
    client.once('ready', () => {
      resolve();
    });
  });
}
