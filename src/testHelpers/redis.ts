import { redisClient } from '../core/redis';

export async function cleanCache(): Promise<void> {
  await redisClient.flushdb();
}
