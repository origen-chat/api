import { RedisPubSub } from 'graphql-redis-subscriptions';

import { redisClientOptions } from '../redis';

export const pubsub = new RedisPubSub({
  connection: redisClientOptions,
});

export function closePubSub(): void {
  pubsub.close();
}

export default pubsub;
