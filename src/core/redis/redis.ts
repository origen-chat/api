import Redis from 'ioredis';

import logger from '../logger';

import {
  createRedisClient,
  waitForRedisClientToBeReady,
  waitForRedisClientToBeEnded,
} from './helpers';

// eslint-disable-next-line import/no-mutable-exports
export let redisClient: Redis.Redis;

export async function startRedis(): Promise<void> {
  if (redisClient) {
    return;
  }

  redisClient = createRedisClient();

  logger.info('🎒 cache store (Redis) connection initialized');

  handleRedisClientEvents();

  await waitForRedisClientToBeReady(redisClient);
}

function handleRedisClientEvents(): void {
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

export async function closeRedisConnection(): Promise<void> {
  if (!redisClient) {
    return;
  }

  redisClient.disconnect();

  await waitForRedisClientToBeEnded(redisClient);
}
