import Queue from 'bull';

import { JobQueueName } from './constants';

export type JobQueues = Record<JobQueueName, Queue.Queue>;
