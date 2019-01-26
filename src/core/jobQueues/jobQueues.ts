import logger from '../logger';

import { createJobQueues } from './creation';
import { JobQueues } from './types';
import { closeSubscriberAndPublisherRedisClientsAndWaitToBeEnded } from './redis';

// eslint-disable-next-line import/no-mutable-exports
export let jobQueues: JobQueues;

export async function startJobQueues(): Promise<void> {
  jobQueues = await createJobQueues();

  logger.info('💼 job queue (Redis) connections initialized');
}

export async function closeJobQueues(): Promise<void> {
  await Promise.all([
    Object.values(jobQueues).map(jobQueue => jobQueue.close()),
  ]);

  await closeSubscriberAndPublisherRedisClientsAndWaitToBeEnded();

  logger.info('💼 job queue (Redis) connections closed');
}
