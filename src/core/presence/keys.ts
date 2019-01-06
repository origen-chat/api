import { makeRedisKey } from '../redis';
import { User } from '../users';
import { userConnectionStatusRedisKeyNamespace } from './constants';

export function makeUserConnectionStatusRedisKey(user: User): string {
  const redisKey = makeRedisKey([
    userConnectionStatusRedisKeyNamespace,
    user.id,
  ]);

  return redisKey;
}
