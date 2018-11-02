import Redis, { RedisOptions } from 'ioredis';

import { env } from '../../config';
import logger from '../logger';

export const redisClientOptions: RedisOptions = {
  host: env.redisHost,
  port: env.redisPort,
};

// eslint-disable-next-line import/no-mutable-exports
export let redisClient: Redis.Redis;

export function startRedis(): void {
  if (redisClient) {
    return;
  }

  redisClient = new Redis(redisClientOptions);

  logger.info('🎒 cache store (Redis) connection initialized');

  redisClient.on('ready', () => {
    logger.info('🎒 cache store (Redis) connection ready');
  });
}

export function closeRedisConnection(): void {
  if (!redisClient) {
    return;
  }

  redisClient.disconnect();
}
