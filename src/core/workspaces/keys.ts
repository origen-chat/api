import { makeRedisKey } from '../redis';
import { ID } from '../types';

import { workspaceRedisKeyNamespace } from './constants';

export function makeWorkspaceRedisKey(workspaceId: ID): string {
  const redisKey = makeRedisKey([workspaceRedisKeyNamespace, workspaceId]);

  return redisKey;
}
