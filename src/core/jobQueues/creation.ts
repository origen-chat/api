import Queue, { QueueOptions } from 'bull';

import { createRedisClient } from '../redis';

import { JobQueueName } from './constants';
import {
  publisher,
  subscriber,
  startSubscriberAndPublisherRedisClients,
} from './redis';
import { JobQueues } from './types';

export async function createJobQueues(): Promise<JobQueues> {
  await startSubscriberAndPublisherRedisClients();

  const jobQueues = Object.values(JobQueueName).reduce(
    (acc, queueName) => ({ ...acc, [queueName]: createJobQueue(queueName) }),
    {},
  ) as JobQueues;

  return jobQueues;
}

function createJobQueue(
  queueName: JobQueueName,
  options?: QueueOptions,
): Queue.Queue {
  const queueOptions: QueueOptions = {
    createClient: type => {
      if (type === 'subscriber') {
        return subscriber;
      }

      if (type === 'client') {
        return publisher;
      }

      return createRedisClient();
    },
    ...options,
  };

  const queue = new Queue(queueName, queueOptions);

  return queue;
}
