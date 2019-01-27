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

// eslint-disable-next-line import/no-mutable-exports
export let defaultRedisClient: Redis;

export async function startRedisClients(): Promise<void> {
  subscriber = createRedisClient();
  publisher = createRedisClient();
  defaultRedisClient = createRedisClient();

  await waitForRedisClientsToBeReady();
}

async function waitForRedisClientsToBeReady(): Promise<void> {
  await Promise.all([
    waitForRedisClientToBeReady(subscriber),
    waitForRedisClientToBeReady(publisher),
    waitForRedisClientToBeReady(defaultRedisClient),
  ]);
}

export async function closeRedisClientsAndWaitToBeEnded(): Promise<void> {
  subscriber.disconnect();
  publisher.disconnect();

  await Promise.all([
    waitForRedisClientToBeEnded(subscriber),
    waitForRedisClientToBeEnded(publisher),
    waitForRedisClientToBeEnded(defaultRedisClient),
  ]);
}
