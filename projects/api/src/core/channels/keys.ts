import { makeRedisKey } from '../redis';
import { ID } from '../types';
import { channelRedisKeyNamespace } from './constants';

export function makeChannelRedisKey(channelId: ID): string {
  const redisKey = makeRedisKey([channelRedisKeyNamespace, channelId]);

  return redisKey;
}
