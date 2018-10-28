import { closeDatabaseConnections } from '../db';
import logger from '../logger';
import { closePubSub } from '../pubsub';
import { redisClient } from '../redis';

/**
 * Shuts down gracefully the core.
 */
export async function shutdownCore(): Promise<void> {
  logger.info('🔌 shutting down...');

  await closeDatabaseConnections();

  redisClient.disconnect();

  closePubSub();
}
