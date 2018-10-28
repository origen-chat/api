import { redisClient, RedisExpiryMode } from '../redis';
import { NonNegativeInteger } from '../types';
import { User } from '../users';
import {
  UserConnectionStatus,
  userConnectionStatusExpirationInSeconds,
} from './constants';
import { getUserConnectionStatusRedisKey } from './keys';

export async function setUserConnectionStatusToOnline(
  user: User,
): Promise<void> {
  await setUserConnectionStatus({
    user,
    status: UserConnectionStatus.Online,
    shouldExpire: true,
    expiresInSeconds: userConnectionStatusExpirationInSeconds,
  });
}

export type SetUserConnectionStatusArgs = Readonly<
  {
    user: User;
    status: UserConnectionStatus;
  } & (
    | { shouldExpire?: false }
    | { shouldExpire: true; expiresInSeconds: NonNegativeInteger })
>;

export async function setUserConnectionStatus(
  args: SetUserConnectionStatusArgs,
): Promise<void> {
  const key = getUserConnectionStatusRedisKey(args.user);

  if (args.shouldExpire) {
    await redisClient.set(
      key,
      args.status,
      RedisExpiryMode.EX,
      args.expiresInSeconds,
    );
  } else {
    await redisClient.set(key, args.status);
  }
}

export async function setUserConnectionStatusToOffline(
  user: User,
): Promise<NonNegativeInteger> {
  const key = getUserConnectionStatusRedisKey(user);

  const connectionCount = await redisClient.setex(
    key,
    userConnectionStatusExpirationInSeconds,
    UserConnectionStatus.Online,
  );

  return connectionCount;
}

export async function deleteUserConnectionStatus(user: User): Promise<void> {
  const key = getUserConnectionStatusRedisKey(user);

  await redisClient.del(key);
}
