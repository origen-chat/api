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

  handleRedisEvents();
}

export function closeRedisConnection(): void {
  if (!redisClient) {
    return;
  }

  redisClient.disconnect();
}

function handleRedisEvents(): void {
  redisClient.on('connect', () => {
    logger.info('🎒 cache store (Redis) connection established');
  });

  redisClient.on('ready', () => {
    logger.info('🎒 cache store (Redis) connection ready');
  });

  redisClient.on('close', () => {
    logger.info('🎒 cache store (Redis) connection closed');
  });

  redisClient.on('reconnecting', () => {
    logger.info('🎒 cache store (Redis) is reconnecting...');
  });

  redisClient.on('error', () => {
    logger.error('🎒 cache store (Redis) could not connect');
  });
}
