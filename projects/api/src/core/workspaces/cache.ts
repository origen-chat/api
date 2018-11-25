import { redisClient, RedisExpiryMode } from '../redis';
import { ID, NonNegativeInteger } from '../types';
import { defaultWorkspaceCacheExpirationInSeconds } from './constants';
import { makeWorkspaceRedisKey } from './keys';
import { Workspace } from './types';

export async function getCachedWorkspace(
  workspaceId: ID,
): Promise<Workspace | null> {
  const redisKey = makeWorkspaceRedisKey(workspaceId);

  const stringifiedWorkspace = await redisClient.get(redisKey);

  if (!stringifiedWorkspace) {
    return null;
  }

  const workspace: Workspace = JSON.parse(stringifiedWorkspace);

  return workspace;
}

export async function maybeCacheWorkspace(
  workspace: Workspace | null,
  expirationInSeconds: NonNegativeInteger | null = defaultWorkspaceCacheExpirationInSeconds,
): Promise<void> {
  if (workspace) {
    await cacheWorkspace(workspace, expirationInSeconds);
  }
}

export async function cacheWorkspace(
  workspace: Workspace,
  expirationInSeconds: NonNegativeInteger | null = defaultWorkspaceCacheExpirationInSeconds,
): Promise<void> {
  const stringifiedWorkspace = JSON.stringify(workspace);

  const redisKey = makeWorkspaceRedisKey(workspace.id);

  if (expirationInSeconds === null) {
    await redisClient.set(redisKey, stringifiedWorkspace);

    return;
  }

  await redisClient.set(
    redisKey,
    stringifiedWorkspace,
    RedisExpiryMode.EX,
    expirationInSeconds,
  );
}
