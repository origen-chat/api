import { Redis } from 'ioredis';

import {
  createRedisClient,
  waitForRedisClientToBeReady,
  waitForRedisClientToBeEnded,
} from '../redis';

// eslint-disable-next-line import/no-mutable-exports
export let subscriber: Redis;

// eslint-disable-next-line import/no-mutable-exports
export let publisher: Redis;

export async function startSubscriberAndPublisherRedisClients(): Promise<void> {
  subscriber = createRedisClient();
  publisher = createRedisClient();

  await waitForSubscriberAndPublisherRedisClientsToBeReady();
}

async function waitForSubscriberAndPublisherRedisClientsToBeReady(): Promise<
  void
> {
  await Promise.all([
    waitForRedisClientToBeReady(subscriber),
    waitForRedisClientToBeReady(publisher),
  ]);
}

export async function waitForSubscriberAndPublisherRedisClientsToBeEnded(): Promise<
  void
> {
  await Promise.all([
    waitForRedisClientToBeEnded(subscriber),
    waitForRedisClientToBeEnded(publisher),
  ]);
}
