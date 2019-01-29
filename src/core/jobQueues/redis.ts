// eslint-disable-next-line fp/no-events
import { EventEmitter } from 'events';

import { Redis } from 'ioredis';

import {
  createRedisClient,
  waitForRedisClientToBeReady,
  waitForRedisClientToBeEnded,
} from '../redis';
import { NonNegativeInteger } from '../types';

// eslint-disable-next-line import/no-mutable-exports
export let subscriber: Redis;

// eslint-disable-next-line import/no-mutable-exports
export let publisher: Redis;

// eslint-disable-next-line import/no-mutable-exports
export let defaultRedisClient: Redis;

export async function startRedisClients(
  queueCount: NonNegativeInteger,
): Promise<void> {
  /**
   * Each queue will listen to each Redis client,
   * so we set the max event listeners accordingly.
   */
  const maxEventListeners = queueCount + EventEmitter.defaultMaxListeners;

  subscriber = createRedisClient().setMaxListeners(maxEventListeners);
  publisher = createRedisClient().setMaxListeners(maxEventListeners);
  defaultRedisClient = createRedisClient().setMaxListeners(maxEventListeners);

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
