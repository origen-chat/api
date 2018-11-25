import { redisClient } from '../redis';
import { User } from '../users';
import { UserConnectionStatus } from './constants';
import { makeUserConnectionStatusRedisKey } from './keys';

export async function getUserConnectionStatus(
  user: User,
): Promise<UserConnectionStatus> {
  const connectionStatus = await getUserConnectionStatusFromRedis(user);

  return connectionStatus;
}

export async function getUserConnectionStatusFromRedis(
  user: User,
): Promise<UserConnectionStatus> {
  const key = makeUserConnectionStatusRedisKey(user);

  const connectionStatus =
    ((await redisClient.get(key)) as UserConnectionStatus) ||
    UserConnectionStatus.Offline;

  return connectionStatus;
}
