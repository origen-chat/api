import { RedisPubSub } from 'graphql-redis-subscriptions';

import { waitForRedisClientToBeEnded } from '../redis';
import logger from '../logger';

import {
  publisher,
  startSubscriberAndPublisherRedisClients,
  subscriber,
} from './redis';

// eslint-disable-next-line import/no-mutable-exports
export let pubsub: RedisPubSub;

export async function startPubsub(): Promise<void> {
  await startSubscriberAndPublisherRedisClients();

  pubsub = new RedisPubSub({
    subscriber,
    publisher,
  });

  logger.info('📡 pubsub ready');
}

export async function closePubSub(): Promise<void> {
  pubsub.close();

  await Promise.all([
    waitForRedisClientToBeEnded(subscriber),
    waitForRedisClientToBeEnded(publisher),
  ]);

  logger.info('📡 pubsub subscriber and publisher (Redis) connections closed');
  logger.info('📡 pubsub terminated');
}
