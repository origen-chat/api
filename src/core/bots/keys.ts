import { makeRedisKey } from '../redis';
import { ID } from '../types';
import { botRedisKeyNamespace } from './constants';

export function makeBotRedisKey(botId: ID): string {
  const redisKey = makeRedisKey([botRedisKeyNamespace, botId]);

  return redisKey;
}
