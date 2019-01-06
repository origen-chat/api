import logger from '../logger';
import { createJobQueues } from './creation';
import { JobQueues } from './types';

// eslint-disable-next-line import/no-mutable-exports
export let jobQueues: JobQueues;

export function startJobQueues(): void {
  jobQueues = createJobQueues();

  logger.info('💼 job queue (Redis) connections initialized');
}
