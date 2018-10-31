import { closeDatabaseConnections } from '../db';
import logger from '../logger';
import { closePubSub } from '../pubsub';
import { closeRedisConnection } from '../redis';

/**
 * Shuts down gracefully the core.
 */
export async function shutdownCore(): Promise<void> {
  logger.info('🔌 shutting down core...');

  await closeDatabaseConnections();

  closeRedisConnection();

  closePubSub();

  logger.info('🔌 core shut down');
}
