import { Redis } from 'ioredis';
import logger from '../logger';
import { createRedisClient, waitForRedisClientToBeReady } from '../redis';

// eslint-disable-next-line import/no-mutable-exports
export let subscriber: Redis;

// eslint-disable-next-line import/no-mutable-exports
export let publisher: Redis;

export async function startSubscriberAndPublisherRedisClients(): Promise<void> {
  subscriber = createRedisClient();
  publisher = createRedisClient();

  await waitForSubscriberAndPublisherRedisClientsToBeReady();

  logger.info('📡 pubsub subscriber and publisher (Redis) connections ready');
}

async function waitForSubscriberAndPublisherRedisClientsToBeReady(): Promise<
  void
> {
  await Promise.all([
    waitForRedisClientToBeReady(subscriber),
    waitForRedisClientToBeReady(publisher),
  ]);
}
