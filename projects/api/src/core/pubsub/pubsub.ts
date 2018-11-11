import { RedisPubSub } from 'graphql-redis-subscriptions';

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
}

export function closePubSub(): void {
  pubsub.close();
}
