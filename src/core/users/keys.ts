import { makeRedisKey } from '../redis';
import { ID } from '../types';
import { userRedisKeyNamespace } from './constants';

export function makeUserRedisKey(userId: ID): string {
  const redisKey = makeRedisKey([userRedisKeyNamespace, userId]);

  return redisKey;
}
