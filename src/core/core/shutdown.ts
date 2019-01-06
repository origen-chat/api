import { closeDatabaseConnections } from '../db';
import logger from '../logger';
import { closePubSub } from '../pubsub';
import { closeRedisConnection } from '../redis';

// eslint-disable-next-line import/no-mutable-exports
export let isShutdown = false;

/**
 * Shuts down gracefully the core.
 */
export async function shutdownCore(): Promise<void> {
  logger.info('🔌 shutting down core...');

  await closeDatabaseConnections();

  closeRedisConnection();
  closePubSub();

  isShutdown = true;

  logger.info('🔌 core shut down');
}
