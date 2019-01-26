import * as core from '../core';

export async function cleanCache(): Promise<void> {
  await core.redis.redisClient.flushdb();
}
