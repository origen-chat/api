import { redisClient, RedisExpiryMode } from '../redis';
import { ID, NonNegativeInteger } from '../types';

import { defaultUserCacheExpirationInSeconds } from './constants';
import { makeUserRedisKey } from './keys';
import { User } from './types';

export async function getCachedUser(userId: ID): Promise<User | null> {
  const redisKey = makeUserRedisKey(userId);

  const stringifiedUser = await redisClient.get(redisKey);

  if (!stringifiedUser) {
    return null;
  }

  const user: User = JSON.parse(stringifiedUser);

  return user;
}

export async function maybeCacheUser(
  user: User | null,
  expirationInSeconds: NonNegativeInteger | null = defaultUserCacheExpirationInSeconds,
): Promise<void> {
  if (user) {
    await cacheUser(user, expirationInSeconds);
  }
}

export async function cacheUser(
  user: User,
  expirationInSeconds: NonNegativeInteger | null = defaultUserCacheExpirationInSeconds,
): Promise<void> {
  const stringifiedUser = JSON.stringify(user);

  const redisKey = makeUserRedisKey(user.id);

  if (expirationInSeconds === null) {
    await redisClient.set(redisKey, stringifiedUser);

    return;
  }

  await redisClient.set(
    redisKey,
    stringifiedUser,
    RedisExpiryMode.EX,
    expirationInSeconds,
  );
}
