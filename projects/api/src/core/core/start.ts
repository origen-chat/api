import db, { startDB } from '../db';
import { initializeErrorTracking } from '../errorTracking';
import logger from '../logger';
import { redisClient, startRedis } from '../redis';

// eslint-disable-next-line import/no-mutable-exports
export let isStarted = false;

/**
 * Setups and initializes everything needed in the core.
 */
export async function startCore(): Promise<void> {
  initializeErrorTracking();

  startRedis();
  startDB();

  await Promise.all([waitForRedisToBeReady(), waitForDBToBeReady()]);

  isStarted = true;
}

export async function waitForRedisToBeReady(): Promise<void> {
  return new Promise<void>(resolve => {
    redisClient.once('ready', () => {
      resolve();
    });
  });
}

export async function waitForDBToBeReady(): Promise<void> {
  await db.select(db.raw('1'));

  logger.info('📚 database (PostgreSQL) ready');
}
