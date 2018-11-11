import { createRedisClient } from '../redis';

export const subscriber = createRedisClient();

export const client = createRedisClient();
