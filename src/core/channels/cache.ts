import { redisClient, RedisExpiryMode } from '../redis';
import { ID, NonNegativeInteger } from '../types';

import { defaultChannelCacheExpirationInSeconds } from './constants';
import { makeChannelRedisKey } from './keys';
import { Channel } from './types';

export async function getCachedChannel(channelId: ID): Promise<Channel | null> {
  const redisKey = makeChannelRedisKey(channelId);

  const stringifiedChannel = await redisClient.get(redisKey);

  if (!stringifiedChannel) {
    return null;
  }

  const channel: Channel = JSON.parse(stringifiedChannel);

  return channel;
}

export async function maybeCacheChannel(
  channel: Channel | null,
  expirationInSeconds: NonNegativeInteger | null = defaultChannelCacheExpirationInSeconds,
): Promise<void> {
  if (channel) {
    await cacheChannel(channel, expirationInSeconds);
  }
}

export async function cacheChannel(
  channel: Channel,
  expirationInSeconds: NonNegativeInteger | null = defaultChannelCacheExpirationInSeconds,
): Promise<void> {
  const stringifiedChannel = JSON.stringify(channel);

  const redisKey = makeChannelRedisKey(channel.id);

  if (expirationInSeconds === null) {
    await redisClient.set(redisKey, stringifiedChannel);

    return;
  }

  await redisClient.set(
    redisKey,
    stringifiedChannel,
    RedisExpiryMode.EX,
    expirationInSeconds,
  );
}
