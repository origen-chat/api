import { redisClient, RedisExpiryMode } from '../redis';
import { ID, NonNegativeInteger } from '../types';
import { defaultBotCacheExpirationInSeconds } from './constants';
import { makeBotRedisKey } from './keys';
import { Bot } from './types';

export async function getCachedBot(botId: ID): Promise<Bot | null> {
  const redisKey = makeBotRedisKey(botId);

  const stringifiedBot = await redisClient.get(redisKey);

  if (!stringifiedBot) {
    return null;
  }

  const bot: Bot = JSON.parse(stringifiedBot);

  return bot;
}

export async function maybeCacheBot(
  bot: Bot | null,
  expirationInSeconds: NonNegativeInteger | null = defaultBotCacheExpirationInSeconds,
): Promise<void> {
  if (bot) {
    await cacheUser(bot, expirationInSeconds);
  }
}

export async function cacheUser(
  bot: Bot,
  expirationInSeconds: NonNegativeInteger | null = defaultBotCacheExpirationInSeconds,
): Promise<void> {
  const stringifiedBot = JSON.stringify(bot);

  const redisKey = makeBotRedisKey(bot.id);

  if (expirationInSeconds === null) {
    await redisClient.set(redisKey, stringifiedBot);

    return;
  }

  await redisClient.set(
    redisKey,
    stringifiedBot,
    RedisExpiryMode.EX,
    expirationInSeconds,
  );
}
