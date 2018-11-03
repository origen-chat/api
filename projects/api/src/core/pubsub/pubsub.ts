import { RedisPubSub } from 'graphql-redis-subscriptions';

import logger from '../logger';
import { redisClientOptions } from '../redis';

// eslint-disable-next-line import/no-mutable-exports
export let pubsub: RedisPubSub;

export function startPubsub(): void {
  pubsub = new RedisPubSub({
    connection: redisClientOptions,
  });

  logger.info('📡 pubsub (Redis) connections initialized');
}

export function closePubSub(): void {
  pubsub.close();
}
