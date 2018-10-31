import Redis, { RedisOptions } from 'ioredis';

import { env } from '../../config';
import logger from '../logger';

export const redisClientOptions: RedisOptions = {
  host: env.redisHost,
  port: env.redisPort,
};

export const redisClient = new Redis(redisClientOptions);

redisClient.on('ready', () => {
  logger.info('🎒 cache store (Redis) connection ready');
});

export function closeRedisConnection(): void {
  redisClient.disconnect();
}

export default redisClient;
