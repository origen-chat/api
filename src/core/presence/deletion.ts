import { redisClient } from '../redis';
import { User } from '../users';
import { makeUserConnectionStatusRedisKey } from './keys';

export async function deleteUserConnectionStatusFromRedis(
  user: User,
): Promise<void> {
  const key = makeUserConnectionStatusRedisKey(user);

  await redisClient.del(key);
}
