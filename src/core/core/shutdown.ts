import { closeDatabaseConnections } from '../db';
import logger from '../logger';
import { closePubSub } from '../pubsub';
import { closeRedisConnection } from '../redis';
import { closeJobQueues } from '../jobQueues';

// eslint-disable-next-line import/no-mutable-exports
export let isShutdown = false;

/**
 * Gracefully shuts down the core.
 */
export async function shutdownCore(): Promise<void> {
  logger.info('🔌 shutting down core...');

  await Promise.all([
    closeDatabaseConnections(),
    closeJobQueues(),
    closeRedisConnection(),
    closePubSub(),
  ]);

  isShutdown = true;

  logger.info('🔌 core shut down');
}
